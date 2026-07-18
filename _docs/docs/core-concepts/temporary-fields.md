# Temporary Fields

Fields prefixed with a single underscore `_` are treated as **temporary fields**. They are valuable for intermediate calculations but are **excluded from the final output**.

## How they work

When a field name starts with `_`, its value is still computed and available in the `derived` context for subsequent transforms, but it gets stripped from the final result.

## Example

```json
[
  { "_subtotal": "input.price * input.quantity" },
  { "_tax": "derived._subtotal * 0.1" },
  { "total": "derived._subtotal + derived._tax" }
]
```

With input `{ price: 100, quantity: 3 }`, the output would be:

```json
{ "total": 330 }
```

The `_subtotal` and `_tax` fields are used internally but do not appear in the output.

## Use cases

- **Multi-step calculations** — Break complex logic into intermediate steps
- **Conditional logic** — Compute conditions without exposing them
- **Derived data reuse** — Avoid repeating the same sub-expression

## Note

Temporary fields are only stripped at the top level and within transformed objects. If a temporary field's value is used in a sub-transformation's derived state, it must be manually referenced if needed.
