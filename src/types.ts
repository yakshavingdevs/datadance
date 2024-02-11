export interface RouteKey {
  method: string;
  pattern: URLPattern;
}

export type Controller = (
  urlData: URLPatternResult,
  originalRequest: Request,
) => Promise<Response>;
