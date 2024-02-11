import { RouteKey, Controller } from "./types.ts"
import ProcessController from "./controllers/process_controller.ts"

export const routes = new Map<RouteKey, Controller>([
  [
    {
      method: 'POST',
      pattern: new URLPattern({ pathname: "/process" })
    },
    ProcessController
  ]
])