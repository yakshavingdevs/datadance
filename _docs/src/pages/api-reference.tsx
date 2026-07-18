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
          The <code>/api/process</code> endpoint expects a JSON object containing <em>input</em>,{" "}
          <em>transforms</em>, and <em>settings</em>. It transforms the input with the provided
          transformations and returns the result.
        </p>
        <h5>Request Body</h5>
        <ul>
          <li><strong>input</strong> — JSON object with initial data</li>
          <li>
            <strong>transforms</strong> — Array of operations, each with exactly one key-value pair.
            The value can be a string expression or a nested array of operations.
          </li>
          <li>
            <strong>settings</strong> — Object with <code>merge_method</code>:
            <ul>
              <li><code>overwrite</code> — Transformed values replace input fields</li>
              <li><code>transforms_only</code> — Returns only transformed fields</li>
              <li><code>preserve</code> — Returns input unchanged with transforms under a <code>transforms</code> key</li>
            </ul>
          </li>
        </ul>
        <h5>Sample Request</h5>
        <pre><code>{JSON.stringify(sampleInput, null, 2)}</code></pre>
        <h5>Response</h5>
        <pre><code>{JSON.stringify(sampleOutput, null, 2)}</code></pre>
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
          The <code>/api/run</code> endpoint expects <em>input</em>, <em>emailId</em>, and{" "}
          <em>transformName</em>. It fetches the saved transform from the KV store and applies it.
        </p>
        <h5>Sample Request</h5>
        <pre><code>{JSON.stringify({ ...sampleInput.input, emailId: "someone@example.com", transformName: "TRANSFORM1" }, null, 2)}</code></pre>
        <h5>Response</h5>
        <pre><code>{JSON.stringify(sampleOutput, null, 2)}</code></pre>
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
          Saves <em>transforms</em> and <em>settings</em> in the KV store associated with an email
          and transform name.
        </p>
        <h5>Sample Request</h5>
        <pre><code>{JSON.stringify({
          transforms: [{ lastEx: "derived.lastEx + 5" }],
          settings: { merge_method: "overwrite" },
          emailId: "someone@example.com",
          transformName: "TRANSFORM1",
        }, null, 2)}</code></pre>
        <h5>Response</h5>
        <pre><code>{JSON.stringify({ status: "The transforms are saved successfully!...", versionstamp: "00000000000000010000" }, null, 2)}</code></pre>
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
        <p>Fetches transforms and settings from the KV store by email and transform name.</p>
        <h5>Sample Request</h5>
        <pre><code>{JSON.stringify({ emailId: "someone@example.com", transformName: "TRANSFORM1" }, null, 2)}</code></pre>
        <h5>Response</h5>
        <pre><code>{JSON.stringify({
          key: ["someone@example.com", "TRANSFORM1"],
          versionstamp: "00000000000000010000",
          value: { transforms: [{ lastEx: "input.lastEx + 5" }], settings: { merge_method: "overwrite" } },
        }, null, 2)}</code></pre>
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
        <p>Retrieves all transforms saved under a given email address.</p>
        <h5>Sample Request</h5>
        <pre><code>{JSON.stringify({ emailId: "someone@example.com" }, null, 2)}</code></pre>
        <h5>Response</h5>
        <pre><code>{JSON.stringify([
          { key: ["someone@example.com", "TRANSFORM1"], versionstamp: "00000000000000010000", value: { transforms: [{ lastEx: "input.lastEx + 7" }], settings: { merge_method: "overwrite" } } },
          { key: ["someone@example.com", "TRANSFORM2"], versionstamp: "00000000000000010000", value: { transforms: [{ lastEx: "input.lastEx + 5" }], settings: { merge_method: "preserve" } } },
        ], null, 2)}</code></pre>
      </div>
    ),
  },
  {
    method: "DELETE",
    path: "/api/deleteTransform",
    color: "#dc3545",
    description: "Delete a saved transform",
    details: (
      <div>
        <p>Deletes a specific transform by email and transform name.</p>
        <h5>Sample Request</h5>
        <pre><code>{JSON.stringify({ emailId: "someone@example.com", transformName: "TRANSFORM1" }, null, 2)}</code></pre>
        <h5>Response</h5>
        <pre><code>{JSON.stringify({ status: "The transform TRANSFORM1 is deleted successfully" }, null, 2)}</code></pre>
      </div>
    ),
  },
  {
    method: "DELETE",
    path: "/api/deleteAllTransformsByEmail",
    color: "#dc3545",
    description: "Delete all transforms for an email",
    details: (
      <div>
        <p>Deletes all transforms associated with a given email address.</p>
        <h5>Sample Request</h5>
        <pre><code>{JSON.stringify({ emailId: "someone@example.com" }, null, 2)}</code></pre>
        <h5>Response</h5>
        <pre><code>{JSON.stringify({ status: "All transforms created by user someone@example.com are deleted successfully" }, null, 2)}</code></pre>
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
          Parses YAML-like DDS text into JSON transforms that the Datadance backend can process.
        </p>
        <h5>Sample Request (text/plain)</h5>
        <pre><code>lastEx: input.lastEx + 5
x:
  y:
    y: derived.lastEx + input.lastEx + 4
_z: 'Hello'+' '+'World'</code></pre>
        <h5>Response</h5>
        <pre><code>{JSON.stringify([
          { lastEx: "input.lastEx + 5" },
          { x: [{ y: [{ y: "derived.lastEx + input.lastEx + 4" }] }] },
          { _z: "'Hello'+' '+'World'" },
        ], null, 2)}</code></pre>
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
        <p>Converts a JSON transforms array back into YAML-like DDS text.</p>
        <h5>Sample Request</h5>
        <pre><code>{JSON.stringify([
          { lastEx: "input.lastEx + 5" },
          { x: [{ y: [{ y: "derived.lastEx + input.lastEx + 4" }] }] },
          { _z: "'Hello'+' '+'World'" },
        ], null, 2)}</code></pre>
        <h5>Response (text/yaml)</h5>
        <pre><code>lastEx: input.lastEx + 5
x:
  y:
    y: derived.lastEx + input.lastEx + 4
_z: 'Hello'+' '+'World'</code></pre>
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
        <pre><code>{JSON.stringify({ status: "UP" }, null, 2)}</code></pre>
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
        <p>Returns all possible error codes from the core Datadance module.</p>
        <h5>Response</h5>
        <pre><code>{JSON.stringify([
          "MethodNotDefinedForType", "JsonParseError", "InvalidDateTimeString",
          "InvalidFromDateTimeFormat", "InvalidToDateTimeFormat",
          "ErrorFetchingCurrentLocalDateTime", "ErrorFetchingCurrentUTCDateTime",
          "ErrorConvertingDateTimeToUTC", "ErrorConvertingDateTimeToLocal",
          "ErrorConvertingDateTimeToMillis", "InvalidTransform",
          "VariableNotInContext", "InvalidMergeMethod", "TransformError",
          "OperatorNotDefinedForType",
        ], null, 2)}</code></pre>
      </div>
    ),
  },
];

function EndpointCard({ endpoint }: { endpoint: Endpoint }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card margin-bottom--md">
      <div
        className="card__header"
        onClick={() => setOpen(!open)}
        style={{ cursor: "pointer", userSelect: "none" }}
      >
        <div className="row" style={{ alignItems: "center" }}>
          <div className="col">
            <code style={{ fontSize: "1.05rem", fontWeight: 700 }}>{endpoint.path}</code>
          </div>
          <div className="col-auto">
            <span
              className="badge"
              style={{
                backgroundColor: endpoint.color,
                color: "#fff",
                fontSize: "0.8rem",
                padding: "0.3em 0.6em",
              }}
            >
              {endpoint.method}
            </span>
          </div>
          <div className="col-auto">
            <span className="text-muted" style={{ fontSize: "0.9rem" }}>
              {endpoint.description}
            </span>
          </div>
          <div className="col-auto" style={{ marginLeft: "auto" }}>
            <span className={`dropdown__arrow ${open ? "dropdown__arrow--open" : ""}`}>
              &#9660;
            </span>
          </div>
        </div>
      </div>
      {open && (
        <div className="card__body">
          {endpoint.details}
        </div>
      )}
    </div>
  );
}

export default function APIReferencePage() {
  return (
    <Layout title="API Reference" description="Datadance API reference documentation">
      <header className="hero hero--primary" style={{ padding: "2rem 0" }}>
        <div className="container">
          <h1 className="hero__title">API Reference</h1>
          <p className="hero__subtitle">Complete API documentation for Datadance endpoints</p>
        </div>
      </header>
      <main className="container" style={{ padding: "2rem 0" }}>
        <div className="row">
          <div className="col">
            <div className="alert alert--info" role="alert">
              <strong>Base URL:</strong> <code>https://datadance.org</code> (production) or{" "}
              <code>http://localhost:8000</code> (local development).
            </div>
            {endpoints.map((ep) => (
              <EndpointCard key={ep.path} endpoint={ep} />
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}
