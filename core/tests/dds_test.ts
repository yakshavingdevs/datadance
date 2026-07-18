import { jsonToDds, ddsToJson, isDdsDataObject } from "../dds.ts";
import { assertEquals, assert } from "$std/assert/mod.ts";

Deno.test("jsonToDds converts simple transform to DDS", () => {
  const transforms = [{ name: "upper(input.name)" }];
  const result = jsonToDds(transforms);
  assertEquals(result, "name: upper(input.name)\n");
});

Deno.test("jsonToDds converts nested transforms", () => {
  const transforms = [{ user: [{ name: "upper(input.name)" }, { age: "input.age" }] }];
  const result = jsonToDds(transforms);
  assert(result.includes("user:"));
  assert(result.includes("name:"));
  assert(result.includes("age:"));
});

Deno.test("jsonToDds handles multiple keys at same level", () => {
  const transforms = [{ a: "1" }, { b: "2" }];
  const result = jsonToDds(transforms);
  assertEquals(result, "a: 1\nb: 2\n");
});

Deno.test("ddsToJson parses simple DDS to JSON", () => {
  const dds = "name: upper(input.name)\n";
  const result = ddsToJson(dds);
  assertEquals(result, [{ name: "upper(input.name)" }]);
});

Deno.test("ddsToJson parses multi-line DDS", () => {
  const dds = "name: upper(input.name)\nage: input.age\n";
  const result = ddsToJson(dds);
  assertEquals(result, [{ name: "upper(input.name)" }, { age: "input.age" }]);
});

Deno.test("ddsToJson parses nested DDS", () => {
  const dds = "user:\n  name: upper(input.name)\n  age: input.age\n";
  const result = ddsToJson(dds);
  assertEquals(result, [{ user: [{ name: "upper(input.name)" }, { age: "input.age" }] }]);
});

Deno.test("ddsToJson handles empty lines", () => {
  const dds = "a: 1\n\nb: 2\n";
  const result = ddsToJson(dds);
  assertEquals(result, [{ a: "1" }, { b: "2" }]);
});

Deno.test("ddsToJson returns error for odd indentation", () => {
  const dds = "a:\n   b: 1\n";
  const result = ddsToJson(dds);
  assertEquals(typeof result[0], "object");
  assert("error" in result[0] || result[0].error !== undefined);
});

Deno.test("ddsToJson returns error for double quotes", () => {
  const dds = 'a: "hello"\n';
  const result = ddsToJson(dds);
  assertEquals(typeof result[0], "object");
  assert("error" in result[0] || result[0].error !== undefined);
});

Deno.test("ddsToJson returns error for invalid field characters", () => {
  const dds = "field@name: value\n";
  const result = ddsToJson(dds);
  assertEquals(typeof result[0], "object");
  assert("error" in result[0] || result[0].error !== undefined);
});

Deno.test("ddsToJson handles colon in values", () => {
  const dds = "name: concat(input.first, ': ', input.last)\n";
  const result = ddsToJson(dds);
  assertEquals(result, [{ name: "concat(input.first, ':', input.last)" }]);
});

Deno.test("isDdsDataObject detects DDS syntax", () => {
  const obj: any = { settings: { transforms_syntax: "dds" } };
  assert(isDdsDataObject(obj));
});

Deno.test("isDdsDataObject returns false for JSON syntax", () => {
  const obj: any = { settings: { transforms_syntax: "json" } };
  assertEquals(isDdsDataObject(obj), false);
});

Deno.test("isDdsDataObject returns false when syntax key is missing", () => {
  const obj: any = { settings: {} };
  assertEquals(isDdsDataObject(obj), false);
});

Deno.test("jsonToDds roundtrip: simple transforms", () => {
  const original = [{ a: "1" }, { b: "2" }, { c: "3" }];
  const dds = jsonToDds(original);
  const result = ddsToJson(dds);
  assertEquals(result, original);
});

Deno.test("jsonToDds roundtrip: nested transforms", () => {
  const original = [{ user: [{ name: "upper(input.name)" }] }];
  const dds = jsonToDds(original);
  const result = ddsToJson(dds);
  assertEquals(result, original);
});
