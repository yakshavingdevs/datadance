import {
  isRegExpExpression,
  getType,
  convertDateTime,
  isValidDateTime,
  symmetricDifference,
  isObject,
} from "../utils.ts";
import { assertEquals, assert } from "$std/assert/mod.ts";

Deno.test("getType returns correct type strings", () => {
  assertEquals(getType("hello"), "String");
  assertEquals(getType(42), "Number");
  assertEquals(getType(true), "Boolean");
  assertEquals(getType([1, 2]), "Array");
  assertEquals(getType({ a: 1 }), "Object");
  assertEquals(getType(undefined), "undefined");
  assertEquals(getType(null), "null");
});

Deno.test("isObject correctly identifies plain objects", () => {
  assert(isObject({}));
  assert(isObject({ a: 1 }));
  assertEquals(isObject(null), false);
  assertEquals(isObject([1, 2]), false);
  assertEquals(isObject("str"), false);
  assertEquals(isObject(42), false);
});

Deno.test("isRegExpExpression validates regex patterns", () => {
  assert(isRegExpExpression("\\d+"));
  assert(isRegExpExpression("[a-z]"));
  assertEquals(isRegExpExpression("["), false);
  assert(isRegExpExpression("hello"));
});

Deno.test("symmetricDifference computes set symmetric difference", () => {
  const setA = new Set(["a", "b", "c"]);
  const setB = new Set(["b", "c", "d"]);
  const result = symmetricDifference(setA, setB);
  assertEquals(result, new Set(["a", "d"]));
});

Deno.test("symmetricDifference with identical sets returns empty", () => {
  const setA = new Set(["x", "y"]);
  const setB = new Set(["x", "y"]);
  assertEquals(symmetricDifference(setA, setB), new Set([]));
});

Deno.test("symmetricDifference with disjoint sets", () => {
  const setA = new Set(["a"]);
  const setB = new Set(["b"]);
  assertEquals(symmetricDifference(setA, setB), new Set(["a", "b"]));
});

Deno.test("isValidDateTime validates ISO date strings", () => {
  assert(isValidDateTime("2024-01-15T10:30:00Z"));
  assert(isValidDateTime("2024-01-15T10:30:00.000Z"));
  assertEquals(isValidDateTime("not-a-date"), false);
  assertEquals(isValidDateTime(""), false);
});

Deno.test("convertDateTime converts ISO to RFC2822", () => {
  const result = convertDateTime("2024-01-15T10:30:00.000Z", "ISO", "RFC2822");
  assertEquals(typeof result, "string");
  assert((result as string).includes("2024"));
});

Deno.test("convertDateTime converts ISO to SQL", () => {
  const result = convertDateTime("2024-01-15T10:30:00.000Z", "ISO", "SQL");
  assertEquals(typeof result, "string");
  assert((result as string).includes("2024-01-15"));
});

Deno.test("convertDateTime converts RFC2822 to ISO", () => {
  const result = convertDateTime("Mon, 15 Jan 2024 10:30:00 GMT", "RFC2822", "ISO");
  assertEquals(typeof result, "string");
  assert((result as string).includes("2024"));
});

Deno.test("convertDateTime converts SQL to ISO", () => {
  const result = convertDateTime("2024-01-15 10:30:00", "SQL", "ISO");
  assertEquals(typeof result, "string");
});

Deno.test("convertDateTime converts HTTP to ISO", () => {
  const result = convertDateTime("Mon, 15 Jan 2024 10:30:00 GMT", "HTTP", "ISO");
  assertEquals(typeof result, "string");
});

Deno.test("convertDateTime converts ISO to Millis", () => {
  const result = convertDateTime("2024-01-15T10:30:00.000Z", "ISO", "Millis");
  assertEquals(typeof result, "string");
  assertEquals(result, "1705314600000");
});

Deno.test("convertDateTime returns error for invalid date string", () => {
  const result = convertDateTime("invalid-date", "ISO", "RFC2822");
  assertEquals(typeof result, "object");
  assert((result as Record<string, string>)["InvalidDateTimeString"] !== undefined);
});

Deno.test("convertDateTime returns error for unsupported fromFormat", () => {
  const result = convertDateTime("2024-01-15", "INVALID" as any, "ISO");
  assertEquals(typeof result, "object");
  assert((result as Record<string, string>)["InvalidFromDateTimeFormat"] !== undefined);
});

Deno.test("convertDateTime returns error for unsupported toFormat", () => {
  const result = convertDateTime("2024-01-15T10:30:00.000Z", "ISO", "INVALID" as any);
  assertEquals(typeof result, "object");
  assert((result as Record<string, string>)["InvalidToDateTimeFormat"] !== undefined);
});
