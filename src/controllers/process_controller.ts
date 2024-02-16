import mozjexl from 'npm:mozjexl'

import { Controller } from '../types.ts'

const ProcessController: Controller = async (_urlData, _originalRequest) => {
  const requestJsonObject = await _originalRequest.json()

  const input: Record<string, any> = requestJsonObject.input
  const transforms: Record<string, any>[] = requestJsonObject.transforms
  const settings: Record<string, any> = requestJsonObject.settings

  const derived: Record<string, any> = { ...input }
  const transformedOutput: Record<string, any> = {}

  for (const fieldTransformObject of transforms) {
      let field: string | undefined = undefined

      if (Object.keys(fieldTransformObject).length !== 1) {
        return Response.json({
          "error": "Each transform has to have only one key"
        }, {
          status: 500
        })
      }
      else {
        field = Object.keys(fieldTransformObject)[0]
        
        transformedOutput[field] = await mozjexl.eval(fieldTransformObject[field], {
          input,
          derived
        })
      }

      if(!transformedOutput[field]) {
        return Response.json({
          "error": `The transform, "${fieldTransformObject[field]}" uses variables not available in the context`
        }, {
          status: 500
        })
      }

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