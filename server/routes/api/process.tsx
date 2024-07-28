import { Handlers } from "$fresh/server.ts";
import { transform } from "../../../core/transform.ts";

export const handler: Handlers = {
  async POST(request) {
    try {
      const data = await request.json();
      const transformedData = await transform(data);
      return new Response(JSON.stringify(transformedData), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};
