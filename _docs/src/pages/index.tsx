import type { ReactNode } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

const features = [
  {
    icon: "🔒",
    title: "Safe Execution",
    description:
      "No arbitrary code execution. Transforms are declarative expressions evaluated by MozJexl — easy to write, maintain, and audit.",
  },
  {
    icon: "⚡",
    title: "60+ Built-in Transforms",
    description:
      "Rich library for strings, arrays, objects, numbers, dates, and more. Compose them to build powerful data pipelines.",
  },
  {
    icon: "🔀",
    title: "Multiple Merge Modes",
    description:
      "Choose between overwrite, preserve, and transforms_only to control exactly how your output merges with input.",
  },
  {
    icon: "🧩",
    title: "Nested Transforms",
    description:
      "Apply transformations recursively on deeply nested objects with full control over the structure.",
  },
  {
    icon: "📝",
    title: "DDS Syntax",
    description:
      "Write transforms in a clean, YAML-like syntax instead of JSON. More readable, less boilerplate.",
  },
  {
    icon: "🧪",
    title: "Interactive Playground",
    description:
      "Experiment with transforms in your browser. See input, transforms, and output side by side in real time.",
  },
];

const codeExample = `import { transform } from "datadance";

const result = await transform({
  input: {
    name: { first: "Malory", last: "Archer" },
    exes: ["Nikolai Jakov", "Len Trexler", "Burt Reynolds"],
    lastEx: 2,
  },
  transforms: [
    { lastEx: "input.lastEx + 5" },
    { fullName: "input.name.first + ' ' + input.name.last" },
  ],
  settings: { merge_method: "overwrite" },
});

// → { name: {...}, exes: [...], lastEx: 7, fullName: "Malory Archer" }`;

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="Home"
      description="Simple, open-source JSON data transformation tool"
    >
      {/* Hero */}
      <section className="dd-hero">
        <div className="dd-hero-grid" />
        <div className="dd-hero-content">
          <div className="dd-hero-badge">
            <span>✦</span> Open Source &amp; MIT Licensed
          </div>
          <h1 className="dd-hero-title">
            Transform JSON
            <br />
            <span className="dd-gradient">without the complexity</span>
          </h1>
          <p className="dd-hero-subtitle">
            {siteConfig.tagline}. Declarative transforms, safe execution, and a
            rich built-in library — all in one lightweight tool.
          </p>
          <div className="dd-hero-actions">
            <a className="dd-btn dd-btn-primary" href="/docs/intro">
              Get Started →
            </a>
            <a className="dd-btn dd-btn-outline" href="/playground">
              Try the Playground
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="dd-features">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2
              style={{
                fontSize: "2.2rem",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                marginBottom: "0.5rem",
              }}
            >
              Why Datadance?
            </h2>
            <p
              style={{
                color: "var(--ifm-color-emphasis-600)",
                fontSize: "1.1rem",
                maxWidth: "520px",
                margin: "0 auto",
              }}
            >
              Everything you need to transform JSON data — safely, quickly, and
              without writing code.
            </p>
          </div>
          <div className="dd-features-grid">
            {features.map((f, i) => (
              <div className="dd-feature-card" key={i}>
                <div className="dd-feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Preview */}
      <section className="dd-code-preview">
        <div className="container">
          <div className="dd-code-preview-inner">
            <h2>Simple, readable, powerful</h2>
            <p>
              Write transforms as plain objects. No scripts, no sandboxing, no
              headaches.
            </p>
            <div className="dd-code-window">
              <div className="dd-code-window-header">
                <div className="dd-code-dot" />
                <div className="dd-code-dot" />
                <div className="dd-code-dot" />
                <span>example.js</span>
              </div>
              <pre>
                <code>{codeExample}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="dd-cta">
        <div className="container">
          <h2>Ready to dance with your data?</h2>
          <p>Start transforming JSON in minutes — no configuration needed.</p>
          <div className="dd-hero-actions">
            <a
              className="dd-btn dd-btn-primary"
              href="/docs/getting-started/installation"
            >
              Install Now →
            </a>
            <a className="dd-btn dd-btn-outline" href="/api-reference">
              View API Reference
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
