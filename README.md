<div align="center">
   
  <a href="https://datadance.app">
  <img src="server/static/logo.png" alt="Datadance Logo" height="200" />
  </a>

  <h3>Datadance</h3>
  <p>Simple, open-source JSON data transformation tool</p>
  <a href="https://datadance.app/design/build"><b>Playground</b></a>&nbsp;•&nbsp;<a href="https://datadance.app/api/reference"><b>API Reference</b></a>&nbsp;•&nbsp;<a href="https://docs.datadance.app"><b>Docs</b></a><br><br>
  <a href="https://github.com/yakshavingdevs/datadance/blob/main/LICENSE">
    <img alt="license" src="https://img.shields.io/badge/license-MIT-blue">
  </a>
  <a href="https://github.com/yakshavingdevs/datadance/blob/main/LICENSE">
    <img alt="version" src="https://img.shields.io/badge/version-0.1.2-blue">
  </a><br><br>
</div>

**DataDance** is a versatile **data processing package** that makes handling JSON transformations straightforward and efficient. Our package accepts JSON input and allows you to define transformations using a code-like format. Provide your data and transformation rules, and DataDance will process them to deliver the desired output.

<hr>

### Local Setup

- **Datadance** uses [Deno](https://deno.com/), so you need to install Deno in your local.<br><br>
  - On Linux :
    ```bash
    curl -fsSL https://deno.land/install.sh | sh
    ```
  - On Windows :
    ```powershell
    irm https://deno.land/install.ps1 | iex
    ```
- Clone the Datadance repo locally :
  ```bash
  git clone https://github.com/yakshavingdevs/datadance.git && cd datadance
  ```
- And then start the server :
  ```bash
  deno task start
  ```
- Then you can either play with the API [http://localhost:8000/process](http://localhost:8000/process) or experience playground [http://localhost:8000/design/build](http://localhost:8000/design/build).

### Where Datadance Shines?

In many ETL pipeline scenarios, executing third-party or user-provided code can be both an operational and security challenge. Managing and isolating this code often becomes a complex task. DataDance solves this problem by offering a unique solution where third-party or user logic is expressed as DataDance transforms. These transforms are easy to maintain and eliminate the need for a traditional programming language shell. Internally, DataDance uses a parser that executes the specified transforms on the input JSON and produces an output JSON, ensuring both simplicity and security.

### Internals

- **Parser & Evaluation Engine** : Datadance at its core uses [MozJexl](https://github.com/mozilla/mozjexl) expression language. We can use expression language to parse a given expression and evaluate it.
- Backend : [Deno](https://deno.com/) + [Fresh](https://fresh.deno.dev/)
- Frontend: [Preact](https://preactjs.com/) + [Bootstrap](https://getbootstrap.com/) + [Ace Editor](https://ace.c9.io/)

### CLI

- Compiling the binary :
  ```bash
  deno task compile # builds the binary
  ```
- Executing the binary :
  ```bash
  ./bin/datadance -i '{"hello": "world"}' -t '[{"also": "\"hello \" + input.hello"}]' -s '{"merge_method": "overwrite"}'

  ```
### Expression language reference

- You can check the Mozjexl expression language reference here : [https://github.com/mozilla/mozjexl/blob/master/README.md](https://github.com/mozilla/mozjexl/blob/master/README.md)

### Example
- You can make `POST` call to the [http://localhost:8000/process](http://localhost:8000/process) with below JSON :
  ```json
  {
    "input": {
      "name": {
          "first": "Malory",
          "last": "Archer"
      },
      "exes": [
          "Nikolai Jakov",
          "Len Trexler",
          "Burt Reynolds"
      ],
      "lastEx": 2
    },
    "transforms": [
      {"lastEx": "input.lastEx + 5"}
    ],
    "settings": {
      "merge_method": "overwrite"
    }
  }
  ```
- And the output will be :
  ```json
  {
      "name": {
          "first": "Malory",
          "last": "Archer"
      },
      "exes": [
          "Nikolai Jakov",
          "Len Trexler",
          "Burt Reynolds"
      ],
      "lastEx": 7
  }
  ```

### Contributing

Development of Datadance happens in the open on GitHub. You can read the contributing guide here : [CONTRIBUTING.md](https://github.com/yakshavingdevs/datadance/blob/main/CONTRIBUTING.md).

### License

[MIT](https://github.com/yakshavingdevs/datadance/blob/main/LICENSE)
