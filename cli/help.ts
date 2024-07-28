import figlet from "npm:figlet@1.7.0";

export const printHelp = async (): Promise<void> => {
  const text = await figlet("Datadance");
  console.log(text);
  console.log("Usage: datadance [OPTIONS...]\n");
  console.log("Required options:");
  console.log("-i, --input               The JSON input that you want to apply the transforms on");
  console.log("-t, --transforms          The JSON transformations you want to apply to get the output");
  console.log("-s, --settings            The settings to be used when applying JSON transformations");
}