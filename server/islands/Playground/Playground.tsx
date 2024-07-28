import { useEffect, useRef, useState } from "preact/hooks";
import AceEditor from "ace-builds";
import ace from "ace-builds";
import Dracula from "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";
import { transform } from "../../../core/transform.ts";
import { DataObject } from "../../../core/types.ts";
import { SerialOperations } from "../../../core/types.ts";

ace.config.set("basePath", "https://esm.sh/ace-builds@1.35.4/src-noconflict");
ace.config.setModuleUrl(
  "ace/mode/yaml",
  "https://cdn.jsdelivr.net/npm/ace-builds@1.4.12/src-noconflict/mode-yaml.js"
);

const Playground = () => {
  const [input, setInput] = useState<string>(`{
    "name": {
        "first": " malory",
        "last": "Archer"
    },
    "exes": [
        " Nikolai Jakov ",
        "Len Trexler",
        "Burt Reynolds"
    ],
    "lastEx": 2
}`);
  const [transforms, setTransforms] = useState<string>(
    `lastEx : derived.lastEx + 5
modified : derived.lastEx
original : input.lastEx
nameObject :
  name : input.name.first | trim | capitalize + ' ' + input.name.last
  age : 25
  ex1 : '=>' + input.exes[0] | rtrim 
isMinor : derived.nameObject.age > 18
nameLength : derived.nameObject.name | length
nameUpper : derived.nameObject.name | upper`);
  const [output, setOutput] = useState<string>("");
  const [mergeMethod, setMergeMethod] = useState<string>("overwrite");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const transformsRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<AceEditor | null>(null);

  useEffect(() => {
    const initializeEditor = () => {
      const editor = AceEditor.edit(transformsRef.current);
      editor.setOptions({
        enableAutoIndent: true,
        maxLines: 15,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
      });
      editor.setTheme(Dracula);
      editor.setValue(transforms, -1);
      ace.config.loadModule("ace/mode/yaml", (yamlMode: any) => {
        editor.session.setMode(new yamlMode.Mode());
      });
      editor.session.on("change", async () => {
        const newTransforms = editor.getValue();
        setTransforms(newTransforms);
        handleTransform(newTransforms);
      });

      editorRef.current = editor;
      return editor;
    };

    const handleTransform = (transforms: string) => {
      const dataObject: DataObject = {
        input: JSON.parse(input),
        transforms: parseTransforms(transforms),
        settings: {
          merge_method: mergeMethod,
        },
      };

      transform(dataObject)
        .then((transformedOutput) => {
          setOutput(JSON.stringify(transformedOutput, null, 2));
        })
        .catch((error) => {
          setErrorMessage(`Invalid Transforms : ${error}`);
        });
    };

    if (transformsRef.current) {
      const editor = initializeEditor();
      handleTransform(transforms);

      return () => editor.destroy();
    }
  }, [input, mergeMethod]);

  const parseTransforms = (transforms: string): SerialOperations => {
    const lines = transforms.split("\n");
    const result: SerialOperations = [];
    const stack = [{ indent: -1, object: result }];
    let errorMessage = "";

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      if (trimmedLine) {
        const indent = line.search(/\S/);
        if (indent % 2 !== 0) {
          errorMessage = `Indentation error at line ${
            index + 1
          }: "${line}". Indentation must be in multiples of 2 spaces.`;
        }
        if (line.includes(`"`)) {
          errorMessage = `Error at line ${
            index + 1
          }: ${line}. " character is not allowed, use 'literal' to represent string literal.`;
        }
        const trimmedLineSplit = trimmedLine.split(":");
        const key = trimmedLineSplit[0].trim();
        const value = trimmedLineSplit
          .slice(1, trimmedLineSplit.length)
          .map((s) => s.trim())
          .join(":");

        const regexForField = /[^\w\s_$]/;
        if (regexForField.test(key)) {
          errorMessage = `Error at line ${
            index + 1
          }: ${line}. Field names can only use special characters _ and $`;
        }

        const newEntry = value ? { [key]: value } : { [key]: [] };

        while (stack.length && stack[stack.length - 1].indent >= indent) {
          stack.pop();
        }

        if (stack.length === 0 || stack[stack.length - 1].indent >= indent) {
          errorMessage = `Indentation error at line ${index + 1}: "${line}"`;
        }

        const currentParent = stack[stack.length - 1].object;
        currentParent.push(newEntry);

        if (!value) {
          stack.push({ indent, object: newEntry[key] });
        }
      }
    });

    if (errorMessage) {
      setErrorMessage(errorMessage);
      return [{ error: errorMessage }];
    } else {
      setErrorMessage("");
      return result;
    }
  };

  function handleInputChange(event: any) {
    setInput(event.target.value);
  }

  function handleMergeMethodChange(event: any) {
    setMergeMethod(event.target.value);
  }

  return (
    <div class="container">
      <div class="container mt-4" style={{ height: "80vh" }}>
        <div
          class="row gx-4 gy-4 align-items-md-stretch"
          style={{ height: "80%" }}
        >
          <div class="col-md-6 d-flex flex-column">
            <div class="mb-3 flex-grow-1">
              <div class="form-floating">
                <textarea
                  class="form-control"
                  value={input}
                  onInput={handleInputChange}
                  id="inputJson"
                  style={{
                    overflow: "scroll",
                    resize: "none",
                    maxHeight: "50vh",
                    height: "30vh",
                  }}
                />
                <label for="inputJson">Input JSON</label>
              </div>
            </div>
            <div>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </div>
            <div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  id="overwrite"
                  value="overwrite"
                  name="merge_method"
                  onChange={handleMergeMethodChange}
                  checked={mergeMethod === "overwrite"}
                />
                <label class="form-check-label" for="overwrite">
                  Overwrite
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  id="transforms_only"
                  value="transforms_only"
                  name="merge_method"
                  onChange={handleMergeMethodChange}
                  checked={mergeMethod === "transforms_only"}
                />
                <label class="form-check-label" for="transforms_only">
                  Transforms only
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  id="preserve"
                  value="preserve"
                  name="merge_method"
                  onChange={handleMergeMethodChange}
                  checked={mergeMethod === "preserve"}
                />
                <label class="form-check-label" for="preserve">
                  Preserve
                </label>
              </div>
            </div>
            <br />
            <div class="flex-grow-1">
              <div class="card h-100">
                <div class="card-header">Transforms</div>
                <div class="card-body" ref={transformsRef} />
              </div>
            </div>
          </div>
          <div class="col-md-6 d-flex flex-column">
            <div class="card h-100">
              <div class="card-header">Output</div>
              <div class="card-body overflow-auto">
                <pre class="output">{output}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playground;
