import axios from "axios";
import pLimit from "p-limit";

const apiUrl = "http://localhost:8000/api/process";

function generateInputs(count) {
    return Array.from({ length: count }, (_, i) => ({
        input: {
            name: {
                first: `NameFirst${i}`,
                last: `NameLast${i}`,
            },
            exes: [
                `Ex${i}A `,
                `Ex${i}B`,
                `Ex${i}C`,
            ],
            lastEx: i,
        },
        transforms: [
            {
                "lastEx": "derived.lastEx + 5",
            },
            {
                "modified": "derived.lastEx",
            },
            {
                "original": "input.lastEx",
            },
            {
                "nameObject": [
                    {
                        "name":
                            "input.name.first | trim + ' ' + input.name.last",
                    },
                    {
                        "name": "derived.nameObject.name | capitalize",
                    },
                    {
                        "age": "25",
                    },
                    {
                        "ex1": "'=>' + input.exes[0] | rtrim",
                    },
                ],
            },
            {
                "isMinor": "derived.nameObject.age < 18",
            },
            {
                "nameLength": "derived.nameObject.name | length",
            },
            {
                "nameUpper": "derived.nameObject.name | upper",
            },
        ],
        "settings": { "merge_method": "overwrite" },
    }));
}

async function makeAPICall(apiUrl, payload) {
    try {
        const response = await axios.post(apiUrl, payload);
        return response.data;
    } catch (error) {
        console.error(
            `Error calling API for input ${
                JSON.stringify(payload.input)
            }: ${error.message}`,
        );
        return null;
    }
}


async function profileLimitedConcurrency(apiUrl, inputCount, concurrencyLimit) {
    const inputs = generateInputs(inputCount);
    const limit = pLimit(concurrencyLimit);

    const startTime = performance.now();

    const promises = inputs.map((input) =>
        limit(() => makeAPICall(apiUrl, input))
    );
    const results = await Promise.all(promises);

    const endTime = performance.now();
    console.log(
        `Processed ${inputCount} API calls with concurrency limit ${concurrencyLimit} in ${
            (endTime - startTime).toFixed(2)
        } ms`,
    );
}

// Run the profiler
const inputCount = 10000;
const concurrencyLimit = 10000;
profileLimitedConcurrency(apiUrl, inputCount, concurrencyLimit);
