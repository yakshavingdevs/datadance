# Nested Transforms

When a transform's value is an **array of transform objects** instead of a string expression, it triggers a **nested transformation**. This allows you to recursively process sub-objects within the data.

## How it works

A nested transform takes the current field's value (expected to be an object), applies the inner transforms to it, and assigns the result back to the field.

## Example

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="input" label="Input" default>

```json
{
  "address": {
    "street": "123 main st",
    "city": "springfield"
  }
}
```

</TabItem>
<TabItem value="output" label="Output">

```json
{
  "address": {
    "street": "123 MAIN ST",
    "city": "SPRINGFIELD",
    "full": "123 MAIN ST, SPRINGFIELD"
  }
}
```

</TabItem>
<TabItem value="transforms-json" label="Transforms (JSON)">

```json
[
  {
    "address": [
      { "street": "upper(input.address.street)" },
      { "city": "upper(input.address.city)" },
      { "full": "derived.street + ', ' + derived.city" }
    ]
  }
]
```

</TabItem>
<TabItem value="transforms-dds" label="Transforms (DDS)">

```yaml
address:
  street: upper(input.address.street)
  city: upper(input.address.city)
  full: derived.street + ', ' + derived.city
```

</TabItem>
</Tabs>

## Nested context

Inside a nested transform:

- `input` still refers to the **original root input**
- `derived` starts as a clone of the nested object's value
- Path tracing automatically updates the derived state

## Arrays of objects

Nested transforms also work on arrays of objects when used with the `forEach` transform:

```json
[
  {
    "items": "input.items | forEach([{ priceWithTax: 'item.price * 1.1' }])"
  }
]
```

## Limitations

- Each transform object must have exactly one key
- Nested transforms can be nested further (multi-level nesting)
- The merge method for nested transforms is automatically set to `transforms_only`
