import { useState, useEffect, useCallback, useRef } from "react";
import Layout from "@theme/Layout";
import BrowserOnly from "@docusaurus/BrowserOnly";

const sampleInput = `{
  "name": {
      "first": " malory",
      "last": "archer"
  },
  "exes": [
      " Nikolai Jakov ",
      "Len Trexler",
      "Burt Reynolds"
  ],
  "lastEx": 2
}`;

const sampleTransforms = `lastEx : derived.lastEx + 5
modified : derived.lastEx
original : input.lastEx
nameObject :
  name : input.name.first | trim + ' ' + input.name.last
  name : derived.nameObject.name | capitalize
  age : 25
  ex1 : '=>' + input.exes[0] | rtrim
isMinor : derived.nameObject.age < 18
nameLength : derived.nameObject.name | length
nameUpper : derived.nameObject.name | upper`;

function ddsToJson(dds: string): Record<string, any>[] {
  const lines = dds.split("\n");
  const result: Record<string, any>[] = [];
  const stack: { indent: number; object: Record<string, any>[] }[] = [{ indent: -1, object: result }];

  for (const line of lines) {
    if (!line.trim()) continue;
    const indent = line.search(/\S/);
    const trimmed = line.trim();
    const colonIdx = trimmed.indexOf(":");
    if (colonIdx === -1) continue;
    const key = trimmed.slice(0, colonIdx).trim();
    const value = trimmed.slice(colonIdx + 1).trim();

    while (stack.length > 1 && stack[stack.length - 1].indent >= indent) stack.pop();
    const entry = value ? { [key]: value } : { [key]: [] as Record<string, any>[] };
    stack[stack.length - 1].object.push(entry);
    if (!value) stack.push({ indent, object: entry[key] as Record<string, any>[] });
  }
  return result;
}

function highlightJSON(input: string): string {
  let json: string;
  try { json = typeof input !== "string" ? JSON.stringify(input, null, 2) : input; }
  catch { return `<span class="error">Invalid JSON</span>`; }
  json = json.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const regex = /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g;
  return json.replace(regex, (match) => {
    let cls = "token-value";
    if (/^"/.test(match)) cls = /:$/.test(match) ? "token-key" : "token-string";
    else if (/true|false/.test(match)) cls = "token-boolean";
    else if (/null/.test(match)) cls = "token-null";
    else if (/^-?\d+(\.\d*)?(?:[eE][+\-]?\d+)?/.test(match)) cls = "token-number";
    return `<span class="${cls}">${match}</span>`;
  });
}

function MonacoWrapper({
  value,
  onChange,
  language,
}: {
  value: string;
  onChange: (v: string) => void;
  language: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [Editor, setEditor] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    import("@monaco-editor/react").then((mod) => setEditor(() => mod.default));
  }, []);

  if (!Editor) {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          padding: "0.5rem",
          fontFamily: "var(--ifm-font-family-monospace)",
          fontSize: "0.9rem",
          resize: "none",
          background: "#1e1e1e",
          color: "#d4d4d4",
        }}
      />
    );
  }

  return (
    <Editor
      height="100%"
      language={language}
      theme="vs-dark"
      value={value}
      onChange={(v: string) => onChange(v ?? "")}
      options={{
        fontSize: 14,
        tabSize: 2,
        minimap: { enabled: false },
        wordWrap: "on",
        lineNumbers: "on",
        scrollBeyondLastLine: false,
      }}
    />
  );
}

function PanelSection({
  title,
  children,
  flex,
  minHeight,
}: {
  title: string;
  children: React.ReactNode;
  flex?: string;
  minHeight?: string;
}) {
  return (
    <div style={{
      flex: flex ?? "1",
      minHeight: minHeight ?? 0,
      border: "1px solid var(--ifm-color-emphasis-200)",
      borderRadius: "10px",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
    }}>
      <div style={{
        padding: "0.55rem 0.85rem",
        borderBottom: "1px solid var(--ifm-color-emphasis-200)",
        fontSize: "0.88rem",
        fontWeight: 600,
        background: "var(--ifm-background-surface-color)",
        letterSpacing: "-0.01em",
      }}>
        {title}
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>
        {children}
      </div>
    </div>
  );
}

function PlaygroundContent() {
  const [input, setInput] = useState(sampleInput);
  const [transforms, setTransforms] = useState(sampleTransforms);
  const [output, setOutput] = useState("");
  const [mergeMethod, setMergeMethod] = useState("overwrite");
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const outputRef = useRef<HTMLPreElement>(null);
  const transformRef = useRef<((d: any) => Promise<any>) | null>(null);

  useEffect(() => {
    try {
      const s = localStorage.getItem("dd-input"); if (s) setInput(s);
      const t = localStorage.getItem("dd-transforms"); if (t) setTransforms(t);
      const m = localStorage.getItem("dd-merge"); if (m) setMergeMethod(m);
    } catch {}
    import("datadance").then((mod) => { transformRef.current = mod.transform; });
  }, []);

  useEffect(() => { try { localStorage.setItem("dd-input", input); } catch {} }, [input]);
  useEffect(() => { try { localStorage.setItem("dd-transforms", transforms); } catch {} }, [transforms]);
  useEffect(() => { try { localStorage.setItem("dd-merge", mergeMethod); } catch {} }, [mergeMethod]);

  useEffect(() => {
    if (outputRef.current) outputRef.current.innerHTML = output ? highlightJSON(output) : "";
  }, [output]);

  const runTransform = useCallback(async () => {
    if (!transformRef.current) { setError("Library not loaded yet"); return; }
    setProcessing(true);
    setError("");
    try {
      const parsed = JSON.parse(input);
      const transformsJson = ddsToJson(transforms);
      const result = await transformRef.current({
        input: parsed,
        transforms: transformsJson,
        settings: { merge_method: mergeMethod },
      });
      setOutput(JSON.stringify(result, null, 2));
    } catch (e: any) {
      setError(e.message || "Error running transform");
      setOutput("");
    } finally { setProcessing(false); }
  }, [input, transforms, mergeMethod]);

  const handleReset = () => {
    setInput(sampleInput);
    setTransforms(sampleTransforms);
    setMergeMethod("overwrite");
    setOutput(""); setError("");
    try {
      localStorage.removeItem("dd-input");
      localStorage.removeItem("dd-transforms");
      localStorage.removeItem("dd-merge");
    } catch {}
  };

  const btnStyle: React.CSSProperties = {
    border: "1px solid var(--ifm-color-emphasis-300)",
    borderRadius: "8px",
    padding: "6px 16px",
    fontSize: "0.85rem",
    cursor: "pointer",
    background: "var(--ifm-background-surface-color)",
    color: "var(--ifm-font-color-base)",
    fontWeight: 500,
    lineHeight: 1.5,
    transition: "all 0.2s ease",
  };
  const btnPrimaryStyle: React.CSSProperties = {
    ...btnStyle,
    background: "linear-gradient(135deg, var(--ifm-color-primary) 0%, var(--ifm-color-primary-lighter) 100%)",
    color: "#fff",
    border: "1px solid transparent",
    boxShadow: "0 2px 8px rgba(108, 92, 231, 0.25)",
  };

  return (
    <div style={{ padding: "0.75rem 0 2.5rem" }}>
      <div className="container">
        <div style={{
          display: "flex",
          gap: "1.25rem",
          height: "calc(100vh - 200px)",
          minHeight: "580px",
        }}>
          <div style={{ flex: "1", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <div style={{
              height: "40%",
              minHeight: "200px",
              border: "1px solid var(--ifm-color-emphasis-200)",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
            }}>
              <div style={{
                padding: "0.55rem 0.85rem",
                borderBottom: "1px solid var(--ifm-color-emphasis-200)",
                fontSize: "0.88rem",
                fontWeight: 600,
                background: "var(--ifm-background-surface-color)",
                letterSpacing: "-0.01em",
              }}>
                Input JSON
              </div>
              <div style={{ flex: 1, minHeight: 0 }}>
                <MonacoWrapper value={input} onChange={setInput} language="json" />
              </div>
            </div>

            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              flexWrap: "wrap",
              padding: "0.5rem 0",
            }}>
              <span style={{ fontSize: "0.85rem", fontWeight: 600, whiteSpace: "nowrap", color: "var(--ifm-color-emphasis-700)" }}>
                Merge:
              </span>
              {["overwrite", "transforms_only", "preserve"].map((m) => (
                <label
                  key={m}
                  style={{
                    ...(mergeMethod === m ? btnPrimaryStyle : btnStyle),
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="radio"
                    name="merge_method"
                    value={m}
                    checked={mergeMethod === m}
                    onChange={(e) => setMergeMethod(e.target.value)}
                    style={{ margin: 0, accentColor: "var(--ifm-color-primary)" }}
                  />
                  {m === "transforms_only" ? "Transforms Only" : m.charAt(0).toUpperCase() + m.slice(1)}
                </label>
              ))}
              <div style={{ flex: 1 }} />
              <button
                style={{ ...btnPrimaryStyle, fontWeight: 600, padding: "6px 24px" }}
                onClick={runTransform}
                disabled={processing}
              >
                {processing ? "Processing..." : "Run"}
              </button>
              <button style={btnStyle} onClick={handleReset}>Reset</button>
            </div>

            <PanelSection title="Transforms (DDS Syntax)">
              <MonacoWrapper value={transforms} onChange={setTransforms} language="yaml" />
            </PanelSection>
          </div>

          <div style={{
            flex: "1",
            border: "1px solid var(--ifm-color-emphasis-200)",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
          }}>
            <div style={{
              padding: "0.55rem 0.85rem",
              borderBottom: "1px solid var(--ifm-color-emphasis-200)",
              fontSize: "0.88rem",
              fontWeight: 600,
              background: "var(--ifm-background-surface-color)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              letterSpacing: "-0.01em",
            }}>
              <span>Output</span>
              <button
                style={btnStyle}
                onClick={() => navigator.clipboard.writeText(output)}
                disabled={!output}
              >
                Copy
              </button>
            </div>
            <div style={{
              flex: 1,
              overflow: "auto",
              padding: "0.75rem",
              fontFamily: "var(--ifm-font-family-monospace)",
              fontSize: "0.9rem",
              background: "var(--ifm-pre-background)",
            }}>
              {processing ? (
                <div style={{ color: "var(--ifm-color-emphasis-500)", fontFamily: "sans-serif", textAlign: "center", paddingTop: "3rem" }}>
                  Processing transform...
                </div>
              ) : error ? (
                <div style={{ color: "var(--ifm-color-danger)", fontFamily: "sans-serif" }}>{error}</div>
              ) : output ? (
                <pre ref={outputRef} style={{ margin: 0, whiteSpace: "pre-wrap", background: "none", border: "none", padding: 0 }} />
              ) : (
                <div style={{ color: "var(--ifm-color-emphasis-400)", fontFamily: "sans-serif", textAlign: "center", paddingTop: "3rem" }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem", opacity: 0.5 }}>&#9654;</div>
                  <div>Click <strong>Run</strong> above to transform your data</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PlaygroundPage() {
  return (
    <Layout title="Playground" description="Interactive playground for Datadance transforms">
      <div style={{
        background: "linear-gradient(135deg, #0f0c29 0%, #1a1a40 40%, #302b63 100%)",
        color: "#fff",
        padding: "2rem 0",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "linear-gradient(rgba(108, 92, 231, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(108, 92, 231, 0.06) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          pointerEvents: "none",
        }} />
        <div className="container" style={{ position: "relative" }}>
          <h1 style={{ margin: 0, fontSize: "2.2rem", fontWeight: 800, letterSpacing: "-0.03em" }}>Playground</h1>
          <p style={{ margin: "0.4rem 0 0", opacity: 0.65, fontSize: "1.05rem" }}>
            Experiment with Datadance transforms interactively
          </p>
        </div>
      </div>
      <BrowserOnly fallback={<div className="container" style={{ padding: "2rem", textAlign: "center", color: "var(--ifm-color-emphasis-500)" }}>Loading playground...</div>}>
        {() => <PlaygroundContent />}
      </BrowserOnly>
    </Layout>
  );
}
