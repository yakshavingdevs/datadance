# Quickstart

The simplest way to use Datadance is with the `transform` function.

## Basic example

```js
import { transform } from "datadance";

const result = await transform({
  input: { name: "Alice", score: 85 },
  transforms: [
    { name: "upper(input.name)" },
    { score: "input.score + 15" },
    { grade: "input.score >= 90 ? 'A' : 'B'" },
  ],
  settings: { merge_method: "overwrite" },
});

console.log(result);
// { name: "ALICE", score: 100, grade: "B" }
```

## Breaking it down

| Property | Description |
|---|---|
| `input` | The source JSON object |
| `transforms` | Array of transform objects, each with a single key-value pair |
| `settings` | Configuration object (e.g., merge method) |

## Merge methods

The `merge_method` setting controls how the output is combined with the input:

- **`overwrite`** (default) — Merges transformed fields into input, overwriting existing keys
- **`preserve`** — Returns input unchanged, with transformed fields nested under a `transforms` key
- **`transforms_only`** — Returns only the transformed fields, discarding all input data

## Using DDS syntax

Instead of JSON, you can write transforms using Datadance Syntax (DDS), a YAML-like format:

```yaml
name: upper(input.name)
score: input.score + 15
grade: input.score >= 90 ? 'A' : 'B'
```

Pass it with `transforms_syntax: "dds"` in settings:

```js
const result = await transform({
  input: { name: "Alice", score: 85 },
  transforms: `name: upper(input.name)\nscore: input.score + 15`,
  settings: { merge_method: "overwrite", transforms_syntax: "dds" },
});
```

## Interactive Playground

Visit the [Playground](/playground) to experiment with transforms interactively.
