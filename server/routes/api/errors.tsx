import { Handlers } from "$fresh/server.ts";
import { errors } from "../../../core/constants.ts";

export const handler: Handlers = {
  GET(_request) {
    try {
      return new Response(JSON.stringify(errors, null, 2), {
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
