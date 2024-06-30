import mozjexl from "npm:mozjexl";

mozjexl.addTransform("upper", (val: Array<string> | string) => {
    if(typeof val === "string") return val.toUpperCase();
  const result: Array<string> = [];
  val.forEach((record) => {
    if (typeof record === "string") {
      result.push(record.toUpperCase());
    } else {
      result.push(record);
    }
  });
  return result;
});

export default mozjexl;
