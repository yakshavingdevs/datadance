import Playground from "../../islands/Playground/Playground.tsx";
import { Head } from "$fresh/runtime.ts";

export default function PlayGroundPage() {
  return (
    <>
      <Head>
        <title>Playground - Datadance</title>
        <meta
          name="description"
          content="This is the playground UI for datadance."
        />
        <link
          rel="stylesheet"
          href="/highlight_json.css"
        />
      </Head>
      <div>
        <Playground />
      </div>
    </>
  );
}
