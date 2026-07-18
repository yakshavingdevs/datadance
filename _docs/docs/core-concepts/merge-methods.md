# Merge Methods

The `merge_method` setting controls how the transformed output is combined with the original input.

## overwrite

Transformed fields replace input fields with the same key. Input fields not mentioned in transforms are preserved.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="input" label="Input" default>

```json
{ "x": 1, "y": 2 }
```

</TabItem>
<TabItem value="output" label="Output">

```json
{ "x": 11, "y": 2 }
```

</TabItem>
<TabItem value="transforms" label="Transforms">

```json
[
  { "x": "input.x + 10" }
]
```

</TabItem>
</Tabs>

## preserve

The original input is returned unchanged, and transformed fields are placed under a `transforms` key.

<Tabs>
<TabItem value="input" label="Input" default>

```json
{ "x": 1, "y": 2 }
```

</TabItem>
<TabItem value="output" label="Output">

```json
{
  "x": 1,
  "y": 2,
  "transforms": { "x": 11 }
}
```

</TabItem>
<TabItem value="transforms" label="Transforms">

```json
[
  { "x": "input.x + 10" }
]
```

</TabItem>
</Tabs>

## transforms_only

Only the transformed fields are returned. All original input fields are discarded.

<Tabs>
<TabItem value="input" label="Input" default>

```json
{ "x": 1, "y": 2 }
```

</TabItem>
<TabItem value="output" label="Output">

```json
{ "x": 11 }
```

</TabItem>
<TabItem value="transforms" label="Transforms">

```json
[
  { "x": "input.x + 10" }
]
```

</TabItem>
</Tabs>

:::tip When to use transforms_only

This mode is particularly useful inside sub-transformations and nested transforms, where you want to extract or reshape only specific fields from a sub-object.

:::
