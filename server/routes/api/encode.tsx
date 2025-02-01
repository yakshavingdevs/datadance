import { Handlers } from "$fresh/server.ts";
import { jsonToDds } from "../../../core/dds.ts";

export const handler: Handlers = {
  async POST(request) {
    try {
      const data = await request.json();
      const parsedTransformsData = jsonToDds(data);
      return new Response(JSON.stringify(parsedTransformsData), {
        status: 200,
        headers: { "Content-Type": "text/yaml" },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};
