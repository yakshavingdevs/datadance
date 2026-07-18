# DDS Syntax (Datadance Syntax)

DDS (Datadance Syntax) is a YAML-like alternative to writing transforms in JSON. It is more concise and readable, especially for complex transformations.

## Writing transforms in DDS

Each line defines one transform: a field name followed by a colon and the expression.

```yaml
field1: expression1
field2: expression2
```

## Example

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="json" label="JSON" default>

```json
[
  { "fullName": "input.first + ' ' + input.last" },
  { "age": "input.age | parseInt" }
]
```

</TabItem>
<TabItem value="dds" label="DDS">

```yaml
fullName: input.first + ' ' + input.last
age: input.age | parseInt
```

</TabItem>
</Tabs>

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

<Tabs>
<TabItem value="dds" label="DDS" default>

```yaml
address:
  street: upper(input.address.street)
  city: upper(input.address.city)
```

</TabItem>
<TabItem value="json" label="Equivalent JSON">

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

</TabItem>
</Tabs>

## Rules

| Rule | Detail |
|---|---|
| Indentation | Must be in **multiples of 2 spaces** (no tabs) |
| Field names | Only alphanumeric, underscores, and dollar signs |
| String literals | Use **single quotes**, not double quotes |
| Values without colon | Creates a nested transform block |

## Converting between formats

Use the dedicated endpoints for conversion:

- **DDS → JSON**: `POST /api/parse` with DDS text as the body
- **JSON → DDS**: `POST /api/encode` with JSON transforms as the body
