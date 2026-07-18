# Quickstart

The simplest way to use Datadance is with the `transform` function.

## Basic example

When you call `transform`, you provide your data (input), the operations to perform (transforms), and how to merge the result (settings).

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="input" label="Input" default>

```json
{
  "name": "Alice",
  "score": 85
}
```

</TabItem>
<TabItem value="output" label="Output">

```json
{
  "name": "ALICE",
  "score": 100,
  "grade": "B"
}
```

</TabItem>
<TabItem value="transforms-json" label="Transforms (JSON)">

```json
[
  { "name": "upper(input.name)" },
  { "score": "input.score + 15" },
  { "grade": "input.score >= 90 ? 'A' : 'B'" }
]
```

</TabItem>
<TabItem value="transforms-dds" label="Transforms (DDS)">

```yaml
name: upper(input.name)
score: input.score + 15
grade: input.score >= 90 ? 'A' : 'B'
```

</TabItem>
</Tabs>

:::note Transform structure

Each transform is an object with **exactly one key**. The key is the output field name, and the value is either a MozJexl expression string or an array of nested transforms.

:::

## Merge methods

The `merge_method` setting controls how the output is combined with the input:

| Method | Behaviour |
|---|---|
| `overwrite` | Transformed fields replace matching input keys. Unchanged input fields are preserved. |
| `preserve` | Original input is returned as-is. Transformed fields are nested under a `transforms` key. |
| `transforms_only` | Only transformed fields are returned. All input data is discarded. |

## Using DDS syntax

Instead of JSON, you can write transforms in Datadance Syntax (DDS), a YAML-like format:

<Tabs>
<TabItem value="dds" label="DDS" default>

```yaml
name: upper(input.name)
score: input.score + 15
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```js
const result = await transform({
  input: { name: "Alice", score: 85 },
  transforms: "name: upper(input.name)\nscore: input.score + 15",
  settings: { merge_method: "overwrite", transforms_syntax: "dds" },
});
```

</TabItem>
</Tabs>

## Interactive Playground

Try it live in the [Playground](/playground) — edit input, write transforms, and see results instantly.
