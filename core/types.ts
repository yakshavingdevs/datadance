/********************************************************/

/*
  Datadance : A simple JSON transformation package
  MIT License

  Copyright (c) 2024-Present Sri Pravan Paturi, Chiranjeevi Karthik Kuruganti, Vodela Saiswapnil Gupta

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.

  Please refer the license here : https://github.com/yakshavingdevs/datadance/blob/main/LICENSE
*/

/********************************************************/


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

/********************************************************/
