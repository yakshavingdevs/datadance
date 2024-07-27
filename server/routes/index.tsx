import { Decoration } from "../../../../../.cache/deno/npm/registry.npmjs.org/@codemirror/view/6.29.0/dist/index.d.ts";

export default function Home() {
  return (
    <div>
      <div class="container col-xxl-8 px-4 py-5">
        <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div class="col-10 col-sm-8 col-lg-6">
            <img
              src="/logo.png"
              class="d-block mx-lg-auto img-fluid rounded-circle"
              alt="Bootstrap Themes"
              width="700"
              height="500"
              loading="lazy"
            ></img>
          </div>
          <div class="col-lg-6">
            <h1 class="display-5 fw-bold text-body-emphasis lh-1 mb-3">
              Jam and Glam Your JSON. Make it dance.
            </h1>
            <p class="lead">
              DataDance is a versatile data processing package that makes
              handling JSON transformations straightforward and efficient. Our
              package not only accepts JSON input but also allows you to define
              transformations using a code-like format. Simply provide your data
              and transformation rules, and DataDance will process them to
              deliver the desired output.
            </p>
            <div class="d-grid gap-2 d-md-flex justify-content-md-start">
              <button type="button" class="btn btn-light">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-github"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"></path>
                </svg>
                <a
                  href="https://github.com/your-repo"
                  target="_blank"
                  style={{"text-decoration":"none", "color":"black"}}
                >View source</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
