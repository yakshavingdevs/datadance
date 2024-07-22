import { transform } from "@scope/core";
import { Controller, DataObject } from "@scope/core/types";
import { isValidEmail } from "../utils/data_validation.ts";
import KvSingleton from "../utils/kv_instance.ts";

export const RunController: Controller = async (_urlData, request) => {
    const kv = await KvSingleton.getInstance();
    try {
        const requestData = await request.json();
        const { emailId, transformName, input } = requestData;

        if (!isValidEmail(emailId)) {
            throw new Error(`Invalid email Id : ${emailId}`);
        }

        const { value } = await kv.get<Record<string, any>>([emailId, transformName]);
        if(value === null){
            return new Response(JSON.stringify({ error: `The transformation ${transformName} not found.` }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }
        const dataObject: DataObject = {
            input: input,
            transforms: value ? value.transforms : [],
            settings: value ? value.settings : { "merge_method": "overwrite" }
        }
        const transformedData = await transform(dataObject);

        return new Response(JSON.stringify(transformedData), {
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