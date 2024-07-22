export type Expression = string | SerialOperations;
export type Operation = Record<string, Expression>;
export type SerialOperations = Operation[];
export type InputObject = Record<string, any>;
export type SettingsObject = Record<string, any>;
export type Controller = (
  urlData: URLPatternResult,
  originalRequest: Request,
) => Promise<Response>;

export interface DataObject {
  input: InputObject;
  transforms: SerialOperations;
  settings: SettingsObject;
  derived?: Record<string, any>;
  pathTrace?: Array<string>;
  isSubTransformation?: boolean;
}

export interface RouteKey {
  method: string;
  pattern: URLPattern;
}

export interface ErrorObject {
  [key: string]: string;
}
