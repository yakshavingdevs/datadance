# Introduction

**Datadance** is an open-source JSON data transformation tool. It accepts JSON input along with user-defined transformation rules expressed using [MozJexl](https://github.com/mozilla/mozjexl) expressions and produces transformed JSON output.

Datadance is designed for **ETL pipeline scenarios** where executing third-party or user-provided code is both an operational and security challenge. Instead of running arbitrary code, user logic is expressed as **declarative transforms** — easy to write, maintain, and audit.

## Features

- **Safe execution** — No arbitrary code execution. Transforms are declarative expressions evaluated by MozJexl.
- **Rich transform library** — 60+ built-in transforms for strings, arrays, objects, numbers, dates, and more.
- **Multiple merge modes** — `overwrite`, `preserve`, and `transforms_only` to control how output merges with input.
- **Nested transformations** — Apply transforms recursively on nested objects.
- **Temporary fields** — Use `_`-prefixed fields for intermediate values without polluting the output.
- **Sub-transform blocks** — Reusable helper blocks (`_$`-prefixed) within transform definitions.
- **DDS syntax** — Write transforms in a clean YAML-like syntax instead of JSON.
- **CLI tool** — Run transforms from the command line.
- **REST API** — Process transforms via HTTP endpoints.
- **Interactive Playground** — Experiment with transforms in your browser at the [Playground](/playground).

## How it works

Datadance takes your **Input JSON**, applies a series of **transforms**, and produces an **Output JSON**.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="input" label="Input" default>

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
  "lastEx": 2
}
```

</TabItem>
<TabItem value="output" label="Output">

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
  "lastEx": 7,
  "original": 2,
  "modified": 7
}
```

</TabItem>
<TabItem value="transforms-json" label="Transforms (JSON)">

```json
[
  { "lastEx": "input.lastEx + 5" },
  { "original": "input.lastEx" },
  { "modified": "derived.lastEx" }
]
```

</TabItem>
<TabItem value="transforms-dds" label="Transforms (DDS)">

```yaml
lastEx: input.lastEx + 5
original: input.lastEx
modified: derived.lastEx
```

</TabItem>
</Tabs>

:::info Input vs Derived

- **`input`** — Immutable reference to the original data. `input.lastEx` always returns `2`.
- **`derived`** — Mutable state that accumulates changes. `derived.lastEx` returns `7` after the first transform runs.

:::

## Usage

```js
import { transform } from "datadance";

const result = await transform({
  input: { x: 2 },
  transforms: [{ x: "input.x + 8" }],
  settings: { merge_method: "overwrite" },
});

console.log(result); // { x: 10 }
```

## Links

- **Homepage**: [https://datadance.org](https://datadance.org)
- **Playground**: [Playground](/playground)
- **NPM**: [https://www.npmjs.com/package/datadance](https://www.npmjs.com/package/datadance)
- **GitHub**: [https://github.com/yakshavingdevs/datadance](https://github.com/yakshavingdevs/datadance)
- **License**: MIT
