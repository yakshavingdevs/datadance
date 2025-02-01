// Copyright (c) 2024-Present The Yak Shaving Devs, MIT License

export type Expression = string | SerialOperations;
export type Operation = Record<string, Expression>;
export type SerialOperations = Operation[];
export type InputObject = Record<string, any>;

export type MergeMethod = "overwrite" | "preserve" | "transforms_only";
export interface SettingsObjectBase {
  merge_method: MergeMethod;
}

export interface DataObjectBase {
  input: InputObject;
  derived?: Record<string, any>;
  pathTrace?: Array<string>;
  isSubTransformation?: boolean;
}

export interface JsonDataObject extends DataObjectBase {
  transforms: SerialOperations;
  settings: SettingsObjectBase & { transforms_syntax?: "json" };
}

export interface DdsDataObject extends DataObjectBase {
  transforms: string;
  settings: SettingsObjectBase & { transforms_syntax: "dds" };
}

export type DataObject = JsonDataObject | DdsDataObject;

export interface ErrorObject {
  [key: string]: string;
}

export type DateTimeFormatType = 'ISO' | 'RFC2822' | 'SQL' | 'HTTP' | 'Millis';

export type PlainObject = Record<string, any>;