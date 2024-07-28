import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Datadance</title>
        <link rel="stylesheet" href="/styles.css" />
        <link rel="stylesheet" href="/custom_scroll.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossorigin
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossorigin="anonymous"
        ></link>
      </head>
      <body data-bs-theme="dark">
        <header>
          <div class="px-3 py-2 border-bottom">
            <div class="container">
              <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <a
                  href="/"
                  class="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-decoration-none datadance-title"
                >
                  Datadance
                </a>

                <ul class="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                  <li>
                    <a href="/design/build" class="nav-link">
                      Playground
                    </a>
                  </li>
                  <li>
                    <a href="/docs" class="nav-link">
                      Docs
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>

        <Component />
        <br></br>
        <div class="container">
          <footer>
            <p class="text-center text-body-secondary">© 2024 Datadance, <a href="https://yakshavingdevs.org">Yak Shaving Devs</a></p>
          </footer>
        </div>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js"
          integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy"
          crossorigin="anonymous"
          defer
        ></script>
      </body>
    </html>
  );
}
