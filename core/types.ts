// Copyright (c) 2024-Present The Yak Shaving Devs, MIT License

export type Expression = string | SerialOperations;
export type Operation = Record<string, Expression>;
export type SerialOperations = Operation[];
export type InputObject = Record<string, any>;
export type SettingsObject = Record<string, any>;

export interface DataObject {
  input: InputObject;
  transforms: SerialOperations;
  settings: SettingsObject;
  derived?: Record<string, any>;
  pathTrace?: Array<string>;
  isSubTransformation?: boolean;
}

export interface ErrorObject {
  [key: string]: string;
}
