import { Head } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <>
      <Head>
        <title>Datadance</title>
        <meta name="description" content="Home page of Datadance." />
      </Head>
      <div>
        <div class="container col-xxl-8 px-4 py-5">
          <div>
            <div class="alert alert-light alert-dismissible" role="alert">
              🚀 Winners of FOSS Hack 2024! Thanks for the Support!
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          </div>
          <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
            <div class="col-10 col-sm-8 col-lg-6">
              <img
                src="/logo.png"
                class="d-block mx-lg-auto img-fluid rounded-circle"
                alt="Datadance"
                width="700"
                height="500"
                loading="lazy"
              ></img>
            </div>
            <div class="col-lg-6">
              <h1 class="display-5 fw-bold text-body-emphasis lh-1 mb-3 text-primary">
                Jam and Glam Your JSON. Make it dance.
              </h1>
              <p class="lead">
                <strong>DataDance</strong> is a versatile data processing
                package that makes handling JSON transformations straightforward
                and efficient. Our package accepts JSON input and allows you to
                define transformations using a code-like format. Provide your
                data and transformation rules, and DataDance will process them
                to deliver the desired output.
              </p>
              <div>
                <button type="button" class="btn btn-outline-secondary">
                  <a
                    href="https://github.com/yakshavingdevs/datadance"
                    target="_blank"
                    style={{
                      "text-decoration": "none",
                      "font-weight": "bold",
                      color: "white",
                    }}
                  >
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        cursor: "pointer",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="white"
                        class="bi bi-github"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"></path>
                      </svg>
                      <p style={{ margin: 0, color: "white" }}>Source</p>
                    </div>
                  </a>
                </button>
                &nbsp;&nbsp;
                <button type="button" class="btn btn-outline-secondary">
                  <a
                    href="https://docs.datadance.app/"
                    target="_blank"
                    style={{
                      "text-decoration": "none",
                      "font-weight": "bold",
                      color: "white",
                    }}
                  >
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        cursor: "pointer",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="white"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 1.75A.75.75 0 0 1 .75 1h7.5a.75.75 0 0 1 0 1.5H1.5v11h6.75a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 0 14.25v-12.5zM11.5 1h2.25A2.25 2.25 0 0 1 16 3.25v9.5A2.25 2.25 0 0 1 13.75 15H11.5a.75.75 0 0 1 0-1.5h2.25c.414 0 .75-.336.75-.75v-9.5a.75.75 0 0 0-.75-.75H11.5a.75.75 0 0 1 0-1.5z" />
                        <path d="M11 3.5a.5.5 0 0 0-1 0v9a.5.5 0 0 0 1 0v-9z" />
                      </svg>
                      <p style={{ margin: 0, color: "white" }}>Docs</p>
                    </div>
                  </a>
                </button>
              </div>
            </div>
          </div>
          <div class="card mx-auto" >
            <div class="card-body">
              <h5 class="card-title mb-3">Install Datadance v1.0.2</h5>
              <pre class="bg-dark p-3 rounded">
                <code>npm install @yakshavingdevs/datadance</code>
              </pre>
            </div>
          </div>
          <br></br>
          <div class="card mx-auto" >
            <div class="card-body">
              <h5 class="card-title mb-3">Usage</h5>
              <pre class="bg-dark p-3 rounded">
                <code>
                {`import { transform } from "@yakshavingdevs/datadance";  
async function process() {
  var res = await transform({
              input: { x: 2 },
              transforms: [{ x: "input.x+8" }],
              settings: {
                merge_method: "overwrite",
              },
            });
            console.log(res); // { x : 8 }
}
process();`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
