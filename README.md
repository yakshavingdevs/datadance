# Datadance
Datadance is a Typescript based library to transform JSON data using a JSON output specification.

# How to run the server
```deno task serve```

# Transforms Expression Language Reference

MozJexl: https://www.npmjs.com/package/mozjexl

# How to use

**Request Structure:**
```json
{
  "input": {
    "name": {
        "first": "Malory",
        "last": "Archer"
    },
    "exes": [
        "Nikolai Jakov",
        "Len Trexler",
        "Burt Reynolds"
    ],
    "lastEx": 2
  },
  "transforms": [
    {"lastEx": "input.lastEx + 5"}
  ],
  "settings": {
    "merge_method": "overwrite (default) | preserve | transforms_only"
  }
}
```

**Merge Method Usage:**

1. overwrite (default)

Input:
```json
{
    "name": {
        "first": "Malory",
        "last": "Archer"
    },
    "exes": [
        "Nikolai Jakov",
        "Len Trexler",
        "Burt Reynolds"
    ],
    "lastEx": 2
}
```
Transforms: 
```json
[
  {"lastEx": "input.lastEx + 5"}
]
```
Output:
```json
{
    "name": {
        "first": "Malory",
        "last": "Archer"
    },
    "exes": [
        "Nikolai Jakov",
        "Len Trexler",
        "Burt Reynolds"
    ],
    "lastEx": 7
}
```

2. preserve

Input:
```json
{
    "name": {
        "first": "Malory",
        "last": "Archer"
    },
    "exes": [
        "Nikolai Jakov",
        "Len Trexler",
        "Burt Reynolds"
    ],
    "lastEx": 2
}
```
Transforms: 
```json
[
  {"lastEx": "input.lastEx + 5"}
]
```
Output:
```json
{
    "name": {
        "first": "Malory",
        "last": "Archer"
    },
    "exes": [
        "Nikolai Jakov",
        "Len Trexler",
        "Burt Reynolds"
    ],
    "lastEx": 2
    "transforms": {
      "lastEx": 7
    }
}
```

3. transforms_only

Input:
```json
{
    "name": {
        "first": "Malory",
        "last": "Archer"
    },
    "exes": [
        "Nikolai Jakov",
        "Len Trexler",
        "Burt Reynolds"
    ],
    "lastEx": 2
}
```
Transforms: 
```json
[
  {"lastEx": "input.lastEx + 5"}
]
```
Output:
```json
{
  "lastEx": 7
}
```

## Example using the CLI
```
./bin/datadance -i '{"hello": "world"}' -t '[{"also": "\"hello \" + input.hello"}]' -s '{"merge_method": "overwrite"}'
```