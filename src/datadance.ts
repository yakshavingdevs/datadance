import { routes } from "./routes.ts";

const handler = async (request: Request): Promise<Response> => {
  for (const [routeKey, controller] of routes.entries()) {
    // https://examples.deno.land/http-server-routing
    const routeKeyPatternMatch = routeKey.pattern.exec(request.url)

    if (request.method === routeKey.method && routeKeyPatternMatch) {
      return await controller(routeKeyPatternMatch, request)
    }
  }

  return new Response("No matching route found. Please try POST /process", {
    status: 404,
  });
}

Deno.serve(handler)