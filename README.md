# Datadance
Datadance is a simple data processing server that takes a JSOn input, performs simple operations on it and returns an output.

# How to run the server
```deno task serve```

# Transforms Expression Language Reference

MozJexl: https://www.npmjs.com/package/mozjexl

# How to use

**Request Structure:**
```json
{
  "input": {
    name: {
        first: "Malory",
        last: "Archer"
    },
    exes: [
        "Nikolai Jakov",
        "Len Trexler",
        "Burt Reynolds"
    ],
    lastEx: 2
  },
  "transforms": {
    lastEx: "input.lastEx + 5"
  },
  "settings": {
    "merge_method": "overwrite (default) | preserve | transforms_only"
  }
}
```

**Merge Method Usage:**

1. overwrite (default)

Input:
```
{
    name: {
        first: "Malory",
        last: "Archer"
    },
    exes: [
        "Nikolai Jakov",
        "Len Trexler",
        "Burt Reynolds"
    ],
    lastEx: 2
}
```
Transforms: 
```
{
  lastEx: "input.lastEx + 5"
}
```
Output:
```
{
    name: {
        first: "Malory",
        last: "Archer"
    },
    exes: [
        "Nikolai Jakov",
        "Len Trexler",
        "Burt Reynolds"
    ],
    lastEx: 7
}
```

2. preserve

Input:
```
{
    name: {
        first: "Malory",
        last: "Archer"
    },
    exes: [
        "Nikolai Jakov",
        "Len Trexler",
        "Burt Reynolds"
    ],
    lastEx: 2
}
```
Transforms: 
```
{
  lastEx: "input.lastEx + 5"
}
```
Output:
```
{
    name: {
        first: "Malory",
        last: "Archer"
    },
    exes: [
        "Nikolai Jakov",
        "Len Trexler",
        "Burt Reynolds"
    ],
    lastEx: 2
    transforms: {
      lastEx: 7
    }
}
```

3. transforms_only

Input:
```
{
    name: {
        first: "Malory",
        last: "Archer"
    },
    exes: [
        "Nikolai Jakov",
        "Len Trexler",
        "Burt Reynolds"
    ],
    lastEx: 2
}
```
Transforms: 
```
{
  lastEx: "input.lastEx + 5"
}
```
Output:
```
{
  lastEx: 7
}
```