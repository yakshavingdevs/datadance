# DDS Syntax (Datadance Syntax)

DDS (Datadance Syntax) is a YAML-like alternative to writing transforms in JSON. It is more concise and readable, especially for complex transformations.

## Writing transforms in DDS

```yaml
field1: expression1
field2: expression2
```

Each line defines one transform: a field name followed by a colon and the expression.

## Example

**JSON transforms:**
```json
[
  { "fullName": "input.first + ' ' + input.last" },
  { "age": "input.age | parseInt" }
]
```

**DDS equivalent:**
```yaml
fullName: input.first + ' ' + input.last
age: input.age | parseInt
```

## Using DDS with the API

Set `transforms_syntax: "dds"` in the settings and pass the transforms as a string:

```json
{
  "input": { "first": "Alice", "last": "Smith", "age": "30" },
  "transforms": "fullName: input.first + ' ' + input.last\nage: input.age | parseInt",
  "settings": { "merge_method": "overwrite", "transforms_syntax": "dds" }
}
```

## Nested transforms in DDS

Indentation (2 spaces) defines nesting:

```yaml
address:
  street: upper(input.address.street)
  city: upper(input.address.city)
```

This is equivalent to:

```json
[
  {
    "address": [
      { "street": "upper(input.address.street)" },
      { "city": "upper(input.address.city)" }
    ]
  }
]
```

## Rules

- Indentation must be in **multiples of 2 spaces** (no tabs)
- Field names can only use alphanumeric characters, underscores, and dollar signs
- String literals use **single quotes**, not double quotes
- Values without a colon create a nested transform block

## Converting between formats

Datadance provides API endpoints for conversion:

- **DDS → JSON**: `POST /api/parse` with DDS text as the body
- **JSON → DDS**: `POST /api/encode` with JSON transforms as the body
