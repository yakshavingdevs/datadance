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

export const isRegExpExpression = (expression: string) => {
    try {
        new RegExp(expression);
        return true;
    }
    catch (_error) {
        return false;
    }
}

/********************************************************/

export const getType = (value: any) => {
    if (typeof value === "string") {
        return "String";
    } else if (typeof value === "number") {
        return "Number";
    } else if (typeof value === "boolean") {
        return "Boolean";
    } else if (typeof value === "object" && Array.isArray(value)) {
        return "Array";
    } else if (typeof value === "object" && value !== null) {
        return "Object";
    } else if (typeof value === "undefined") {
        return "undefined";
    } else if (value === null) {
        return "null";
    }

}

/********************************************************/
