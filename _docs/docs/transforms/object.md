# Object Transforms

Object transforms operate on object values using the pipe syntax.

## keys

Returns an array of the object's keys.

```js
input.person | keys    // ["name", "age", "email"]
```

## values

Returns an array of the object's values.

```js
input.person | values    // ["Alice", 30, "alice@example.com"]
```

## entries

Returns an array of key-value pairs (entries).

```js
input.person | entries    // [["name", "Alice"], ["age", 30]]
```

## get

Gets a property value from an object. Returns `null` if the property does not exist.

```js
input.person | get('name')    // "Alice"
```

## has

Checks if an object has a specific property (own property).

```js
input.person | has('name')    // true
```

## delete

Returns a new object with specified properties removed.

```js
input.person | delete('age', 'email')    // { name: "Alice" }
```

## stringify

Converts an object or array to a JSON string.

```js
input.person | stringify    // '{"name":"Alice","age":30}'
```

## deepMerge

Deep merges two objects. Nested objects are merged recursively.

```js
input.defaults | deepMerge(input.overrides)
```

Later values override earlier ones for conflicting keys.
