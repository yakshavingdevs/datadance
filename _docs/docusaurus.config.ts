import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Datadance",
  tagline: "Simple, open-source JSON data transformation tool",
  favicon: "img/favicon.ico",

  url: "https://docs.datadance.org",
  baseUrl: "/",

  organizationName: "yakshavingdevs",
  projectName: "datadance",

  onBrokenLinks: "throw",
  markdown: { hooks: { onBrokenMarkdownLinks: "warn" as any } },

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl: "https://github.com/yakshavingdevs/datadance/edit/main/_docs/",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/datadance-social-card.png",
    navbar: {
      title: "Datadance",
      logo: {
        alt: "Datadance Logo",
        src: "img/datadance-dark-theme-logo.png",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "docs",
          position: "left",
          label: "Docs",
        },
        { to: "/playground", label: "Playground", position: "left" },
        {
          href: "https://github.com/yakshavingdevs/datadance",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            { label: "Getting Started", to: "/docs/getting-started/installation" },
            { label: "Transform Reference", to: "/docs/transforms/string" },
            { label: "API Reference", to: "/api-reference" },
          ],
        },
        {
          title: "Links",
          items: [
            { label: "Playground", to: "/playground" },
            { label: "API Reference", to: "/api-reference" },
            { label: "NPM", href: "https://www.npmjs.com/package/datadance" },
          ],
        },
        {
          title: "Community",
          items: [
            { label: "GitHub", href: "https://github.com/yakshavingdevs/datadance" },
            { label: "Issues", href: "https://github.com/yakshavingdevs/datadance/issues" },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} The Yak Shaving Devs. MIT License.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["json", "bash", "yaml"],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
