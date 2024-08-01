export const highlight = (input: string) => {
    let json;
    try {
        json = typeof input !== 'string' ? JSON.stringify(input, null, 2) : input;
    } catch (error) {
        return `<span class="error">Invalid JSON : ${error}</span>`;
    }

    json = json.replace(/&/g, "&amp;")
               .replace(/</g, "&lt;")
               .replace(/>/g, "&gt;");

    const regex = /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g;

    const applyHighlight = (match : any) => {
        let className = 'value';

        if (/^"/.test(match)) {
            className = /:$/.test(match) ? 'key' : 'string';
        } else if (/true|false/.test(match)) {
            className = 'boolean';
        } else if (/null/.test(match)) {
            className = 'null';
        } else if (/^-?\d+(\.\d*)?(?:[eE][+\-]?\d+)?/.test(match)) {
            className = 'number';
        }

        return `<span class="${className}">${match}</span>`;
    };

    return json.replace(regex, applyHighlight);
};