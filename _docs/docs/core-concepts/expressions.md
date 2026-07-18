# Expressions

Expressions in Datadance are written using the [MozJexl](https://github.com/mozilla/mozjexl) expression language. They are JavaScript-like expressions that are safely evaluated against the `input` and `derived` contexts.

## Basic operations

| Type | Operators |
|---|---|
| Arithmetic | `+`, `-`, `*`, `/`, `%` |
| Comparison | `==`, `!=`, `<`, `>`, `<=`, `>=` |
| Logical | `&&`, `\|\|`, `!` |
| Ternary | `condition ? valueIfTrue : valueIfFalse` |
| String concat | `+` |

## Context variables

- **`input`** — The original input data object
- **`derived`** — The current derived state (accumulates as transforms execute)

```js
{ "greeting": "'Hello, ' + input.name" }
{ "total": "input.price * (1 + input.taxRate)" }
{ "status": "input.age >= 18 ? 'adult' : 'minor'" }
```

## Transforms (pipe syntax)

MozJexl uses a pipe `|` syntax to apply built-in transform functions:

```
value | transformName(args)
```

```js
{ "name": "input.name | upper" }
{ "tags": "input.tags | join(', ')" }
{ "number": "'42' | parseInt" }
```

Transforms can be chained:

```
input.name | lower | capitalize
```

## Custom operators

Datadance adds two custom binary operators:

- **`_=`** — Case-insensitive string equality: `"Hello" _= "hello"` returns `true`
- **`===`** — Strict equality (type + value): `"5" === 5` returns `false`
