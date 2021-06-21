// https://observablehq.com/@observablehq/startup-operating-model@1111
import define1 from "./433c356a8f929477@556.js";
import define2 from "./7fc65adc09109fe5@646.js";
import define3 from "./7dccacfec0508ffc@1989.js";
import define4 from "./9783eabee68343f0@276.js";
import define5 from "./1e895142b9a15cc0@1035.js";
import define6 from "./9e136645a778d57e@55.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["mrrActual@1.csv",new URL("./files/21f6ce7ef6bd13d55dba9178755f64f081826d6afa3854ef6bba3848497933513748f5d6881f24cfb9751319e5f7dc9b20a29c6f2bb3bd605409b742fc9ee49d",import.meta.url)],["payroll.csv",new URL("./files/13da6ce89366d90aebc1d43a2a6ab58043b48d3093c74aa8a746e5fa179c4b5d414f35a7f16bf1a9a25b772ef2e3dc52c545e85f3109372920416ad9d356b3ca",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md","toc","instructions"], function(md,toc,instructions){return(
md`# Startup Operating Model

${toc(instructions)}

A simple operating model for a small company where the only significant expense is payroll, the key metric is growth of recurring revenue, and most cash is from venture capital. It’s optimized for quickly exploring different hypotheses about hiring and growth. This demonstrates how to combine pieces of several notebooks, including [Hiring Timeline](https://observablehq.com/@observablehq/hiring-timeline) and [Targets vs. Actuals](https://observablehq.com/@observablehq/targets-vs-actuals).`
)});
  main.variable(observer()).define(["md","hiringSummary"], function(md,hiringSummary){return(
md`### Payroll

${hiringSummary}

Click and drag to move the heads representing hiring dates. Drag down to below the axis to remove people, or click below the axis to add people.`
)});
  main.variable(observer()).define(["viewof hiring"], function($0){return(
$0
)});
  main.variable(observer()).define(["Plot","dateFormat","d3","payroll","asOf"], function(Plot,dateFormat,d3,payroll,asOf){return(
Plot.plot({
  height: 200,
  x: {tickFormat: dateFormat, label: null},
  y: {tickFormat: d3.format("$"), label: "Payroll / mo. (k)", transform: d => d / 1000, reverse: true},
  color: {
    range: ["#b44646", "steelblue"],
    domain: [-1e-6, 1e-6],
    clamp: true
  },
  marks: [
    Plot.barY(payroll.diff.filter(({date}) => date <= asOf), {x: "date", y: "value", fill: "value"}),
    Plot.barY(payroll.diff.filter(({date}) => date > asOf), {x: "date", y: "value", stroke: "black"}),
    Plot.ruleY([0])
  ],
})
)});
  main.variable(observer()).define(["d3","mrr","md"], function(d3,mrr,md)
{
  const fDate = d3.utcFormat("%B %Y");
  const fDollar = d3.format("$.3s");
  const fPct = d3.format(".0%");
  
  const d0 = mrr[0].date
  const d1 = d3.greatest(mrr, d => d.actual && d.date).date
  const v0 = mrr[0].actual
  const v1 = d3.greatest(mrr, d => d.actual && d.date).actual
  
  const p = (v1 / v0) - 1
  
  return md`### Revenue

So far, actual monthly recurring revenue has gone ${p > 0 ? "up" : "down"} ${fPct(Math.abs(p))} from ${fDollar(v0)} in ${fDate(d0)} to ${fDollar(v1)} in ${fDate(d1)}.

Click and drag the dots to change the shape of projected revenue. See how it compares to the actual figures from the attached CSV in the chart below.`
}
);
  main.variable(observer()).define(["mrrSpline"], function(mrrSpline){return(
mrrSpline
)});
  main.variable(observer()).define(["TargetsVsActuals","mrr"], function(TargetsVsActuals,mrr){return(
TargetsVsActuals(mrr, {x: "date", target: "target", actual: "actual", y: { tickFormat: "s", label: "Monthly recurring revenue vs. projected ($)" }})
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Runway
Payroll and revenue, combined with cash raised from venture capital, can give you a very rough sense of a “runway” until the company is out of money.`
)});
  main.variable(observer("viewof cash")).define("viewof cash", ["Inputs"], function(Inputs){return(
Inputs.range([0, 1e3], {label: "Cash ($k)", step: 1, value: 160})
)});
  main.variable(observer("cash")).define("cash", ["Generators", "viewof cash"], (G, _) => G.input(_));
  main.variable(observer("viewof cashDate")).define("viewof cashDate", ["Inputs"], function(Inputs){return(
Inputs.text({label: "On", type: "date", value: "2021-01-01"})
)});
  main.variable(observer("cashDate")).define("cashDate", ["Generators", "viewof cashDate"], (G, _) => G.input(_));
  main.variable(observer()).define(["zero","totalActualCum","md","longMonth","totalTargetCum"], function(zero,totalActualCum,md,longMonth,totalTargetCum){return(
zero(totalActualCum) ? md`The company ran out of money in ${longMonth(zero(totalActualCum))}.` : zero(totalTargetCum) ? md`Under these projections, the company will run out of money in ${longMonth(zero(totalTargetCum))}.` : md`Under these projections, the company will not run out of money within the time range.`
)});
  main.variable(observer()).define(["TargetsVsActuals","totalTargetActuals"], function(TargetsVsActuals,totalTargetActuals){return(
TargetsVsActuals(totalTargetActuals, {x: "date", target: "target", actual: "actual", y: { tickFormat: "s", label: "Cash ($)" }})
)});
  main.variable(observer("instructions")).define("instructions", ["md"], function(md){return(
md`---
## How to show your current payroll and revenues

### 1. Fork this template
Your changes will not be saved until you fork.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### 2. Upload a CSV of salaries

Use the <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke-width="2" class="mr1 moon-gray"><path d="M7.19855 2.52175L7.88131 1.79111L7.19855 2.52175ZM12.6 11.7764L13.2581 11.0234L12.6 11.7764ZM5.34191 6.76078L11.9419 12.5293L13.2581 11.0234L6.65809 5.2549L5.34191 6.76078ZM10.8958 13.6864L3.35462 6.63385L1.98852 8.09459L9.52965 15.1472L10.8958 13.6864ZM6.51578 3.25238L13.8172 10.0755L15.1828 8.61419L7.88131 1.79111L6.51578 3.25238ZM3.08395 3.55474C3.91017 2.45311 5.50967 2.31219 6.51578 3.25238L7.88131 1.79111C6.0058 0.0384695 3.02413 0.301162 1.48395 2.35474L3.08395 3.55474ZM3.35462 6.63385C2.49183 5.82695 2.37516 4.49978 3.08395 3.55474L1.48395 2.35474C0.162683 4.11642 0.380169 6.59044 1.98852 8.09459L3.35462 6.63385ZM11.993 13.6551C11.6977 13.9647 11.2082 13.9786 10.8958 13.6864L9.52965 15.1472C10.6432 16.1886 12.3878 16.1388 13.4402 15.0356L11.993 13.6551ZM11.9419 12.5293C12.2764 12.8216 12.2996 13.3337 11.993 13.6551L13.4402 15.0356C14.5328 13.8903 14.4499 12.0651 13.2581 11.0234L11.9419 12.5293Z" fill="currentColor"></path></svg> File Attachment icon to replace \`hiring.csv\`.`
)});
  main.variable(observer("hiringData")).define("hiringData", ["FileAttachment","autoTypeExcel"], async function(FileAttachment,autoTypeExcel){return(
(await FileAttachment("payroll.csv").csv()).map(autoTypeExcel)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`The template expects four columns (though it’s fine if more are present): a unique _id_, a _date_ representing the employee’s start date (formatted like YYYY-MM-DD or M/D/YY), an annual _salary_ (formatted as a number without commas or dollar sign), and an optional _name_.`
)});
  main.variable(observer()).define(["Table","hiringData"], function(Table,hiringData){return(
Table(hiringData, {columnRules: {
  "id": d => Boolean(d) || "each row needs a unique id",
  "date": d => d instanceof Date || "must be a date like YYYY-MM-DD or M/D/YY",
  "salary": d => typeof d === "number" || d === null || "must be a number without dollar signs or commas",
}})
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### 3. Upload a CSV of revenues

Use the <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke-width="2" class="mr1 moon-gray"><path d="M7.19855 2.52175L7.88131 1.79111L7.19855 2.52175ZM12.6 11.7764L13.2581 11.0234L12.6 11.7764ZM5.34191 6.76078L11.9419 12.5293L13.2581 11.0234L6.65809 5.2549L5.34191 6.76078ZM10.8958 13.6864L3.35462 6.63385L1.98852 8.09459L9.52965 15.1472L10.8958 13.6864ZM6.51578 3.25238L13.8172 10.0755L15.1828 8.61419L7.88131 1.79111L6.51578 3.25238ZM3.08395 3.55474C3.91017 2.45311 5.50967 2.31219 6.51578 3.25238L7.88131 1.79111C6.0058 0.0384695 3.02413 0.301162 1.48395 2.35474L3.08395 3.55474ZM3.35462 6.63385C2.49183 5.82695 2.37516 4.49978 3.08395 3.55474L1.48395 2.35474C0.162683 4.11642 0.380169 6.59044 1.98852 8.09459L3.35462 6.63385ZM11.993 13.6551C11.6977 13.9647 11.2082 13.9786 10.8958 13.6864L9.52965 15.1472C10.6432 16.1886 12.3878 16.1388 13.4402 15.0356L11.993 13.6551ZM11.9419 12.5293C12.2764 12.8216 12.2996 13.3337 11.993 13.6551L13.4402 15.0356C14.5328 13.8903 14.4499 12.0651 13.2581 11.0234L11.9419 12.5293Z" fill="currentColor"></path></svg> File Attachment icon to replace \`mrrActual@1.csv\`.`
)});
  main.variable(observer("mrrActual")).define("mrrActual", ["FileAttachment","autoTypeExcel"], async function(FileAttachment,autoTypeExcel){return(
(await FileAttachment("mrrActual@1.csv").csv()).map(autoTypeExcel)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`The chart expects two columns (though it’s fine if more are present): a _date_, formatted like YYYY-MM-DD or M/D/YY, and a _value_ (representing revenue), formatted without commas or other symbols (like $ or %), representing revenue for that month.`
)});
  main.variable(observer()).define(["Table","mrrActual"], function(Table,mrrActual){return(
Table(mrrActual, {columnRules: {
  "date": d => d instanceof Date || "must be a date like YYYY-MM-DD or M/D/YY",
  "value": d => typeof d === "number" || d === null || "must be a number without dollar signs or commas"
}})
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### 4. Configure the date range`
)});
  main.variable(observer("domain")).define("domain", function(){return(
[new Date(Date.UTC(2021, 0, 1)), new Date(Date.UTC(2022, 0, 1))]
)});
  main.variable(observer("asOf")).define("asOf", function(){return(
new Date(Date.UTC(2021, 4, 25))
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---
## Appendix
This section shows the code that pieces the data and charts together. You shouldn’t have to change it to use the template.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Payroll is based on the [Hiring Timeline](https://next.observablehq.com/d/433c356a8f929477) component.`
)});
  const child1 = runtime.module(define1).derive(["domain","asOf",{name: "hiringData", alias: "data"}], main);
  main.import("viewof hiring", child1);
  main.import("hiring", child1);
  main.import("payroll", child1);
  main.import("summary", "hiringSummary", child1);
  main.variable(observer()).define(["md"], function(md){return(
md`Revenue is based on the [Targets vs. Actuals](https://next.observablehq.com/d/7dccacfec0508ffc) and [Draggable Cash Flow Curve
](https://next.observablehq.com/d/7fc65adc09109fe5) components.`
)});
  main.variable(observer("mrr")).define("mrr", ["mrrTarget","mrrActual"], function(mrrTarget,mrrActual){return(
mrrTarget.diff.map(({date, value}, i) => ({date, target: value, actual: mrrActual[i]?.value}))
)});
  main.variable(observer("mrrStart")).define("mrrStart", ["mrrActual"], function(mrrActual){return(
mrrActual[0].value
)});
  const child2 = runtime.module(define2).derive([{name: "domain", alias: "timeDomain"},{name: "mrrStart", alias: "start"}], main);
  main.import("chart", "mrrSpline", child2);
  main.import("flow", "mrrTarget", child2);
  main.variable(observer()).define(["md"], function(md){return(
md`Runway combines the Payroll and Revenue with one VC cash infusion.`
)});
  main.variable(observer("vc")).define("vc", ["cashDate","cash"], function(cashDate,cash){return(
[{date: new Date(cashDate), value: cash * 1000}]
)});
  main.variable(observer("totalActual")).define("totalActual", ["rollupByMonth","vc","payroll","mrrActual","asOf"], function(rollupByMonth,vc,payroll,mrrActual,asOf){return(
rollupByMonth([vc, payroll.diff, mrrActual])
  .filter(({date}) => date <= asOf)
)});
  main.variable(observer("totalActualCum")).define("totalActualCum", ["cumsum","totalActual"], function(cumsum,totalActual){return(
cumsum(totalActual)
)});
  main.variable(observer("totalTarget")).define("totalTarget", ["rollupByMonth","vc","payroll","mrrTarget"], function(rollupByMonth,vc,payroll,mrrTarget){return(
rollupByMonth([vc, payroll.diff, mrrTarget.diff])
)});
  main.variable(observer("totalTargetCum")).define("totalTargetCum", ["cumsum","totalTarget"], function(cumsum,totalTarget){return(
cumsum(totalTarget)
)});
  main.variable(observer("totalTargetActuals")).define("totalTargetActuals", ["zip","totalTargetCum","totalActualCum"], function(zip,totalTargetCum,totalActualCum){return(
zip({target: totalTargetCum, actual: totalActualCum})
)});
  const child3 = runtime.module(define3);
  main.import("TargetsVsActuals", child3);
  const child4 = runtime.module(define4);
  main.import("Table", child4);
  const child5 = runtime.module(define5);
  main.import("longMonth", child5);
  main.import("dateFormat", child5);
  main.import("autoTypeExcel", child5);
  main.import("rollupByMonth", child5);
  main.import("zip", child5);
  main.import("cumsum", child5);
  main.import("zero", child5);
  const child6 = runtime.module(define6);
  main.import("toc", child6);
  return main;
}
