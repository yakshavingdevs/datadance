# Transforms

A transform is an instruction that tells Datadance how to derive a field's value. Transforms are written as an **array of objects**, where each object has a **single key** (the output field name) and a **value** (the expression or nested transform).

## Structure

```json
[
  { "fieldName": "expression" }
]
```

Each transform object must contain exactly one key. The key becomes the field name in the output, and the value is either:

1. A **string expression** evaluated by MozJexl
2. An **array of nested transforms** for processing sub-objects

## Simple expression transforms

```json
[
  { "fullName": "input.firstName + ' ' + input.lastName" },
  { "ageInMonths": "input.age * 12" },
  { "isAdult": "input.age >= 18" }
]
```

## Expression context

Expressions have access to two contexts:

- **`input`** — The original input data object
- **`derived`** — The accumulated derived state (starts as a clone of `input`, updated as transforms execute)

Transform expressions are evaluated in order, so later transforms can reference the results of earlier ones via the `derived` context:

```json
[
  { "base": "input.price * 1.1" },
  { "total": "derived.base + input.tax" }
]
```

## Expression language

Datadance uses [MozJexl](https://github.com/mozilla/mozjexl) as its expression language. MozJexl supports:

- Arithmetic: `+`, `-`, `*`, `/`, `%`
- Comparison: `==`, `!=`, `<`, `>`, `<=`, `>=`
- Logical: `&&`, `||`, `!`
- Ternary: `condition ? trueVal : falseVal`
- String concatenation: `+`
- Property access: `obj.prop`, `obj['prop']`
- Array indexing: `arr[0]`
- Transforms: `value | transformName(args)`
