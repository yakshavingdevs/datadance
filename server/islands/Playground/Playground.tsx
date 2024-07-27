import { useEffect, useRef, useState } from "preact/hooks";
import { basicSetup } from "codemirror";
import { EditorView } from "codemirror/view";
import { EditorState } from "codemirror/state";
import { transform } from "../../../core/transform.ts";
import { DataObject } from "../../../core/types.ts";
import { SerialOperations } from "../../../core/types.ts";

const Playground = () => {
  const [input, setInput] = useState<string>("{}");
  const [transforms, setTransforms] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [mergeMethod, setMergeMethod] = useState<string>("overwrite");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const transformsRef = useRef(null);

  useEffect(() => {
    if (transformsRef.current) {
      const dataObject: DataObject = {
        input: JSON.parse(input),
        transforms: parseTransforms(transforms),
        settings: {
          merge_method: mergeMethod,
        },
      };
      const state = EditorState.create({
        doc: transforms,
        extensions: [
          basicSetup,
          EditorView.updateListener.of(async (update: any) => {
            if (update.docChanged) {
              const newTransforms = update.state.doc.toString();
              setTransforms(newTransforms);
              dataObject.transforms = parseTransforms(newTransforms);
            }
            setOutput(JSON.stringify(await transform(dataObject), null, 2));
          }),
        ],
      });

      const view = new EditorView({
        state,
        parent: transformsRef.current,
      });

      return () => view.destroy();
    }
  }, [input, mergeMethod]);

  const parseTransforms = (transforms: string): SerialOperations => {
    const lines = transforms.split("\n");
    const result: SerialOperations = [];
    const stack = [{ indent: -1, object: result }];
    let errorMessage = "";

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      if (trimmedLine) {
        const indent = line.search(/\S/);
        if (indent % 2 !== 0) {
          errorMessage = `Indentation error at line ${
            index + 1
          }: "${line}". Indentation must be in multiples of 2 spaces.`;
        }
        if (line.includes(`"`)) {
          errorMessage = `Error at line ${
            index + 1
          }: ${line}. " character is not allowed, use 'literal' to represent string literal.`;
        }
        const trimmedLineSplit = trimmedLine.split(":");
        const key = trimmedLineSplit[0].trim();
        const value = trimmedLineSplit
          .slice(1, trimmedLineSplit.length)
          .map((s) => s.trim())
          .join(":");

        const regexForField = /[^\w\s_$]/;
        if (regexForField.test(key)) {
          errorMessage = `Error at line ${
            index + 1
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
      setErrorMessage(errorMessage);
      return [{ error: errorMessage }];
    } else {
      setErrorMessage("");
      return result;
    }
  };

  function handleInputChange(event: any) {
    setInput(event.target.value);
  }

  function handleMergeMethodChange(event: any) {
    setMergeMethod(event.target.value);
  }

  return (
    <div class="container">
      <div class="container mt-4" style={{ height: "80vh" }}>
        <div
          class="row gx-4 gy-4 align-items-md-stretch"
          style={{ height: "80%" }}
        >
          <div class="col-md-6 d-flex flex-column">
            <div class="mb-3 flex-grow-1">
              <div class="form-floating">
                <textarea
                  class="form-control"
                  value={input}
                  onKeyUp={handleInputChange}
                  id="inputJson"
                  style={{
                    overflow: "scroll",
                    resize: "none",
                    maxHeight: "50vh",
                    height: "40vh",
                  }}
                />
                <label for="inputJson">Input JSON</label>
              </div>
            </div>
            <div>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </div>
            <div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  id="overwrite"
                  value="overwrite"
                  name="merge_method"
                  onChange={handleMergeMethodChange}
                  checked={mergeMethod === "overwrite"}
                ></input>
                <label class="form-check-label" for="overwrite">
                  Overwrite
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  id="transforms_only"
                  value="transforms_only"
                  name="merge_method"
                  onChange={handleMergeMethodChange}
                  checked={mergeMethod === "transforms_only"}
                ></input>
                <label class="form-check-label" for="transforms_only">
                  Transforms only
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  id="preserve"
                  value="preserve"
                  name="merge_method"
                  onChange={handleMergeMethodChange}
                  checked={mergeMethod === "preserve"}
                ></input>
                <label class="form-check-label" for="preserve">
                  Preserve
                </label>
              </div>
            </div>
            <br></br>
            <div class="flex-grow-1">
              <div class="card h-100">
                <div class="card-header">Transforms</div>
                <div class="card-body" ref={transformsRef} />
              </div>
            </div>
          </div>
          <div class="col-md-6 d-flex flex-column">
            <div class="card h-100">
              <div class="card-header">Output</div>
              <div class="card-body overflow-auto">
                <pre class="output">{output}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playground;
