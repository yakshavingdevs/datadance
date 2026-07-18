# CLI

Datadance provides a command-line interface (CLI) for running transforms directly from the terminal.

## Compiling

Build the CLI binary from the repository:

```bash
deno task compile
```

This produces a binary at `./bin/datadance`.

## Usage

```bash
./bin/datadance -i '<json>' -t '<transforms>' -s '<settings>'
```

### Arguments

| Flag | Alias | Description |
|---|---|---|
| `--input` | `-i` | Input JSON data |
| `--transforms` | `-t` | Transforms as a JSON array |
| `--settings` | `-s` | Settings object with merge method |

### Example

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="command" label="Command" default>

```bash
./bin/datadance \
  -i '{"hello": "world"}' \
  -t '[{"also": "\"hello \" + input.hello"}]' \
  -s '{"merge_method": "overwrite"}'
```

</TabItem>
<TabItem value="output" label="Output">

```json
{ "hello": "world", "also": "hello world" }
```

</TabItem>
</Tabs>
