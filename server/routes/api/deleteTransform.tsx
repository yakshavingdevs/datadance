import { Handlers } from "$fresh/server.ts";
import { isValidEmail } from "../../utils/data_validation.ts";
import KvSingleton from "../../utils/kv_instance.ts";

export const handler: Handlers = {
  async DELETE(request) {
    const kv = await KvSingleton.getInstance();
    try {
      const requestData = await request.json();
      const { emailId, transformName } = requestData;

      if (!isValidEmail(emailId)) {
        throw new Error(`Invalid email Id : ${emailId}`);
      }

      await kv.delete([emailId, transformName]);

      return new Response(
        JSON.stringify(
          {
            "status": `The transform ${transformName} is deleted successfully`,
          },
        ),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};
