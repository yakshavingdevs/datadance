import { build, emptyDir } from "@deno/dnt";

await emptyDir("./npm");

await build({
    entryPoints: ["./core/mod.ts"],
    outDir: "./npm",
    typeCheck: "both",
    shims: {
        deno: true
    },
    test: false,
    package: {
        name: "datadance",
        version: "1.0.1",
        description: "DataDance is a versatile data processing package that makes handling JSON transformations straightforward and efficient. Our package accepts JSON input and allows you to define transformations using a code-like format. Provide your data and transformation rules, and DataDance will process them to deliver the desired output.",
        license: "MIT",
        type: "module",
        repository: {
            type: "git",
            url: "git+https://github.com/yakshavingdevs/datadance",
        },
        bugs: {
            url: "https://github.com/yakshavingdevs/datadance/issues",
        },
        dependencies: {
            luxon: "3.5.0",
            jsonpath: "1.1.1",
            mozjexl: "1.1.6",
        },
        devDependencies: {
            "@types/luxon": "3.4.2",
            "@types/jsonpath": "0.2.4"
        },
        "publishConfig": {
            "access": "public"
        }
    },
    postBuild() {
        Deno.copyFileSync("LICENSE", "npm/LICENSE");
        Deno.copyFileSync("README.md", "npm/README.md");
    },
});