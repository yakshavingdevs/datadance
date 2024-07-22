import { Controller } from "../../core/types.ts";
import { transform } from "../../core/transform.ts";

const ProcessController: Controller = async (_urlData, request) => {
  try {
    const requestData = await request.json();
    const transformedData = await transform(requestData);

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
};

export default ProcessController;