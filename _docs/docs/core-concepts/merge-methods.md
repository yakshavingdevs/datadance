# Merge Methods

The `merge_method` setting controls how the transformed output is combined with the original input.

## overwrite

Transformed fields replace input fields with the same key. Input fields not mentioned in transforms are preserved.

```js
const result = await transform({
  input: { x: 1, y: 2 },
  transforms: [{ x: "input.x + 10" }],
  settings: { merge_method: "overwrite" },
});
// Result: { x: 11, y: 2 }
```

## preserve

The original input is returned unchanged, and transformed fields are placed under a `transforms` key.

```js
const result = await transform({
  input: { x: 1, y: 2 },
  transforms: [{ x: "input.x + 10" }],
  settings: { merge_method: "preserve" },
});
// Result: { x: 1, y: 2, transforms: { x: 11 } }
```

## transforms_only

Only the transformed fields are returned. All original input fields are discarded.

```js
const result = await transform({
  input: { x: 1, y: 2 },
  transforms: [{ x: "input.x + 10" }],
  settings: { merge_method: "transforms_only" },
});
// Result: { x: 11 }
```

This mode is particularly useful inside sub-transformations and nested transforms, where you want to extract or reshape only specific fields.
