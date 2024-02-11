import mozjexl from 'npm:mozjexl';

import { Controller } from '../types.ts' 

// export function parseJSON(jsonString: string): object | Error {
//     try {
//         const parsedJSON = JSON.parse(jsonString);
//         return parsedJSON;
//     } catch (error) {
//         if (error instanceof SyntaxError) {
//             return new Error('Invalid JSON format.');
//         } else {
//             return error;
//         }
//     }
// }

// let context = {
//     name: {
//         first: "Malory",
//         last: "Archer"
//     },
//     exes: [
//         "Nikolai Jakov",
//         "Len Trexler",
//         "Burt Reynolds"
//     ],
//     lastEx: 2
// }


// mozjexl.eval(`name.first + " " + 10 + exes[]`,context).then((res : string) => {
//     console.log(res);
// });

const ProcessController: Controller = async (_urlData, _originalRequest) => {
  const requestJsonObject = await _originalRequest.json()

  const input: Record<string, any> = requestJsonObject.input
  const transforms: Record<string, any> = requestJsonObject.transforms
  const settings: Record<string, any> = requestJsonObject.settings

  const derived: Record<string, any> = {...input};
  const transformedOutput: Record<string, any> = {}
  
  for (const field of Object.keys(transforms)) {
    transformedOutput[field] = await mozjexl.eval(transforms[field], {
      input,
      derived
    })
    derived[field] = transformedOutput[field]
  }

  if (!settings.merge_method || settings.merge_method.toLowerCase() === "overwrite") {
    return Response.json({
      ...input,
      ...transformedOutput
    })
  }

  if (settings.merge_method === "preserve") {
    return Response.json({
      ...input,
      transforms: transformedOutput
    })
  }

  if (settings.merge_method === "transforms_only") {
    return Response.json(transformedOutput)
  }

  return Response.error()
}

export default ProcessController