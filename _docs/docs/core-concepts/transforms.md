# Transforms

A transform is an instruction that tells Datadance how to derive a field's value. Transforms are written as an **array of objects**, where each object has a **single key** (the output field name) and a **value** (the expression or nested transform).

## Structure

Each transform object must contain exactly one key. The key becomes the field name in the output, and the value is either:

1. A **string expression** evaluated by MozJexl
2. An **array of nested transforms** for processing sub-objects

## Simple expression transforms

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="input" label="Input" default>

```json
{
  "firstName": "Alice",
  "lastName": "Smith",
  "age": 17,
  "price": 100,
  "quantity": 3
}
```

</TabItem>
<TabItem value="output" label="Output">

```json
{
  "firstName": "Alice",
  "lastName": "Smith",
  "age": 17,
  "fullName": "Alice Smith",
  "ageInMonths": 204,
  "isAdult": false,
  "total": 330
}
```

</TabItem>
<TabItem value="transforms" label="Transforms">

```json
[
  { "fullName": "input.firstName + ' ' + input.lastName" },
  { "ageInMonths": "input.age * 12" },
  { "isAdult": "input.age >= 18" },
  { "total": "input.price * input.quantity" }
]
```

</TabItem>
</Tabs>

## Expression context

Expressions have access to two contexts:

- **`input`** — The original input data object (immutable)
- **`derived`** — The accumulated derived state (mutable, starts as a clone of `input`)

Transform expressions are evaluated in order, so later transforms can reference the results of earlier ones via the `derived` context:

```json
[
  { "base": "input.price * 1.1" },
  { "total": "derived.base + input.tax" }
]
```

## Expression language

Datadance uses [MozJexl](https://github.com/mozilla/mozjexl) as its expression language. It supports:

| Category | Operators / Syntax |
|---|---|
| Arithmetic | `+`, `-`, `*`, `/`, `%` |
| Comparison | `==`, `!=`, `<`, `>`, `<=`, `>=` |
| Logical | `&&`, `\|\|`, `!` |
| Ternary | `condition ? trueVal : falseVal` |
| String concat | `+` |
| Property access | `obj.prop`, `obj['prop']` |
| Array indexing | `arr[0]` |
| Transforms (pipe) | `value \| transformName(args)` |
