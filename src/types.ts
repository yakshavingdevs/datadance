export interface RouteKey {
  method: string;
  pattern: URLPattern
}

export type Controller = (
  urlData: URLPatternResult,
  originalRequest: Request,
) => Promise<Response>

export interface DataObject {
  input: Record<string, any>;
  transforms: Record<string, string>[];
  settings: Record<string, any>;
}

export interface ErrorObject {
  [key: string]: string;
}
