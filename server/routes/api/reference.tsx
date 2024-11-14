import { Head } from "$fresh/runtime.ts";

export default function APIReferencePage() {
  return (
    <>
      <Head>
        <title>API Reference - Datadance</title>
        <meta
          name="description"
          content="Contains the API Reference for datadance API`s"
        />
      </Head>
      <div class="container" style={{ maxWidth: "80em" }}>
        <br></br>
        <div class="accordion" id="apiReference">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#processEndpoint"
                aria-expanded="false"
                aria-controls="processEndpoint"
              >
                <div>
                  <span>
                    <strong>/api/process</strong>
                  </span>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span style={{ color: "tomato" }} class="badge text-bg-light">
                    <strong>POST</strong>
                  </span>
                </div>
              </button>
            </h2>
            <div
              id="processEndpoint"
              class="accordion-collapse collapse"
              data-bs-parent="#apiReference"
            >
              <div class="accordion-body">
                <div>
                  <p>
                    The <code>/api/process</code> endpoint expects a JSON object
                    in the request body containing three keys: <em>input</em>,{" "}
                    <em>transforms</em>, and <em>settings</em>. Then it
                    transforms the given input with provided transformations and
                    settings and returns the transformed output.
                  </p>
                  <p>
                    <strong>Input</strong>: The <em>input</em> key holds a JSON
                    object with initial data or context used for
                    transformations.
                  </p>
                  <p>
                    <strong>Transforms</strong>:
                  </p>
                  <ul>
                    <li>
                      The <em>transforms</em> key contains a list of operations.
                    </li>
                    <li>
                      Each operation in this list is a JSON object with exactly
                      one key-value pair.
                    </li>
                    <li>
                      The value of this key-value pair can be:
                      <ul>
                        <li>
                          A string representing a transformation expression.
                        </li>
                        <li>
                          Another list of operations, where each operation also
                          follows the same rule of having a JSON object with
                          only one key-value pair.
                        </li>
                      </ul>
                    </li>
                    <li>
                      This structure supports both simple and nested
                      transformations, ensuring each operation is clearly
                      defined with a single key.
                    </li>
                  </ul>
                  <p>
                    <strong>Settings</strong>:
                  </p>
                  <ul>
                    <li>
                      The <em>settings</em> key currently supports a JSON object
                      with a single option: <em>merge_method</em>.
                    </li>
                    <li>
                      The <em>merge_method</em> can be one of three values:
                      <ul>
                        <li>
                          <strong>
                            <em>overwrite</em>
                          </strong>
                          : Replaces items in <em>input</em> with the
                          transformed values.
                        </li>
                        <li>
                          <strong>
                            <em>transforms_only</em>
                          </strong>
                          : Returns only the items that have been modified by
                          transformations, excluding any items from{" "}
                          <em>input</em> that remain unchanged.
                        </li>
                        <li>
                          <strong>
                            <em>preserve</em>
                          </strong>
                          : Returns the <em>input</em> as it is, but includes an
                          additional key called <em>transforms</em> which
                          contains only the transformed items.
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div>
                  <strong>Sample request :</strong>
                  <br></br>
                  <code>
                    <pre>
                      {JSON.stringify(
                        {
                          input: {
                            name: {
                              first: "Malory",
                              last: "Archer",
                            },
                            exes: [
                              "Nikolai Jakov",
                              "Len Trexler",
                              "Burt Reynolds",
                            ],
                            lastEx: 2,
                          },
                          transforms: [{ lastEx: "input.lastEx + 5" }],
                          settings: {
                            merge_method: "overwrite",
                          },
                        },
                        null,
                        2
                      )}
                    </pre>
                  </code>
                </div>
                <div>
                  <b>Response :</b>
                  <br></br>
                  <code>
                    <pre>
                      {JSON.stringify(
                        {
                          name: {
                            first: "Malory",
                            last: "Archer",
                          },
                          exes: [
                            "Nikolai Jakov",
                            "Len Trexler",
                            "Burt Reynolds",
                          ],
                          lastEx: 7,
                        },
                        null,
                        2
                      )}
                    </pre>
                  </code>
                </div>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#runEndpoint"
                aria-expanded="false"
                aria-controls="runEndpoint"
              >
                <div>
                  <span>
                    <strong>/api/run</strong>
                  </span>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span style={{ color: "tomato" }} class="badge text-bg-light">
                    <strong>POST</strong>
                  </span>
                </div>
              </button>
            </h2>
            <div
              id="runEndpoint"
              class="accordion-collapse collapse"
              data-bs-parent="#apiReference"
            >
              <div class="accordion-body">
                <div>
                  <p>
                    The <code>/api/run</code> endpoint expects a JSON object in
                    the request body containing three keys: <em>input</em>,{" "}
                    <em>emailId</em>, and <em>transformName</em>. Then it
                    transforms the given input with transformations and settings
                    fetched from the KV store for given emailId and
                    transformName and then returns the transformed output. The
                    transforms can be saved in KV store using{" "}
                    <code>/api/saveTransform</code> endpoint.
                  </p>
                  <p>
                    <strong>Input</strong>: The <em>input</em> key holds a JSON
                    object with initial data or context used for
                    transformations.
                  </p>
                  <p>
                    <strong>Email Id</strong>: The <em>emailId</em> key expects
                    a valid email address, using which you can save your
                    transformations.
                  </p>
                  <p>
                    <strong>Transform Name</strong>: The <em>transformName</em>{" "}
                    key expects a valid transform name, using which you can save
                    your transformations.
                  </p>
                </div>
                <div>
                  <strong>Sample request :</strong>
                  <br></br>
                  <code>
                    <pre>
                      {JSON.stringify(
                        {
                          input: {
                            name: {
                              first: "Malory",
                              last: "Archer",
                            },
                            exes: [
                              "Nikolai Jakov",
                              "Len Trexler",
                              "Burt Reynolds",
                            ],
                            lastEx: 2,
                          },
                          emailId: "someone@example.com",
                          transformName: "TRANSFORM1",
                        },
                        null,
                        2
                      )}
                    </pre>
                  </code>
                </div>
                <div>
                  <b>Response :</b>
                  <br></br>
                  <code>
                    <pre>
                      {JSON.stringify(
                        {
                          name: {
                            first: "Malory",
                            last: "Archer",
                          },
                          exes: [
                            "Nikolai Jakov",
                            "Len Trexler",
                            "Burt Reynolds",
                          ],
                          lastEx: 7,
                        },
                        null,
                        2
                      )}
                    </pre>
                  </code>
                </div>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#saveTransformEndpoint"
                aria-expanded="false"
                aria-controls="saveTransformEndpoint"
              >
                <div>
                  <span>
                    <strong>/api/saveTransform</strong>
                  </span>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span style={{ color: "tomato" }} class="badge text-bg-light">
                    <strong>POST</strong>
                  </span>
                </div>
              </button>
            </h2>
            <div
              id="saveTransformEndpoint"
              class="accordion-collapse collapse"
              data-bs-parent="#apiReference"
            >
              <div class="accordion-body">
                <div>
                  <p>
                    The <code>/api/saveTransform</code> endpoint expects a JSON
                    object in the request body containing four keys:{" "}
                    <em>transformName</em>, <em>transforms</em>,{" "}
                    <em>settings</em>, and <em>emailId</em>. Then it saves the
                    transforms and settings in the KV store for given emailId
                    and transformName and then returns the status if the
                    transformations are successfully saved or not.
                  </p>
                  <p>
                    <strong>Transforms</strong>: The <em>transforms</em> key
                    expects a valid parsed transforms object as explained in{" "}
                    <code>/api/process</code>.
                  </p>
                  <p>
                    <strong>Settings</strong>: The <em>settings</em> key expects
                    a valid settings object as explained in{" "}
                    <code>/api/process</code>.
                  </p>
                  <p>
                    <strong>Email Id</strong>: The <em>emailId</em> key expects
                    a valid email address, which is required in fetching your
                    saved transforms.
                  </p>
                  <p>
                    <strong>Transform Name</strong>: The <em>transformName</em>{" "}
                    key expects a valid transform name, which is required in
                    fetching your saved transforms.
                  </p>
                </div>
                <div>
                  <strong>Sample request :</strong>
                  <br></br>
                  <code>
                    <pre>
                      {JSON.stringify(
                        {
                          transforms: [
                            {
                              lastEx: "derived.lastEx + 5",
                            },
                          ],
                          settings: {
                            merge_method: "overwrite",
                          },
                          emailId: "someone@example.com",
                          transformName: "TRANSFORM1",
                        },
                        null,
                        2
                      )}
                    </pre>
                  </code>
                </div>
                <div>
                  <b>Response :</b>
                  <br></br>
                  <code>
                    <pre>
                      {JSON.stringify(
                        {
                          status: "The transforms are saved successfully!...",
                          versionstamp: "00000000000000010000",
                        },
                        null,
                        2
                      )}
                    </pre>
                  </code>
                </div>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#retrieveTransformEndpoint"
                aria-expanded="false"
                aria-controls="retrieveTransformEndpoint"
              >
                <div>
                  <span>
                    <strong>/api/retrieveTransform</strong>
                  </span>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span style={{ color: "tomato" }} class="badge text-bg-light">
                    <strong>POST</strong>
                  </span>
                </div>
              </button>
            </h2>
            <div
              id="retrieveTransformEndpoint"
              class="accordion-collapse collapse"
              data-bs-parent="#apiReference"
            >
              <div class="accordion-body">
                <div>
                  <p>
                    The <code>/api/retrieveTransform</code> endpoint expects a
                    JSON object in the request body containing two keys:{" "}
                    <em>transformName</em>, and <em>emailId</em>. Then it
                    fetches the transforms and settings from the KV store.
                  </p>
                  <p>
                    <strong>Email Id</strong>: The <em>emailId</em> key expects
                    a valid email address, which is required in fetching your
                    saved transforms.
                  </p>
                  <p>
                    <strong>Transform Name</strong>: The <em>transformName</em>{" "}
                    key expects a valid transform name, which is required in
                    fetching your saved transforms.
                  </p>
                </div>
                <div>
                  <strong>Sample request :</strong>
                  <br></br>
                  <code>
                    <pre>
                      {JSON.stringify(
                        {
                          emailId: "someone@example.com",
                          transformName: "TRANSFORM1",
                        },
                        null,
                        2
                      )}
                    </pre>
                  </code>
                </div>
                <div>
                  <b>Response :</b>
                  <br></br>
                  <code>
                    <pre>
                      {JSON.stringify(
                        {
                          key: ["someone@example.com", "TRANSFORM1"],
                          versionstamp: "00000000000000010000",
                          value: {
                            transforms: [
                              {
                                lastEx: "input.lastEx + 5",
                              },
                            ],
                            settings: {
                              merge_method: "overwrite",
                            },
                          },
                        },
                        null,
                        2
                      )}
                    </pre>
                  </code>
                </div>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#retrieveAllTransformsByEmailEndpoint"
                aria-expanded="false"
                aria-controls="retrieveAllTransformsByEmailEndpoint"
              >
                <div>
                  <span>
                    <strong>/api/retrieveAllTransformsByEmail</strong>
                  </span>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span style={{ color: "tomato" }} class="badge text-bg-light">
                    <strong>POST</strong>
                  </span>
                </div>
              </button>
            </h2>
            <div
              id="retrieveAllTransformsByEmailEndpoint"
              class="accordion-collapse collapse"
              data-bs-parent="#apiReference"
            >
              <div class="accordion-body">
                <div>
                  <p>
                    The <code>/api/retrieveAllTransformsByEmail</code> endpoint
                    expects a JSON object in the request body containing one
                    key: <em>emailId</em>. Then it fetches all the transforms
                    and settings from the KV store with the given emailId.
                  </p>
                  <p>
                    <strong>Email Id</strong>: The <em>emailId</em> key expects
                    a valid email address, which is required in fetching your
                    saved transforms.
                  </p>
                </div>
                <div>
                  <strong>Sample request :</strong>
                  <br></br>
                  <code>
                    <pre>
                      {JSON.stringify(
                        {
                          emailId: "someone@example.com",
                        },
                        null,
                        2
                      )}
                    </pre>
                  </code>
                </div>
                <div>
                  <b>Response :</b>
                  <br></br>
                  <code>
                    <pre>
                      {JSON.stringify(
                        [
                          {
                            key: ["someone@example.com", "TRANSFORM1"],
                            versionstamp: "00000000000000010000",
                            value: {
                              transforms: [
                                {
                                  lastEx: "input.lastEx + 7",
                                },
                              ],
                              settings: {
                                merge_method: "overwrite",
                              },
                            },
                          },
                          {
                            key: ["someone@example.com", "TRANSFORM2"],
                            versionstamp: "00000000000000010000",
                            value: {
                              transforms: [
                                {
                                  lastEx: "input.lastEx + 5",
                                },
                              ],
                              settings: {
                                merge_method: "preserve",
                              },
                            },
                          },
                        ],
                        null,
                        2
                      )}
                    </pre>
                  </code>
                </div>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#parseEndpoint"
                aria-expanded="false"
                aria-controls="parseEndpoint"
              >
                <div>
                  <span>
                    <strong>/api/parse</strong>
                  </span>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span style={{ color: "tomato" }} class="badge text-bg-light">
                    <strong>POST</strong>
                  </span>
                </div>
              </button>
            </h2>
            <div
              id="parseEndpoint"
              class="accordion-collapse collapse"
              data-bs-parent="#apiReference"
            >
              <div class="accordion-body">
                <div>
                  <p>
                    The <code>/api/parse</code> endpoint expects a YAML like
                    text in the request body containing the user-defined
                    transformations and then they are parsed into JSON which the
                    datadance backend can understand. Developers can use this to build
                    their own UI component.
                  </p>
                </div>
                <div>
                  <strong>Sample request :</strong>
                  <br></br>
                  <code>
                    <pre>
                      lastEx: input.lastEx + 5<br></br>
                      x:<br></br>
                      &nbsp;&nbsp;y:<br></br>
                      &nbsp;&nbsp;&nbsp;&nbsp;y: derived.lastEx + input.lastEx +
                      4<br></br>
                      _z: 'Hello'+' '+'World'
                    </pre>
                  </code>
                </div>
                <div>
                  <b>Response :</b>
                  <br></br>
                  <code>
                    <pre>
                      {JSON.stringify(
                        [
                          {
                            lastEx: "input.lastEx + 5",
                          },
                          {
                            x: [
                              {
                                y: [
                                  {
                                    y: "derived.lastEx + input.lastEx + 4",
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            _z: "'Hello'+' '+'World'",
                          },
                        ],
                        null,
                        2
                      )}
                    </pre>
                  </code>
                </div>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#encodeEndpoint"
                aria-expanded="false"
                aria-controls="encodeEndpoint"
              >
                <div>
                  <span>
                    <strong>/api/encode</strong>
                  </span>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span style={{ color: "tomato" }} class="badge text-bg-light">
                    <strong>POST</strong>
                  </span>
                </div>
              </button>
            </h2>
            <div
              id="encodeEndpoint"
              class="accordion-collapse collapse"
              data-bs-parent="#apiReference"
            >
              <div class="accordion-body">
                <div>
                  <p>
                    The <code>/api/encode</code> endpoint expects a parsed JSON transformations object
                    and then converts it into a code-like YAML, which then can be loaded onto playground.
                    Along with <code>/api/parse</code>, developers can use build their own UI components using parse
                    and encode endpoints.
                  </p>
                </div>
                <div>
                  <strong>Sample request :</strong>
                  <br></br>
                  <code>
                    <pre>
                      {JSON.stringify(
                        [
                          {
                            lastEx: "input.lastEx + 5",
                          },
                          {
                            x: [
                              {
                                y: [
                                  {
                                    y: "derived.lastEx + input.lastEx + 4",
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            _z: "'Hello'+' '+'World'",
                          },
                        ],
                        null,
                        2
                      )}
                    </pre>
                  </code>
                </div>
                <div>
                  <b>Response :</b>
                  <br></br>
                  <code>
                    <pre>lastEx: input.lastEx + 5<br></br>
                      x:<br></br>
                      &nbsp;&nbsp;y:<br></br>
                      &nbsp;&nbsp;&nbsp;&nbsp;y: derived.lastEx + input.lastEx +
                      4<br></br>
                      _z: 'Hello'+' '+'World'
                    </pre>
                  </code>
                </div>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#deleteTransformEndpoint"
                aria-expanded="false"
                aria-controls="deleteTransformEndpoint"
              >
                <div>
                  <span>
                    <strong>/api/deleteTransform</strong>
                  </span>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span
                    style={{ color: "tomato" }}
                    class="badge text-bg-danger"
                  >
                    <strong>DELETE</strong>
                  </span>
                </div>
              </button>
            </h2>
            <div
              id="deleteTransformEndpoint"
              class="accordion-collapse collapse"
              data-bs-parent="#apiReference"
            >
              <div class="accordion-body">
                <div>
                  <p>
                    The <code>/api/deleteTransform</code> endpoint expects a
                    JSON object in the request body containing two keys:{" "}
                    <em>transformName</em>, and <em>emailId</em>. Then it
                    deletes the transforms and settings from the KV store.
                  </p>
                  <p>
                    <strong>Email Id</strong>: The <em>emailId</em> key expects
                    a valid email address, which is required in deleting your
                    saved transforms.
                  </p>
                  <p>
                    <strong>Transform Name</strong>: The <em>transformName</em>{" "}
                    key expects a valid transform name, which is required in
                    deleting your saved transforms.
                  </p>
                </div>
                <div>
                  <strong>Sample request :</strong>
                  <br></br>
                  <code>
                    <pre>
                      {JSON.stringify(
                        {
                          emailId: "someone@example.com",
                          transformName: "TRANSFORM1",
                        },
                        null,
                        2
                      )}
                    </pre>
                  </code>
                </div>
                <div>
                  <b>Response :</b>
                  <br></br>
                  <code>
                    <pre>
                      {JSON.stringify(
                        {
                          status:
                            "The transform TRANSFORM1 is deleted successfully",
                        },
                        null,
                        2
                      )}
                    </pre>
                  </code>
                </div>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#deleteAllTransformsByEmailEndpoint"
                aria-expanded="false"
                aria-controls="deleteAllTransformsByEmailEndpoint"
              >
                <div>
                  <span>
                    <strong>/api/deleteAllTransformsByEmail</strong>
                  </span>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span
                    style={{ color: "tomato" }}
                    class="badge text-bg-danger"
                  >
                    <strong>DELETE</strong>
                  </span>
                </div>
              </button>
            </h2>
            <div
              id="deleteAllTransformsByEmailEndpoint"
              class="accordion-collapse collapse"
              data-bs-parent="#apiReference"
            >
              <div class="accordion-body">
                <div>
                  <p>
                    The <code>/api/deleteAllTransformsByEmail</code> endpoint
                    expects a JSON object in the request body containing one
                    key: <em>emailId</em>. Then it deletes all the transforms
                    and settings from the KV store with the given emailId.
                  </p>
                  <p>
                    <strong>Email Id</strong>: The <em>emailId</em> key expects
                    a valid email address, which is required in deleting your
                    saved transforms.
                  </p>
                </div>
                <div>
                  <strong>Sample request :</strong>
                  <br></br>
                  <code>
                    <pre>
                      {JSON.stringify(
                        {
                          emailId: "someone@example.com",
                        },
                        null,
                        2
                      )}
                    </pre>
                  </code>
                </div>
                <div>
                  <b>Response :</b>
                  <br></br>
                  <code>
                    <pre>
                      {JSON.stringify(
                        {
                          status:
                            "All transforms created by user someone@example.com are deleted successfully",
                        },
                        null,
                        2
                      )}
                    </pre>
                  </code>
                </div>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#healthEndpoint"
                aria-expanded="false"
                aria-controls="healthEndpoint"
              >
                <div>
                  <span>
                    <strong>/api/health</strong>
                  </span>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span
                    class="badge text-bg-primary"
                  >
                    <strong>GET</strong>
                  </span>
                </div>
              </button>
            </h2>
            <div
              id="healthEndpoint"
              class="accordion-collapse collapse"
              data-bs-parent="#apiReference"
            >
              <div class="accordion-body">
                <div>
                  <p>
                    The <code>/api/health</code> endpoint tells if the service
                    is UP and running or not.
                  </p>
                </div>
                <div>
                  <b>Response :</b>
                  <br></br>
                  <code>
                    <pre>
                      {JSON.stringify(
                        {
                          status: "UP",
                        },
                        null,
                        2
                      )}
                    </pre>
                  </code>
                </div>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#errorsEndpoint"
                aria-expanded="false"
                aria-controls="errorsEndpoint"
              >
                <div>
                  <span>
                    <strong>/api/errors</strong>
                  </span>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span
                    class="badge text-bg-primary"
                  >
                    <strong>GET</strong>
                  </span>
                </div>
              </button>
            </h2>
            <div
              id="errorsEndpoint"
              class="accordion-collapse collapse"
              data-bs-parent="#apiReference"
            >
              <div class="accordion-body">
                <div>
                  <p>
                    The <code>/api/errors</code> returns the error codes list
                    from the core datadance module.
                  </p>
                </div>
                <div>
                  <b>Response :</b>
                  <br></br>
                  <code>
                    <pre>
                      {JSON.stringify(
                        [
                          "error-101",
                          "error-102",
                          "error-103",
                          "error-104",
                          "error-105",
                        ],
                        null,
                        2
                      )}
                    </pre>
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
