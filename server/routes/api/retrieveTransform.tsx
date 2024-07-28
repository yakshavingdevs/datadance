import { Handlers } from "$fresh/server.ts";
import { isValidEmail } from "../../utils/data_validation.ts";
import KvSingleton from "../../utils/kv_instance.ts";

export const handler: Handlers = {
  async POST(request) {
    const kv = await KvSingleton.getInstance();
    try {
      const requestData = await request.json();
      const { transformName, emailId } = requestData;

      if (!isValidEmail(emailId)) {
        throw new Error(`Invalid email Id : ${emailId}`);
      }

      const { key, value, versionstamp } = await kv.get<string>([
        emailId,
        transformName,
      ]);

      return new Response(
        JSON.stringify(
          {
            key: key,
            value: value,
            versionstamp: versionstamp,
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
