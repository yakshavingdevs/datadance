import { Handlers } from "$fresh/server.ts";
import { isValidEmail } from "../../utils/data_validation.ts";
import KvSingleton from "../../utils/kv_instance.ts";

export const handler: Handlers = {
  async POST(request) {
    const kv = await KvSingleton.getInstance();
    try {
      const requestData = await request.json();
      const { transformName, settings, emailId, transforms } = requestData;

      if (!isValidEmail(emailId)) {
        throw new Error(`Invalid email Id : ${emailId}`);
      }

      const result = await kv.set([emailId, transformName], {
        settings: settings,
        transforms: transforms,
      });

      return new Response(
        JSON.stringify({
          status: "The transforms are saved successfully!...",
          versionstamp: result.versionstamp,
        }),
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
