# Sub-Transform Blocks

Sub-transform blocks are fields prefixed with `_$` (underscore followed by dollar sign). They define **reusable helper expressions** that can be referenced by other transforms within the same transformation.

## How they work

Unlike temporary fields (`_`-prefixed), sub-transform blocks are not evaluated immediately. Instead, they are stored in the `derived` context and can be referenced by name in other expressions.

## Example

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="input" label="Input" default>

```json
{ "price": 150 }
```

</TabItem>
<TabItem value="output" label="Output">

```json
{ "finalPrice": 135 }
```

</TabItem>
<TabItem value="transforms" label="Transforms">

```json
[
  { "_$calculateDiscount": "input.price > 100 ? 0.1 : 0.05" },
  { "finalPrice": "input.price * (1 - derived._$calculateDiscount)" }
]
```

</TabItem>
</Tabs>

## Key characteristics

- `_$` blocks are only accessible at the **root level** of transforms
- They are added to the derived state as-is, without evaluation
- They are **not included** in the final output
- They can contain any valid expression

## Compared to temporary fields

| Feature | `_` (temporary) | `_$` (sub-transform block) |
|---|---|---|
| Evaluated immediately | Yes | No (stored for reference) |
| Available in derived | Yes | Yes |
| Excluded from output | Yes | Yes |
| Purpose | Intermediate computation | Reusable definition |
