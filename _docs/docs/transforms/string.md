# String Transforms

String transforms operate on string values using the pipe syntax: `value | transformName(args)`.

## upper

Converts a string to uppercase.

```js
"hello" | upper    // "HELLO"
```

## lower

Converts a string to lowercase.

```js
"HELLO" | lower    // "hello"
```

## capitalize

Capitalizes the first character of a string.

```js
"hello" | capitalize    // "Hello"
```

## swapCase

Swaps the case of each character in a string.

```js
"Hello" | swapCase    // "hELLO"
```

## startsWith

Checks if a string starts with a given substring.

```js
"hello" | startsWith('he')    // true
```

## endsWith

Checks if a string ends with a given substring.

```js
"hello" | endsWith('lo')    // true
```

## indexOfChar

Returns the index of the first occurrence of a character.

```js
"hello" | indexOfChar('l')    // 2
```

## trim

Removes whitespace from both ends of a string.

```js
"  hello  " | trim    // "hello"
```

## ltrim

Removes whitespace from the start of a string.

```js
"  hello" | ltrim    // "hello"
```

## rtrim

Removes whitespace from the end of a string.

```js
"hello  " | rtrim    // "hello"
```

## length

Returns the length of a string.

```js
"hello" | length    // 5
```

## replace

Replaces the first occurrence of a pattern with a replacement string. Supports regex patterns.

```js
"hello world" | replace('world', 'there')    // "hello there"
"hello 123" | replace('[0-9]+', 'XXX')       // "hello XXX"
```

## replaceAll

Replaces all occurrences of a pattern with a replacement string. Supports regex patterns.

```js
"a,b,c" | replaceAll(',', '|')    // "a|b|c"
```

## split

Splits a string by a delimiter into an array. Supports regex.

```js
"a,b,c" | split(',')    // ["a", "b", "c"]
```

## substring

Returns a substring between two indices.

```js
"hello" | substring(1, 4)    // "ell"
```

## padStart

Pads the start of a string to a given length.

```js
"5" | padStart(3, '0')    // "005"
```

## padEnd

Pads the end of a string to a given length.

```js
"5" | padEnd(3, '0')    // "500"
```

## parseInt

Parses a string to an integer with an optional radix.

```js
"42" | parseInt         // 42
"FF" | parseInt(16)     // 255
```

## parseFloat

Parses a string to a floating-point number.

```js
"3.14" | parseFloat    // 3.14
```

## toBoolean

Converts the string `"true"` to `true`, anything else to `false`.

```js
"true" | toBoolean     // true
"false" | toBoolean    // false
```

## reverse

Reverses the characters in a string.

```js
"hello" | reverse    // "olleh"
```

## slugify

Encodes a string as a URI component.

```js
"hello world" | slugify    // "hello%20world"
```

## unslugify

Decodes a URI component back to a string.

```js
"hello%20world" | unslugify    // "hello world"
```
