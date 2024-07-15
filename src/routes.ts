import { RouteKey, Controller } from "./types.ts"
import ProcessController from "./controllers/process_controller.ts"
import {
  SaveTransformController,
  RetrieveTransformController,
  RetrieveAllTransformsByEmailController,
  DeleteTransformController,
  DeleteAllTransformsByEmailController
}
  from "./controllers/transform_controller.ts"
  import { RunController } from "./controllers/run_controller.ts";

export const routes = new Map<RouteKey, Controller>([
  [
    {
      method: 'POST',
      pattern: new URLPattern({ pathname: "/process" })
    },
    ProcessController
  ],
  [
    {
      method: 'POST',
      pattern: new URLPattern({ pathname: "/saveTransform" })
    },
    SaveTransformController
  ],
  [
    {
      method: 'POST',
      pattern: new URLPattern({ pathname: "/retrieveTransform" })
    },
    RetrieveTransformController
  ],
  [
    {
      method: 'POST',
      pattern: new URLPattern({ pathname: "/retrieveAllTransformsByEmail" })
    },
    RetrieveAllTransformsByEmailController
  ],
  [
    {
      method: 'DELETE',
      pattern: new URLPattern({ pathname: "/deleteTransform" })
    },
    DeleteTransformController
  ],
  [
    {
      method: 'DELETE',
      pattern: new URLPattern({ pathname: "/deleteAllTransformsByEmail" })
    },
    DeleteAllTransformsByEmailController
  ],
  [
    {
      method: 'POST',
      pattern: new URLPattern({ pathname: "/run" })
    },
    RunController
  ]
])