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

- **`input`** — The original input data object (immutable)
- **`derived`** — The current derived state (mutable, accumulates as transforms execute)

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="input" label="Input" default>

```json
{
  "name": "Alice",
  "price": 50,
  "taxRate": 0.1,
  "age": 20
}
```

</TabItem>
<TabItem value="transforms" label="Transforms">

```json
[
  { "greeting": "'Hello, ' + input.name" },
  { "total": "input.price * (1 + input.taxRate)" },
  { "status": "input.age >= 18 ? 'adult' : 'minor'" }
]
```

</TabItem>
<TabItem value="output" label="Output">

```json
{
  "greeting": "Hello, Alice",
  "total": 55,
  "status": "adult"
}
```

</TabItem>
</Tabs>

## Transforms (pipe syntax)

MozJexl uses a pipe `|` syntax to apply built-in transform functions:

```
value | transformName(args)
```

| Expression | Result |
|---|---|
| `"hello" \| upper` | `"HELLO"` |
| `[1,2,3] \| join(', ')` | `"1, 2, 3"` |
| `'42' \| parseInt` | `42` |

Transforms can be chained:

```
input.name | lower | capitalize
```

## Custom operators

Datadance adds two custom binary operators:

- **`_=`** — Case-insensitive string equality: `"Hello" _= "hello"` returns `true`
- **`===`** — Strict equality (type + value): `"5" === 5` returns `false`
