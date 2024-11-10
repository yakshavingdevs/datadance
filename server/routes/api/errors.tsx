import { Handlers } from "$fresh/server.ts";
import { Errors } from "../../../core/constants.ts";

export const handler: Handlers = {
  GET(_request) {
    try {
      return new Response(JSON.stringify(Object.values(Errors), null, 2), {
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
