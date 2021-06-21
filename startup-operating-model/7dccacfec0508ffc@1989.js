// https://observablehq.com/@observablehq/targets-vs-actuals@1989
import define1 from "./9783eabee68343f0@276.js";
import define2 from "./1e895142b9a15cc0@1035.js";
import define3 from "./9e136645a778d57e@55.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["cbo-targets-actuals.csv",new URL("./files/ad060008eb1e4b7f84bc1b2c785ff9fcaffe48ba4ff8b7d1b6cb068719d3fe5bf5a626038328c9a8568b34b1f685b10307a07c6685474ce021e15f762bda4c0e",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md","toc","instructions"], function(md,toc,instructions){return(
md`# Targets vs. Actuals
${toc(instructions)}

This chart compares actual data to targets by filling up hollow bars. For instance, it could compare monthly sales to business targets, or, in this case, actual interest rates to annual Congressional Budget Office estimates.

See [**this tutorial**](https://observablehq.com/@observablehq/business-planning-targets-vs-actuals-tutorial?collection=@observablehq/observable-templates) for a quick overview of how to use this template.`
)});
  main.variable(observer()).define(["TargetsVsActuals","data"], function(TargetsVsActuals,data){return(
TargetsVsActuals(data, {
  title: "Interest rates vs. CBO 2012 estimates (%)",
  x: "date",
  target: "target",
  actual: "actual"
})
)});
  main.variable(observer("instructions")).define("instructions", ["md"], function(md){return(
md`---
## How to show your data
### 1. Fork this template
Your changes will not be saved until you fork.

### 2. Upload a CSV
Replace the one CSV using the <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke-width="2" class="mr1 moon-gray"><path d="M7.19855 2.52175L7.88131 1.79111L7.19855 2.52175ZM12.6 11.7764L13.2581 11.0234L12.6 11.7764ZM5.34191 6.76078L11.9419 12.5293L13.2581 11.0234L6.65809 5.2549L5.34191 6.76078ZM10.8958 13.6864L3.35462 6.63385L1.98852 8.09459L9.52965 15.1472L10.8958 13.6864ZM6.51578 3.25238L13.8172 10.0755L15.1828 8.61419L7.88131 1.79111L6.51578 3.25238ZM3.08395 3.55474C3.91017 2.45311 5.50967 2.31219 6.51578 3.25238L7.88131 1.79111C6.0058 0.0384695 3.02413 0.301162 1.48395 2.35474L3.08395 3.55474ZM3.35462 6.63385C2.49183 5.82695 2.37516 4.49978 3.08395 3.55474L1.48395 2.35474C0.162683 4.11642 0.380169 6.59044 1.98852 8.09459L3.35462 6.63385ZM11.993 13.6551C11.6977 13.9647 11.2082 13.9786 10.8958 13.6864L9.52965 15.1472C10.6432 16.1886 12.3878 16.1388 13.4402 15.0356L11.993 13.6551ZM11.9419 12.5293C12.2764 12.8216 12.2996 13.3337 11.993 13.6551L13.4402 15.0356C14.5328 13.8903 14.4499 12.0651 13.2581 11.0234L11.9419 12.5293Z" fill="currentColor"></path></svg> File Attachment icon.`
)});
  main.variable(observer("data")).define("data", ["FileAttachment","autoTypeExcel"], async function(FileAttachment,autoTypeExcel){return(
(await FileAttachment("cbo-targets-actuals.csv").csv()).map(autoTypeExcel)
)});
  main.variable(observer()).define(["Table","data"], function(Table,data){return(
Table(data, {columnRules: {
  "date": d => d instanceof Date || "must be a date like YYYY-MM-DD or M/D/YY",
  "actual": d => typeof d === "number" || d === null || "must be a number without dollar signs or commas",
  "target": d => typeof d === "number" || d === null || "must be a number without dollar signs or commas"
}})
)});
  main.variable(observer()).define(["md"], function(md){return(
md`The chart expects three columns (though it’s fine if more are present): a _date_, formatted like YYYY-MM-DD or M/D/YY, and _actual_ and _target_ numbers, formatted without commas or other symbols (like $ or %). Cells should be left empty if null; if an actual value is “0”, it will be interpreted as 0% of the target rather than an absence of data.

If the columns containing your actual and target numbers are named something else, you can pass accessors for them (although it won’t be reflected in the above table), as either string keys or functions:

~~~js
TargetsVsActuals(data, {
  target: "estRevenue",
  actual: "revenueQ1",
  title: "Q1 revenue vs projections"
})
~~~
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---`
)});
  main.variable(observer()).define(["md"], function(md){return(
md `## Appendix
The chart is a [Plot](/@observablehq/plot); the title is passed as the y-axis label. It assumes the x scale is dates, but you could change x’s tickFormat to something else.`
)});
  main.variable(observer("TargetsVsActuals")).define("TargetsVsActuals", ["Plot","dateFormat","HollowBarY"], function(Plot,dateFormat,HollowBarY){return(
(data, {title, x, target, actual, ...options} = {}) => 
  Plot.plot({
    height: 250,
    x: {tickFormat: dateFormat, label: null},
    y: {label: title},
    color: {
      range: ["#b44646", "steelblue"],
      domain: [-1e-6, 1e-6],
      clamp: true
    },
    ...options,
    marks: [
      HollowBarY(data, {x, target, actual}), // includes blue bar, outline, and label
      Plot.ruleY([0]) // baseline
    ]
  })
)});
  main.variable(observer()).define(["md"], function(md){return(
md`It uses a custom mark, \`HollowBarY\`, which returns an array of marks for the blue “actuals” bar, the hollow “target” bar, and the percentage text labels:`
)});
  main.variable(observer("HollowBarY")).define("HollowBarY", ["maybeAccessor","Plot","pct"], function(maybeAccessor,Plot,pct){return(
(data, {x, target, actual} = {}) => {
  
  // Calculate percentage
  data = data.map(d => ({...d, percent: maybeAccessor(actual)(d) / maybeAccessor(target)(d)}))
  
  return [
    // Blue bar for actuals
    Plot.barY(data, {x, y: actual, fill: actual, insetLeft: 0.5, insetRight: 0.5}),

    // Hollow bar for targets
    Plot.barY(data, {x, y: target, stroke: "black", fill: "none"}),

    // Percentage text, below and white if miss
    Plot.text(data.filter(d => d.percent < 1), {
      x, 
      y: actual, 
      text: d => pct(d.percent),
      fill: "white",
      dy: 12,
    }),

    // Percentage text, above and black if hit
    Plot.text(data.filter(d => d.percent > 1), {
      x, 
      y: actual, 
      text: d => pct(d.percent),
      dy: -4
    })
  ]
}
)});
  main.variable(observer("maybeAccessor")).define("maybeAccessor", function(){return(
value => typeof value === "string" ? d => d[value] : value
)});
  main.variable(observer("pct")).define("pct", ["d3"], function(d3){return(
d3.format(".0%")
)});
  const child1 = runtime.module(define1);
  main.import("Table", child1);
  const child2 = runtime.module(define2);
  main.import("dateFormat", child2);
  main.import("autoTypeExcel", child2);
  const child3 = runtime.module(define3);
  main.import("toc", child3);
  return main;
}
