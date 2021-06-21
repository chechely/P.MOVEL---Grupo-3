// https://observablehq.com/@tophtucker/structured-text-inputs@691
import define1 from "./a2e58f97fd5e8d7c@620.js";
import define2 from "./c6c7a741ac87d656@52.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["sample@1.csv",new URL("./files/0148e214e2ac26bc306dd55ee1d9bf8f4d4d4e589f0c926ad28b82f25f754c6a151e37dd1bdedd73fbfceb3fcfdd7d6dbd44ca8af48f80348fa8067c9f849cfd",import.meta.url)],["sample.json",new URL("./files/b80bbe8be319ea426883b0d4fbcd9ea27f8d96ab762b472e998d23914b8a65d6f7ef13d81cfdb7b0f50d33d819e7a8781e85e3a8f8342c3a58eec39404be91ca",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Structured Text Inputs
<div style="color:gray;font-family:var(--sans-serif);margin-top:-0.4em;">CSV, TSV, JSON, List</div>

These textarea inputs for structured data let a reader edit a CSV, TSV, JSON, or plain line-separated list. Their value is set as a plain JavaScript object, and the value they return is also a JavaScript object. But in-between they’re editable in a textarea, so you can e.g. paste a table straight from Google Sheets or Excel.

You could achieve this with regular text inputs, but this saves you the round-trip of parsing and stringifying in different cells, making it easier to insert an editor into the notebook without disturbing the flow of data, so long as the object can survive the round-trip. The only format that will be parsed as a date is YYYY-MM-DD.

They are patterned after the new official [Observable Inputs](https://next.observablehq.com/@observablehq/inputs), and are designed to work with the \`bind\` function, which lets you [synchronize inputs](https://next.observablehq.com/@observablehq/synchronized-inputs). This was my original use case: synchronizing a graphical input, for intuitive control, with a textual input, for exact control. I’ve also written a [simple example of how to implement bind](https://observablehq.com/@tophtucker/custom-input-example) in your own custom inputs.

Values don’t save if you refresh the page. If you’d like a user to be able to upload their own CSV etc. and save it, you should prompt them to replace a [File Attachment](https://next.observablehq.com/@observablehq/file-attachments).

_☞ There is now an official [Textarea input](https://observablehq.com/@observablehq/input-textarea), which doesn’t do the parsing/stringifying but may be all you need!_`
)});
  main.variable(observer()).define(["toc"], function(toc){return(
toc("h3")
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---
### CSVText
Takes an array of objects (e.g. a parsed CSV) as its \`value\` and returns the same kind of thing — but with an opportunity for user input.`
)});
  main.variable(observer("viewof csv")).define("viewof csv", ["CSVText","sampleCSV"], function(CSVText,sampleCSV){return(
CSVText({value: sampleCSV})
)});
  main.variable(observer("csv")).define("csv", ["Generators", "viewof csv"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`Note that CSV is just the format in which you edit the textarea; the returned value is identical to that of the TSV input below:`
)});
  main.variable(observer()).define(["csv"], function(csv){return(
csv
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---

### TSVText
Same thing, but with delimiter set to \`\\t\`. Especially useful because that’s what you get when you copy-paste from Excel, Google Sheets, and HTML tables. The downside is that it’s hard to enter a Tab character in a textarea; in Safari you can press Ctrl-Opt-Tab, but elsewhere you may have to copy and paste a tab character.
`
)});
  main.variable(observer("viewof tsv")).define("viewof tsv", ["TSVText","sampleCSV"], function(TSVText,sampleCSV){return(
TSVText({value: sampleCSV})
)});
  main.variable(observer("tsv")).define("tsv", ["Generators", "viewof tsv"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`Note that TSV is just the format in which you edit the textarea; the returned value is identical to that of the CSV input above:`
)});
  main.variable(observer()).define(["tsv"], function(tsv){return(
tsv
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---
### DSVText

The more generic form of CSVText and TSVText, for any kind of delimiter-separated values. Based on [d3-dsv](https://github.com/d3/d3-dsv).
- \`row = d3.autoType\` — pass your own row parser
- \`delimiter = ","\` — pass \`\\t\` for TSV
- \`headers = true\` — pass \`false\` to use \`d3.parseRows\` and \`d3.formatRows\` instead.
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---

### JSONText
Note that this will currently silently fail to evaluate if the JSON fails to parse.
`
)});
  main.variable(observer("viewof json")).define("viewof json", ["JSONText","sampleJSON"], function(JSONText,sampleJSON){return(
JSONText({value: sampleJSON})
)});
  main.variable(observer("json")).define("json", ["Generators", "viewof json"], (G, _) => G.input(_));
  main.variable(observer()).define(["json"], function(json){return(
json
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---

### ListText
One-dimensional line-separated lists without headers.`
)});
  main.variable(observer("viewof list")).define("viewof list", ["ListText"], function(ListText){return(
ListText({value: [-10000, 2750, 4250, 3250, 2750]})
)});
  main.variable(observer("list")).define("list", ["Generators", "viewof list"], (G, _) => G.input(_));
  main.variable(observer()).define(["list"], function(list){return(
list
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---
### Synchronizing with \`bind\`
Try editing (and submitting) either the JSON or plain list representation, and the other will update.`
)});
  main.variable(observer("viewof a")).define("viewof a", ["JSONText"], function(JSONText){return(
JSONText({value: ["First", "Second", "Third"]})
)});
  main.variable(observer("a")).define("a", ["Generators", "viewof a"], (G, _) => G.input(_));
  main.variable(observer("viewof b")).define("viewof b", ["bind","ListText","viewof a"], function(bind,ListText,$0){return(
bind(ListText(), $0)
)});
  main.variable(observer("b")).define("b", ["Generators", "viewof b"], (G, _) => G.input(_));
  main.variable(observer()).define(["a"], function(a){return(
a
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---

## Implementation`
)});
  main.variable(observer("ParsedText")).define("ParsedText", ["html","style","set"], function(html,style,set){return(
({value = "", parser = d => d, formatter = d => d} = {}) => {
  const textarea = html`<textarea style=${style} oninput=${oninput}>`;
  const node = html`<form onsubmit=${onsubmit}>
    ${textarea}
    <button type=submit>Submit</button>
  </form>`;

  function oninput(e) {
    e.stopPropagation();
  }
  function onsubmit(e) {
    set(node, textarea.value);
    e.preventDefault(); 
  }

  // Update the display whenever the value changes
  Object.defineProperty(node, "value", {
    get() {
      return parser(value);
    },
    set(v) {
      if (typeof v === "object") v = formatter(v);
      textarea.value = value = v;
    }
  });

  // Set the initial value
  node.value = value;

  return node;
}
)});
  main.variable(observer("DSVText")).define("DSVText", ["d3","ParsedText"], function(d3,ParsedText){return(
({value, row = d3.autoType, delimiter = ",", headers = true} = {}) => {
  const dsv = d3.dsvFormat(delimiter);
  const parser = headers ? d => dsv.parse(d, row) : d => dsv.parseRows(d, row);
  const formatter = headers ? dsv.format : dsv.formatRows;
  return ParsedText({value, parser, formatter});
}
)});
  main.variable(observer("CSVText")).define("CSVText", ["DSVText"], function(DSVText){return(
options => DSVText({...options, delimiter: ","})
)});
  main.variable(observer("TSVText")).define("TSVText", ["DSVText"], function(DSVText){return(
options => DSVText({...options, delimiter: "\t"})
)});
  main.variable(observer("ListText")).define("ListText", ["ParsedText","d3","autoFormat"], function(ParsedText,d3,autoFormat){return(
options => ParsedText({
  ...options,
  parser: d => d3.autoType(d.split("\n")), 
  formatter: d => d.map(autoFormat).join("\n")
})
)});
  main.variable(observer("JSONText")).define("JSONText", ["ParsedText"], function(ParsedText){return(
options => ParsedText({
  ...options,
  parser: JSON.parse, 
  formatter: d => JSON.stringify(d, null, 2)
})
)});
  main.variable(observer("style")).define("style", function(){return(
{
  display: "block",
  marginBottom: "3px",
  width: "240px",
  height: "120px", 
  fontFamily: "var(--sans-serif)",
  whiteSpace: "nowrap"
}
)});
  main.variable(observer("set")).define("set", ["Event"], function(Event){return(
function set(input, value) {
  input.value = value;
  input.dispatchEvent(new Event("input"));
}
)});
  main.variable(observer("autoFormat")).define("autoFormat", ["dateFormat"], function(dateFormat){return(
d => d instanceof Date ? dateFormat(d) : String(d)
)});
  main.variable(observer("dateFormat")).define("dateFormat", ["d3"], function(d3){return(
d3.utcFormat("%Y-%m-%d")
)});
  main.variable(observer("sampleCSV")).define("sampleCSV", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("sample@1.csv").csv({typed: true})
)});
  main.variable(observer("sampleJSON")).define("sampleJSON", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("sample.json").json()
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  const child1 = runtime.module(define1);
  main.import("bind", child1);
  main.import("html", child1);
  const child2 = runtime.module(define2);
  main.import("toc", child2);
  return main;
}
