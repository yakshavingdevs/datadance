import { routes } from "./routes.ts";

const handler = async (request: Request): Promise<Response> => {
  try {
    const url = new URL(request.url);
    for (const [routeKey, controller] of routes.entries()) {
      const routePatternMatch = routeKey.pattern.exec(url);
      if (request.method === routeKey.method && routePatternMatch) {
        try {
          const response = await controller(routePatternMatch, request);
          return response;
        } catch (controllerError) {
          return new Response(`Controller error: ${controllerError.message}`, {
            status: 500,
          });
        }
      }
    }

    return new Response("No matching route found. Please try POST /process", {
      status: 404,
    });
  } catch (error) {
    return new Response(`Internal server error: ${error.message}`, {
      status: 500,
    });
  }
};

Deno.serve(handler);