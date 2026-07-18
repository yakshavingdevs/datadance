# Installation

## Using npm (Node.js)

Install the `datadance` package from npm:

```bash
npm install datadance
```

Then import it in your project:

```js
import { transform } from "datadance";
```

Or with CommonJS:

```js
const { transform } = require("datadance");
```

## Local Development Setup

Datadance uses [Deno](https://deno.com/) (version 1.x) for local development. The last known compatible version is **Deno 1.46.3**.

### Install Deno

**Linux / macOS:**
```bash
curl -fsSL https://deno.land/install.sh | sh
```

**Windows (PowerShell):**
```powershell
irm https://deno.land/install.ps1 | iex
```

If you have Deno 2 installed, downgrade to 1.x:

```bash
deno upgrade --version 1.46.3
```

### Clone and run

```bash
git clone https://github.com/yakshavingdevs/datadance.git
cd datadance
deno task start
```

The server starts at [http://localhost:8000](http://localhost:8000).

### Available commands

| Command | Description |
|---|---|
| `deno task start` | Start development server with watch mode |
| `deno task build` | Build production server |
| `deno task preview` | Run production server |
| `deno task compile` | Compile CLI binary to `./bin/datadance` |
| `deno task build-package` | Build npm package via dnt |
| `deno task check` | Run formatter, linter, and type checks |
