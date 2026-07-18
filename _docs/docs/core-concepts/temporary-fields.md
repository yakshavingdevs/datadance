# Temporary Fields

Fields prefixed with a single underscore `_` are treated as **temporary fields**. They are valuable for intermediate calculations but are **excluded from the final output**.

## How they work

When a field name starts with `_`, its value is still computed and available in the `derived` context for subsequent transforms, but it gets stripped from the final result.

## Example

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="input" label="Input" default>

```json
{
  "price": 100,
  "quantity": 3
}
```

</TabItem>
<TabItem value="output" label="Output">

```json
{ "total": 330 }
```

</TabItem>
<TabItem value="transforms" label="Transforms">

```json
[
  { "_subtotal": "input.price * input.quantity" },
  { "_tax": "derived._subtotal * 0.1" },
  { "total": "derived._subtotal + derived._tax" }
]
```

</TabItem>
</Tabs>

The `_subtotal` (300) and `_tax` (30) fields are computed and available via `derived` during execution, but they do **not** appear in the final output — only `total` (330) is returned.

:::info Use cases

- **Multi-step calculations** — Break complex logic into intermediate steps
- **Conditional logic** — Compute conditions without exposing them
- **Derived data reuse** — Avoid repeating the same sub-expression

:::

## Note

Temporary fields are only stripped at the top level and within transformed objects. If a temporary field's value is used in a sub-transformation's derived state, it must be manually referenced if needed.
