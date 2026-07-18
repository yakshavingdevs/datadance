# Miscellaneous Transforms

Miscellaneous transforms provide utilities for iteration, JSONPath queries, type checking, and more.

## forEach

Iterates over an array and applies transforms to each item. The current item is available as `item`, and the index as `_idx`.

```json
[
  { "updatedItems": "input.items | forEach([{ name: 'upper(item.name)' }, { priceWithTax: 'item.price * 1.1' }])" }
]
```

**Parameters:**
- `val` — The input array
- `transforms` — Array of transforms to apply to each item
- `context` (optional) — An object made available to expressions
- `filterOn` (optional) — A field name to filter results; only items where this field is truthy are included

**With filter:**
```json
[
  {
    "adults": "input.people | forEach([{ name: 'upper(item.name)', isAdult: 'item.age >= 18' }], {}, 'isAdult')"
  }
]
```

## jsonpath

Queries an object or array using JSONPath expressions.

```js
input.data | jsonpath('$.store.book[*].title')
```

You can also query multiple fields at once:

```js
input.data | jsonpath([{ titles: '$.store.book[*].title' }, { prices: '$.store.book[*].price' }])
```

## type

Returns the type of a value as a string.

```js
"hello" | type      // "String"
42 | type           // "Number"
true | type         // "Boolean"
[1,2,3] | type      // "Array"
{...} | type        // "Object"
```

## parseJson

Parses a JSON string into an object or array.

```js
'{"name":"Alice"}' | parseJson    // { name: "Alice" }
```

## UUID

Generates a random UUID (v4).

```js
null | UUID    // "550e8400-e29b-41d4-a716-446655440000"
```

## evaluateExpression

Interpolates values into a template string expression. Variables are referenced from the context.

```js
"'Hello, ' + input.name" | evaluateExpression
```

Where `evaluateExpression` evaluates the string as a MozJexl expression and returns the result. This is useful when you have expression strings stored in data.
