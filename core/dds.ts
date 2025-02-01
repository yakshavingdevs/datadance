import { DataObject, DdsDataObject, SerialOperations } from "./types.ts";

export function jsonToDds(transformsJsonArray: SerialOperations, indent: number = 0): string {
    let transformsDds = '';
    const spaces = '  '; // 2 spaces for indentation

    transformsJsonArray.forEach(item => {
        if (typeof item === 'object' && !Array.isArray(item)) {
            for (const key in item) {
                if (typeof item[key] === 'object' && !Array.isArray(item[key])) {
                    transformsDds += `${spaces.repeat(indent)}${key}:\n`;
                    transformsDds += jsonToDds([item[key]], indent + 1);
                } else if (Array.isArray(item[key])) {
                    transformsDds += `${spaces.repeat(indent)}${key}:\n`;
                    item[key].forEach(subItem => {
                        if (typeof subItem === 'object') {
                            transformsDds += `${spaces.repeat(indent + 1)}  ${jsonToDds([subItem], indent + 2).trim()}\n`;
                        } else {
                            transformsDds += `${spaces.repeat(indent + 1)}  ${subItem}\n`;
                        }
                    });
                } else {
                    transformsDds += `${spaces.repeat(indent)}${key}: ${item[key]}\n`;
                }
            }
        }
    });

    return transformsDds;
};

export const ddsToJson = (transformsDds: string): SerialOperations => {
    try {
        const lines = transformsDds.split("\n");
        const result: SerialOperations = [];
        const stack = [{ indent: -1, object: result }];
        let errorMessage = "";

        lines.forEach((line, index) => {
            const trimmedLine = line.trim();
            if (trimmedLine) {
                const indent = line.search(/\S/);
                if (indent % 2 !== 0) {
                    errorMessage = `Indentation error at line ${index + 1
                        }: "${line}". Indentation must be in multiples of 2 spaces.`;
                }
                if (line.includes(`"`)) {
                    errorMessage = `Error at line ${index + 1
                        }: ${line}. " character is not allowed, use 'literal' to represent string literal.`;
                }
                if (!line.includes(`:`)) {
                    errorMessage = `Error at line ${index + 1
                        }: ${line}. Please provide a valid expression`;
                }
                const trimmedLineSplit = trimmedLine.split(":");
                const key = trimmedLineSplit[0].trim();
                const value = trimmedLineSplit
                    .slice(1, trimmedLineSplit.length)
                    .map((s) => s.trim())
                    .join(":");

                const regexForField = /[^\w\s_$]/;
                if (regexForField.test(key)) {
                    errorMessage = `Error at line ${index + 1
                        }: ${line}. Field names can only use special characters _ and $`;
                }

                const newEntry = value ? { [key]: value } : { [key]: [] };

                while (stack.length && stack[stack.length - 1].indent >= indent) {
                    stack.pop();
                }

                if (stack.length === 0 || stack[stack.length - 1].indent >= indent) {
                    errorMessage = `Indentation error at line ${index + 1}: "${line}"`;
                }

                const currentParent = stack[stack.length - 1].object;
                currentParent.push(newEntry);

                if (!value) {
                    stack.push({ indent, object: newEntry[key] as SerialOperations });
                }
            }
        });

        if (errorMessage) {
            return [{ error: errorMessage }];
        } else {
            return result;
        }
    } catch (error) {
        console.error(`There was an error while parsing transforms : ${error}.`);
        return [{ error: error }];
    }
};

export const isDdsDataObject = (data: DataObject): data is DdsDataObject => {
    return data.settings.transforms_syntax === "dds";
}