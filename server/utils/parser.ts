import { SerialOperations } from "../../core/types.ts";


export const parseTransforms = (transforms: string): SerialOperations => {
    try {
        const lines = transforms.split("\n");
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
                    stack.push({ indent, object: newEntry[key] });
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