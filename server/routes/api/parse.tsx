import { Handlers } from "$fresh/server.ts";
import { parseTransforms } from "../../utils/parser.ts";

export const handler: Handlers = {
  async POST(request) {
    try {
      const data = await request.text();
      const parsedTransformsData = parseTransforms(data);
      return new Response(JSON.stringify(parsedTransformsData), {
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
