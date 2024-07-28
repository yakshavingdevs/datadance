import { Handlers } from "$fresh/server.ts";
import { isValidEmail } from "../../utils/data_validation.ts";
import KvSingleton from "../../utils/kv_instance.ts";

export const handler: Handlers = {
  async POST(request) {
    const kv = await KvSingleton.getInstance();
    try {
      const requestData = await request.json();
      const { emailId } = requestData;

      if (!isValidEmail(emailId)) {
        throw new Error(`Invalid email Id : ${emailId}`);
      }

      const iter = kv.list<string>({ prefix: [emailId] });
      const transforms = [];
      for await (const res of iter) transforms.push(res);

      return new Response(
        JSON.stringify(
          transforms,
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
