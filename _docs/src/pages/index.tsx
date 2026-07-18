import type { ReactNode } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="Home"
      description="Simple, open-source JSON data transformation tool"
    >
      <main className="hero hero--primary">
        <div className="container" style={{ textAlign: "center", padding: "4rem 0" }}>
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div style={{ marginTop: "2rem" }}>
            <a
              className="button button--secondary button--lg"
              href="/docs/intro"
              style={{ marginRight: "1rem" }}
            >
              Get Started
            </a>
            <a
              className="button button--secondary button--lg"
              href="/playground"
            >
              Try the Playground
            </a>
          </div>
        </div>
      </main>
    </Layout>
  );
}
