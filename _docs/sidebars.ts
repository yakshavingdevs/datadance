import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  docs: [
    "intro",
    {
      type: "category",
      label: "Getting Started",
      items: [
        "getting-started/installation",
        "getting-started/quickstart",
      ],
    },
    {
      type: "category",
      label: "Core Concepts",
      items: [
        "core-concepts/transforms",
        "core-concepts/merge-methods",
        "core-concepts/expressions",
        "core-concepts/temporary-fields",
        "core-concepts/sub-transforms",
        "core-concepts/nested-transforms",
        "core-concepts/dds-syntax",
      ],
    },
    {
      type: "category",
      label: "Transform Reference",
      items: [
        "transforms/string",
        "transforms/array",
        "transforms/object",
        "transforms/number",
        "transforms/date",
        "transforms/misc",
      ],
    },
    "cli",
    {
      type: "category",
      label: "API Reference",
      items: [
        "api-reference",
        "api-endpoints/process",
        "api-endpoints/run",
        "api-endpoints/save-transform",
        "api-endpoints/retrieve-transform",
        "api-endpoints/delete-transform",
        "api-endpoints/parse",
        "api-endpoints/encode",
        "api-endpoints/health",
        "api-endpoints/errors",
      ],
    },
    "contributing",
  ],
};

export default sidebars;
