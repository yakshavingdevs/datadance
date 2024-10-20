export function encodeTransforms(obj: any[], indent: number = 0): string {
    let encodedTransforms = '';
    const spaces = '  '; // 2 spaces for indentation

    obj.forEach(item => {
        if (typeof item === 'object' && !Array.isArray(item)) {
            for (const key in item) {
                if (typeof item[key] === 'object' && !Array.isArray(item[key])) {
                    encodedTransforms += `${spaces.repeat(indent)}${key}:\n`;
                    encodedTransforms += encodeTransforms([item[key]], indent + 1);
                } else if (Array.isArray(item[key])) {
                    encodedTransforms += `${spaces.repeat(indent)}${key}:\n`;
                    item[key].forEach(subItem => {
                        if (typeof subItem === 'object') {
                            encodedTransforms += `${spaces.repeat(indent + 1)}  ${encodeTransforms([subItem], indent + 2).trim()}\n`;
                        } else {
                            encodedTransforms += `${spaces.repeat(indent + 1)}  ${subItem}\n`;
                        }
                    });
                } else {
                    encodedTransforms += `${spaces.repeat(indent)}${key}: ${item[key]}\n`;
                }
            }
        }
    });

    return encodedTransforms;
};
