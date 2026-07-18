# Array Transforms

Array transforms operate on array values using the pipe syntax.

## pluck

Extracts specified properties from an array of objects.

```js
[
  { "items": "input.items | pluck('name')" },
  { "details": "input.items | pluck('name', 'price')" }
]
```

If one property is specified, returns an array of values. If multiple properties, returns an array of objects.

## size

Returns the length of an array, object, or string.

```js
[1, 2, 3] | size        // 3
"hello" | size           // 5
```

## push

Returns a new array with items appended (does not mutate the original).

```js
[1, 2, 3] | push(4, 5)    // [1, 2, 3, 4, 5]
```

## pop

Returns a new array with the last element removed.

```js
[1, 2, 3] | pop    // [1, 2]
```

## join

Joins array elements into a string with a delimiter.

```js
["a", "b", "c"] | join(', ')    // "a, b, c"
```

## slice

Returns a portion of an array between start and end indices.

```js
[1, 2, 3, 4, 5] | slice(1, 3)    // [2, 3]
```

## reverseArray

Returns a reversed copy of the array.

```js
[1, 2, 3] | reverseArray    // [3, 2, 1]
```

## sortArray

Returns a sorted copy of the array.

```js
[3, 1, 2] | sortArray    // [1, 2, 3]
```

## range

Generates an array of numbers in a range.

```js
null | range(1, 5, 1)    // [1, 2, 3, 4, 5]
```

Parameters: `range(start, stop, step)`

## rangeRight

Generates a descending array of numbers.

```js
null | rangeRight(5, 1, 1)    // [5, 4, 3, 2, 1]
```

## removeDuplicates

Returns a new array with duplicate values removed.

```js
[1, 2, 2, 3, 3, 3] | removeDuplicates    // [1, 2, 3]
```

## max

Returns the maximum numeric value in an array.

```js
[1, 5, 3, 9, 2] | max    // 9
```

## min

Returns the minimum numeric value in an array.

```js
[1, 5, 3, 9, 2] | min    // 1
```
