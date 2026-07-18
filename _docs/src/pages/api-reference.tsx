import { useState } from "react";
import Layout from "@theme/Layout";

interface Endpoint {
  method: string;
  path: string;
  color: string;
  description: string;
  details: React.ReactNode;
}

const sampleInput = {
  input: {
    name: { first: "Malory", last: "Archer" },
    exes: ["Nikolai Jakov", "Len Trexler", "Burt Reynolds"],
    lastEx: 2,
  },
  transforms: [{ lastEx: "input.lastEx + 5" }],
  settings: { merge_method: "overwrite" },
};

const sampleOutput = {
  name: { first: "Malory", last: "Archer" },
  exes: ["Nikolai Jakov", "Len Trexler", "Burt Reynolds"],
  lastEx: 7,
};

const endpoints: Endpoint[] = [
  {
    method: "POST",
    path: "/api/process",
    color: "tomato",
    description: "Core transformation endpoint",
    details: (
      <div>
        <p>
          The <code>/api/process</code> endpoint expects a JSON object
          containing <em>input</em>, <em>transforms</em>, and{" "}
          <em>settings</em>. It transforms the input with the provided
          transformations and returns the result.
        </p>
        <h5>Request Body</h5>
        <ul>
          <li>
            <strong>input</strong> — JSON object with initial data
          </li>
          <li>
            <strong>transforms</strong> — Array of operations, each with exactly
            one key-value pair. The value can be a string expression or a nested
            array of operations.
          </li>
          <li>
            <strong>settings</strong> — Object with <code>merge_method</code>:
            <ul>
              <li>
                <code>overwrite</code> — Transformed values replace input fields
              </li>
              <li>
                <code>transforms_only</code> — Returns only transformed fields
              </li>
              <li>
                <code>preserve</code> — Returns input unchanged with transforms
                under a <code>transforms</code> key
              </li>
            </ul>
          </li>
        </ul>
        <h5>Sample Request</h5>
        <pre>
          <code>{JSON.stringify(sampleInput, null, 2)}</code>
        </pre>
        <h5>Response</h5>
        <pre>
          <code>{JSON.stringify(sampleOutput, null, 2)}</code>
        </pre>
      </div>
    ),
  },
  {
    method: "POST",
    path: "/api/run",
    color: "tomato",
    description: "Run a saved transform",
    details: (
      <div>
        <p>
          The <code>/api/run</code> endpoint expects <em>input</em>,{" "}
          <em>emailId</em>, and <em>transformName</em>. It fetches the saved
          transform from the KV store and applies it.
        </p>
        <h5>Sample Request</h5>
        <pre>
          <code>
            {JSON.stringify(
              {
                ...sampleInput.input,
                emailId: "someone@example.com",
                transformName: "TRANSFORM1",
              },
              null,
              2
            )}
          </code>
        </pre>
        <h5>Response</h5>
        <pre>
          <code>{JSON.stringify(sampleOutput, null, 2)}</code>
        </pre>
      </div>
    ),
  },
  {
    method: "POST",
    path: "/api/saveTransform",
    color: "tomato",
    description: "Save a transform to the KV store",
    details: (
      <div>
        <p>
          Saves <em>transforms</em> and <em>settings</em> in the KV store
          associated with an email and transform name.
        </p>
        <h5>Sample Request</h5>
        <pre>
          <code>
            {JSON.stringify(
              {
                transforms: [{ lastEx: "derived.lastEx + 5" }],
                settings: { merge_method: "overwrite" },
                emailId: "someone@example.com",
                transformName: "TRANSFORM1",
              },
              null,
              2
            )}
          </code>
        </pre>
        <h5>Response</h5>
        <pre>
          <code>
            {JSON.stringify(
              {
                status:
                  "The transforms are saved successfully!...",
                versionstamp: "00000000000000010000",
              },
              null,
              2
            )}
          </code>
        </pre>
      </div>
    ),
  },
  {
    method: "POST",
    path: "/api/retrieveTransform",
    color: "tomato",
    description: "Retrieve a saved transform",
    details: (
      <div>
        <p>
          Fetches transforms and settings from the KV store by email and
          transform name.
        </p>
        <h5>Sample Request</h5>
        <pre>
          <code>
            {JSON.stringify(
              {
                emailId: "someone@example.com",
                transformName: "TRANSFORM1",
              },
              null,
              2
            )}
          </code>
        </pre>
        <h5>Response</h5>
        <pre>
          <code>
            {JSON.stringify(
              {
                key: ["someone@example.com", "TRANSFORM1"],
                versionstamp: "00000000000000010000",
                value: {
                  transforms: [{ lastEx: "input.lastEx + 5" }],
                  settings: { merge_method: "overwrite" },
                },
              },
              null,
              2
            )}
          </code>
        </pre>
      </div>
    ),
  },
  {
    method: "POST",
    path: "/api/retrieveAllTransformsByEmail",
    color: "tomato",
    description: "List all transforms for an email",
    details: (
      <div>
        <p>
          Retrieves all transforms saved under a given email address.
        </p>
        <h5>Sample Request</h5>
        <pre>
          <code>
            {JSON.stringify(
              { emailId: "someone@example.com" },
              null,
              2
            )}
          </code>
        </pre>
        <h5>Response</h5>
        <pre>
          <code>
            {JSON.stringify(
              [
                {
                  key: ["someone@example.com", "TRANSFORM1"],
                  versionstamp: "00000000000000010000",
                  value: {
                    transforms: [{ lastEx: "input.lastEx + 7" }],
                    settings: { merge_method: "overwrite" },
                  },
                },
                {
                  key: ["someone@example.com", "TRANSFORM2"],
                  versionstamp: "00000000000000010000",
                  value: {
                    transforms: [{ lastEx: "input.lastEx + 5" }],
                    settings: { merge_method: "preserve" },
                  },
                },
              ],
              null,
              2
            )}
          </code>
        </pre>
      </div>
    ),
  },
  {
    method: "DELETE",
    path: "/api/deleteTransform",
    color: "#e74c3c",
    description: "Delete a saved transform",
    details: (
      <div>
        <p>
          Deletes a specific transform by email and transform name.
        </p>
        <h5>Sample Request</h5>
        <pre>
          <code>
            {JSON.stringify(
              {
                emailId: "someone@example.com",
                transformName: "TRANSFORM1",
              },
              null,
              2
            )}
          </code>
        </pre>
        <h5>Response</h5>
        <pre>
          <code>
            {JSON.stringify(
              {
                status:
                  "The transform TRANSFORM1 is deleted successfully",
              },
              null,
              2
            )}
          </code>
        </pre>
      </div>
    ),
  },
  {
    method: "DELETE",
    path: "/api/deleteAllTransformsByEmail",
    color: "#e74c3c",
    description: "Delete all transforms for an email",
    details: (
      <div>
        <p>
          Deletes all transforms associated with a given email address.
        </p>
        <h5>Sample Request</h5>
        <pre>
          <code>
            {JSON.stringify(
              { emailId: "someone@example.com" },
              null,
              2
            )}
          </code>
        </pre>
        <h5>Response</h5>
        <pre>
          <code>
            {JSON.stringify(
              {
                status:
                  "All transforms created by user someone@example.com are deleted successfully",
              },
              null,
              2
            )}
          </code>
        </pre>
      </div>
    ),
  },
  {
    method: "POST",
    path: "/api/parse",
    color: "tomato",
    description: "Convert DDS text to JSON transforms",
    details: (
      <div>
        <p>
          Parses YAML-like DDS text into JSON transforms that the Datadance
          backend can process.
        </p>
        <h5>Sample Request (text/plain)</h5>
        <pre>
          <code>
            {`lastEx: input.lastEx + 5
x:
  y:
    y: derived.lastEx + input.lastEx + 4
_z: 'Hello'+' '+'World'`}
          </code>
        </pre>
        <h5>Response</h5>
        <pre>
          <code>
            {JSON.stringify(
              [
                { lastEx: "input.lastEx + 5" },
                {
                  x: [
                    {
                      y: [
                        {
                          y:
                            "derived.lastEx + input.lastEx + 4",
                        },
                      ],
                    },
                  ],
                },
                { _z: "'Hello'+' '+'World'" },
              ],
              null,
              2
            )}
          </code>
        </pre>
      </div>
    ),
  },
  {
    method: "POST",
    path: "/api/encode",
    color: "tomato",
    description: "Convert JSON transforms to DDS text",
    details: (
      <div>
        <p>
          Converts a JSON transforms array back into YAML-like DDS text.
        </p>
        <h5>Sample Request</h5>
        <pre>
          <code>
            {JSON.stringify(
              [
                { lastEx: "input.lastEx + 5" },
                {
                  x: [
                    {
                      y: [
                        {
                          y:
                            "derived.lastEx + input.lastEx + 4",
                        },
                      ],
                    },
                  ],
                },
                { _z: "'Hello'+' '+'World'" },
              ],
              null,
              2
            )}
          </code>
        </pre>
        <h5>Response (text/yaml)</h5>
        <pre>
          <code>
            {`lastEx: input.lastEx + 5
x:
  y:
    y: derived.lastEx + input.lastEx + 4
_z: 'Hello'+' '+'World'`}
          </code>
        </pre>
      </div>
    ),
  },
  {
    method: "GET",
    path: "/api/health",
    color: "#0d6efd",
    description: "Health check",
    details: (
      <div>
        <p>Returns whether the service is running.</p>
        <h5>Response</h5>
        <pre>
          <code>{JSON.stringify({ status: "UP" }, null, 2)}</code>
        </pre>
      </div>
    ),
  },
  {
    method: "GET",
    path: "/api/errors",
    color: "#0d6efd",
    description: "List all error codes",
    details: (
      <div>
        <p>
          Returns all possible error codes from the core Datadance module.
        </p>
        <h5>Response</h5>
        <pre>
          <code>
            {JSON.stringify(
              [
                "MethodNotDefinedForType",
                "JsonParseError",
                "InvalidDateTimeString",
                "InvalidFromDateTimeFormat",
                "InvalidToDateTimeFormat",
                "ErrorFetchingCurrentLocalDateTime",
                "ErrorFetchingCurrentUTCDateTime",
                "ErrorConvertingDateTimeToUTC",
                "ErrorConvertingDateTimeToLocal",
                "ErrorConvertingDateTimeToMillis",
                "InvalidTransform",
                "VariableNotInContext",
                "InvalidMergeMethod",
                "TransformError",
                "OperatorNotDefinedForType",
              ],
              null,
              2
            )}
          </code>
        </pre>
      </div>
    ),
  },
];

const methodColors: Record<string, { bg: string; text: string }> = {
  POST: { bg: "rgba(108, 92, 231, 0.12)", text: "#6c5ce7" },
  GET: { bg: "rgba(0, 184, 148, 0.12)", text: "#00b894" },
  DELETE: { bg: "rgba(231, 76, 60, 0.12)", text: "#e74c3c" },
};

function EndpointCard({ endpoint }: { endpoint: Endpoint }) {
  const [open, setOpen] = useState(false);
  const colors = methodColors[endpoint.method] || methodColors.POST;

  return (
    <div
      className="card margin-bottom--md"
      style={{
        borderLeft: `3px solid ${colors.text}`,
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <div
        className="card__header"
        onClick={() => setOpen(!open)}
        style={{
          cursor: "pointer",
          userSelect: "none",
          padding: "1rem 1.25rem",
          transition: "background 0.15s ease",
        }}
      >
        <div
          className="row"
          style={{ alignItems: "center", gap: "0.5rem 0" }}
        >
          <div className="col-auto">
            <span
              style={{
                background: colors.bg,
                color: colors.text,
                fontSize: "0.75rem",
                fontWeight: 700,
                padding: "0.25rem 0.6rem",
                borderRadius: "6px",
                letterSpacing: "0.04em",
                fontFamily: "var(--ifm-font-family-monospace)",
              }}
            >
              {endpoint.method}
            </span>
          </div>
          <div className="col">
            <code
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                letterSpacing: "-0.01em",
              }}
            >
              {endpoint.path}
            </code>
          </div>
          <div
            className="col"
            style={{
              textAlign: "right",
              opacity: 0.7,
              fontSize: "0.88rem",
            }}
          >
            {endpoint.description}
          </div>
          <div className="col-auto">
            <span
              className={`dropdown__arrow ${open ? "dropdown__arrow--open" : ""}`}
              style={{ fontSize: "0.7rem" }}
            >
              ▼
            </span>
          </div>
        </div>
      </div>
      {open && (
        <div
          className="card__body"
          style={{
            padding: "1.25rem",
            borderTop: "1px solid var(--ifm-color-emphasis-200)",
          }}
        >
          {endpoint.details}
        </div>
      )}
    </div>
  );
}

export default function APIReferencePage() {
  return (
    <Layout
      title="API Reference"
      description="Datadance API reference documentation"
    >
      <header
        style={{
          background:
            "linear-gradient(135deg, #0f0c29 0%, #1a1a40 40%, #302b63 100%)",
          padding: "3rem 0",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(108, 92, 231, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(108, 92, 231, 0.06) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 80%)",
            pointerEvents: "none",
          }}
        />
        <div className="container" style={{ position: "relative" }}>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.03em",
              marginBottom: "0.5rem",
            }}
          >
            API Reference
          </h1>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.6)",
              fontSize: "1.1rem",
              margin: 0,
            }}
          >
            Complete API documentation for Datadance endpoints
          </p>
        </div>
      </header>
      <main className="container" style={{ padding: "2.5rem 0 4rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          {endpoints.map((ep) => (
            <EndpointCard key={ep.path} endpoint={ep} />
          ))}
        </div>
      </main>
    </Layout>
  );
}
