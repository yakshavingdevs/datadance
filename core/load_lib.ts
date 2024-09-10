// Copyright (c) 2024-Present The Yak Shaving Devs, MIT License

import mozjexl from "mozjexl";
import {
  CAPITALIZE,
  ENDS_WITH,
  INDEX_OF_CHAR,
  LENGTH,
  LOWER,
  LTRIM,
  PAD_END,
  PAD_START,
  PARSE_FLOAT,
  PARSE_INT,
  REPLACE,
  REPLACE_ALL,
  REVERSE,
  RTRIM,
  SLUGIFY,
  SPLIT,
  STARTS_WITH,
  SUBSTRING,
  SWAP_CASE,
  TO_BOOLEAN,
  TRIM,
  UNSLUGIFY,
  UPPER
} from "./lib/transforms/string_transforms.ts";
import {
  FOREACH,
  JSONPATH,
  PARSE_JSON,
  TYPE
} from "./lib/transforms/misc_transforms.ts";
import {
  JOIN,
  MAX,
  MIN,
  PLUCK,
  POP,
  PUSH,
  RANGE,
  REMOVE_DUPLICATES,
  REVERSE_ARRAY,
  SIZE,
  SLICE,
  SORT_ARRAY
} from "./lib/transforms/array_transforms.ts";
import {
  DELETE,
  ENTRIES,
  HAS,
  KEYS,
  STRINGIFY,
  VALUES
} from "./lib/transforms/object_transforms.ts";
import {
  ABS,
  CEIL,
  FLOOR,
  RANDOM,
  ROUND
} from "./lib/transforms/number_transforms.ts";

// String transforms
mozjexl.addTransform("upper", UPPER);
mozjexl.addTransform("lower", LOWER);
mozjexl.addTransform("capitalize", CAPITALIZE);
mozjexl.addTransform("swapCase", SWAP_CASE);
mozjexl.addTransform("startsWith", STARTS_WITH);
mozjexl.addTransform("endsWith", ENDS_WITH);
mozjexl.addTransform("indexOfChar", INDEX_OF_CHAR);
mozjexl.addTransform("trim", TRIM);
mozjexl.addTransform("ltrim", LTRIM);
mozjexl.addTransform("rtrim", RTRIM);
mozjexl.addTransform("length", LENGTH);
mozjexl.addTransform("replace", REPLACE);
mozjexl.addTransform("replaceAll", REPLACE_ALL);
mozjexl.addTransform("split", SPLIT);
mozjexl.addTransform("substring", SUBSTRING);
mozjexl.addTransform("padStart", PAD_START);
mozjexl.addTransform("padEnd", PAD_END);
mozjexl.addTransform("parseInt", PARSE_INT);
mozjexl.addTransform("parseFloat", PARSE_FLOAT);
mozjexl.addTransform("toBoolean", TO_BOOLEAN);
mozjexl.addTransform("reverse", REVERSE);
mozjexl.addTransform("slugify", SLUGIFY);
mozjexl.addTransform("unslugify", UNSLUGIFY);

// Misc transforms
mozjexl.addTransform("forEach", FOREACH);
mozjexl.addTransform("jsonpath", JSONPATH);
mozjexl.addTransform("type", TYPE);
mozjexl.addTransform("parseJson", PARSE_JSON);

// Array transforms
mozjexl.addTransform("pluck", PLUCK);
mozjexl.addTransform("size", SIZE);
mozjexl.addTransform("push", PUSH);
mozjexl.addTransform("pop", POP);
mozjexl.addTransform("join", JOIN);
mozjexl.addTransform("slice", SLICE);
mozjexl.addTransform("reverseArray", REVERSE_ARRAY);
mozjexl.addTransform("sortArray", SORT_ARRAY);
mozjexl.addTransform("range", RANGE);
mozjexl.addTransform("removeDuplicates", REMOVE_DUPLICATES);
mozjexl.addTransform("max", MAX);
mozjexl.addTransform("min", MIN);

// Object transforms
mozjexl.addTransform("keys", KEYS);
mozjexl.addTransform("values", VALUES);
mozjexl.addTransform("entries", ENTRIES);
mozjexl.addTransform("has", HAS);
mozjexl.addTransform("delete", DELETE);
mozjexl.addTransform("stringify", STRINGIFY);

// Number transforms
mozjexl.addTransform("abs", ABS);
mozjexl.addTransform("ceil", CEIL);
mozjexl.addTransform("floor", FLOOR);
mozjexl.addTransform("round", ROUND);
mozjexl.addTransform("random", RANDOM);

export default mozjexl;