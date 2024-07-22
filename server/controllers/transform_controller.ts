import { Controller } from "../../core/types.ts";
import { isValidEmail } from "../utils/data_validation.ts";
import KvSingleton from "../utils/kv_instance.ts";

export const SaveTransformController: Controller = async (_urlData, request) => {
  const kv = await KvSingleton.getInstance();
  try {
    const requestData = await request.json();
    const { transformName, settings, emailId, transforms } = requestData;

    if (!isValidEmail(emailId)) {
      throw new Error(`Invalid email Id : ${emailId}`);
    }

    const result = await kv.set([emailId, transformName], {
      settings: settings,
      transforms: transforms
    });

    return new Response(JSON.stringify({
      status: "The transforms are saved successfully!...",
      versionstamp: result.versionstamp
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const RetrieveTransformController: Controller = async (_urlData, request) => {
  const kv = await KvSingleton.getInstance();
  try {
    const requestData = await request.json();
    const { transformName, emailId } = requestData;

    if (!isValidEmail(emailId)) {
      throw new Error(`Invalid email Id : ${emailId}`);
    }

    const { key, value, versionstamp } = await kv.get<string>([emailId, transformName]);

    return new Response(JSON.stringify(
      {
        key: key,
        value: value,
        versionstamp: versionstamp
      }
    ), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const RetrieveAllTransformsByEmailController: Controller = async (_urlData, request) => {
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

    return new Response(JSON.stringify(
      transforms
    ), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const DeleteTransformController: Controller = async (_urlData, request) => {
  const kv = await KvSingleton.getInstance();
  try {
    const requestData = await request.json();
    const { emailId, transformName } = requestData;

    if (!isValidEmail(emailId)) {
      throw new Error(`Invalid email Id : ${emailId}`);
    }

    await kv.delete([emailId, transformName])

    return new Response(JSON.stringify(
      { "status": `The transform ${transformName} is deleted successfully` }
    ), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const DeleteAllTransformsByEmailController: Controller = async (_urlData, request) => {
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

    for (let idx = 0; idx < transforms.length; idx++) {
      const transformName = transforms[idx].key[1];
      await kv.delete([emailId, transformName]);
    }

    return new Response(JSON.stringify(
      { "status": `All transforms created by user ${emailId} are deleted successfully` }
    ), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

