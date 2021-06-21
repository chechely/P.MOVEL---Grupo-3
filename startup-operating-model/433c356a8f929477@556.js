// https://observablehq.com/@observablehq/hiring-timeline@556
import define1 from "./722d039607ab28a0@1707.js";
import define2 from "./1e895142b9a15cc0@1035.js";
import define3 from "./9783eabee68343f0@276.js";
import define4 from "./9867926ed8e2770b@691.js";
import define5 from "./3c37c9bffc213235@182.js";
import define6 from "./9e136645a778d57e@55.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["payroll.csv",new URL("./files/13da6ce89366d90aebc1d43a2a6ab58043b48d3093c74aa8a746e5fa179c4b5d414f35a7f16bf1a9a25b772ef2e3dc52c545e85f3109372920416ad9d356b3ca",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md","toc","instructions"], function(md,toc,instructions){return(
md`# Hiring Timeline

${toc(instructions)}

Quick: you have one employee paid $50k, will hire another at $70k next month, and one more at $100k in December. How much will you spend all year? What if you delay hiring? What if you add one more person? This template helps you quickly explore different scenarios, and see how it all adds up.

---`
)});
  main.variable(observer()).define(["md","d3","payroll","domain"], function(md,d3,payroll,domain){return(
md`<div style="font-size: 1.8em;">
  Total payroll: ${d3.format("$,r")(Math.abs(payroll.cum.slice(-1)[0].value))}
  <div style="font-size: 1rem;">${domain.map(d3.utcFormat("%B %d, %Y")).join(" – ")}</div>
</div>`
)});
  main.variable(observer("viewof hiring")).define("viewof hiring", ["MultidragAxis","data"], function(MultidragAxis,data){return(
MultidragAxis(data)
)});
  main.variable(observer("hiring")).define("hiring", ["Generators", "viewof hiring"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","width","dateFormat","d3","payroll","asOf"], function(Plot,width,dateFormat,d3,payroll,asOf){return(
Plot.plot({
  width,
  height: width / 3,
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
  main.variable(observer("summary")).define("summary", ["md","hiring","asOf","d3","payroll"], function(md,hiring,asOf,d3,payroll){return(
md`The company has hired ${hiring.filter(({date}) => date < asOf && date > d3.utcYear.floor(asOf)).length} people so far this year and plans to hire ${hiring.filter(({date}) => date > asOf && date < d3.utcYear.ceil(asOf)).length} more, increasing overall payroll expenses ${(100 * (payroll.diff.slice(-1)[0].value - payroll.diff[0].value) / payroll.diff[0].value).toFixed(0)}% year over year to $${d3.format(".3s")(Math.abs(payroll.diff.slice(-1)[0].value))} per month. The company expects to spend a total of $${d3.format(".3s")(Math.abs(payroll.cum.slice(-1)[0].value))} on payroll this year.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Configure the salary, name, and appearance of a new hire added to the timeline:`
)});
  main.variable(observer("name")).define("name", function(){return(
"New hire"
)});
  main.variable(observer("emoji")).define("emoji", function(){return(
"👤"
)});
  main.variable(observer("salary")).define("salary", function(){return(
70000
)});
  main.variable(observer("instructions")).define("instructions", ["md"], function(md){return(
md`---
## How to show your current payroll

### 1. Fork this template
Your changes will not be saved until you fork.

### 2. Upload a CSV of salaries

Replace \`hiring.csv\` using the <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke-width="2" class="mr1 moon-gray"><path d="M7.19855 2.52175L7.88131 1.79111L7.19855 2.52175ZM12.6 11.7764L13.2581 11.0234L12.6 11.7764ZM5.34191 6.76078L11.9419 12.5293L13.2581 11.0234L6.65809 5.2549L5.34191 6.76078ZM10.8958 13.6864L3.35462 6.63385L1.98852 8.09459L9.52965 15.1472L10.8958 13.6864ZM6.51578 3.25238L13.8172 10.0755L15.1828 8.61419L7.88131 1.79111L6.51578 3.25238ZM3.08395 3.55474C3.91017 2.45311 5.50967 2.31219 6.51578 3.25238L7.88131 1.79111C6.0058 0.0384695 3.02413 0.301162 1.48395 2.35474L3.08395 3.55474ZM3.35462 6.63385C2.49183 5.82695 2.37516 4.49978 3.08395 3.55474L1.48395 2.35474C0.162683 4.11642 0.380169 6.59044 1.98852 8.09459L3.35462 6.63385ZM11.993 13.6551C11.6977 13.9647 11.2082 13.9786 10.8958 13.6864L9.52965 15.1472C10.6432 16.1886 12.3878 16.1388 13.4402 15.0356L11.993 13.6551ZM11.9419 12.5293C12.2764 12.8216 12.2996 13.3337 11.993 13.6551L13.4402 15.0356C14.5328 13.8903 14.4499 12.0651 13.2581 11.0234L11.9419 12.5293Z" fill="currentColor"></path></svg> File Attachment icon.`
)});
  main.variable(observer("data")).define("data", ["FileAttachment","autoTypeExcel"], async function(FileAttachment,autoTypeExcel){return(
(await FileAttachment("payroll.csv").csv()).map(autoTypeExcel)
)});
  main.variable(observer()).define(["Table","data"], function(Table,data){return(
Table(data, {columnRules: {
  "id": d => Boolean(d) || "each row needs a unique id",
  "date": d => d instanceof Date || "must be a date like YYYY-MM-DD",
  "salary": d => typeof d === "number" || d === null || "must be a number without dollar signs or commas",
}})
)});
  main.variable(observer()).define(["md"], function(md){return(
md`The template expects four columns (though it’s fine if more are present): a unique _id_, a _date_ representing the employee’s start date (formatted like YYYY-MM-DD or M/D/YY), an annual _salary_ (formatted as a number without commas or dollar sign), and an optional _name_.

Download the modified data by selecting “Download CSV” from the cell menu for the cell below. To save any changes, you must re-upload this CSV as the file attachment above.`
)});
  main.variable(observer()).define(["hiring"], function(hiring){return(
hiring
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Configure the time period shown on the timeline:`
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
This combines two components: a MultidragAxis to drag the heads around, which returns an array of start dates and salaries; and a CashFlow to turn that into a series of monthly expenses.
`
)});
  main.variable(observer("payroll")).define("payroll", ["CashFlow","d3","hiring","amortizedSalary","domain"], function(CashFlow,d3,hiring,amortizedSalary,domain){return(
new CashFlow(
  month => -d3.sum(hiring.map(amortizedSalary(month))),
  {label: "Payroll", domain}
)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`We amortize the salary by the fraction of the month that has passed on the start date.`
)});
  main.variable(observer("amortizedSalary")).define("amortizedSalary", ["monthFrac"], function(monthFrac){return(
month => ({date, salary}) => (1 - monthFrac(month, date)) * (salary / 12)
)});
  main.variable(observer("monthFrac")).define("monthFrac", ["d3"], function(d3){return(
(month, date) => date < month ? 0 
  : date > d3.utcMonth.offset(month, 1) ? 1
  : d3.utcDay.count(month, date)
    / d3.utcDay.count(month, d3.utcMonth.offset(month, 1))
)});
  main.variable(observer()).define(["md"], function(md){return(
md`MultidragAxis lets you specify a constructor for new items; it’s called with an object that has an index and the value clicked on the axis, which here represents the start date; this also sets their salary to the default \`salary\` specified under Data.`
)});
  main.variable(observer("newItem")).define("newItem", ["salary","name","emoji"], function(salary,name,emoji){return(
d => ({salary, name, emoji, ...d})
)});
  main.variable(observer("enterItem")).define("enterItem", function(){return(
g => g.append("g")
  .attr("text-anchor", "middle")
  .call(g => g.append("text")
    .attr("font-size", "2em")
    .attr("y", "-0.1em")
    .text(d => d.emoji))
  .call(g => g.append("text")
    .attr("font-size", "10px")
    .attr("font-family", "sans-serif")
    .attr("y", "-3.75em")
    .text(d => d.name))
)});
  main.variable(observer()).define(["md"], function(md){return(
md`We import from several notebooks and a few NPM libraries.`
)});
  const child1 = runtime.module(define1).derive(["domain","newItem","enterItem"], main);
  main.import("MultidragAxis", child1);
  const child2 = runtime.module(define2);
  main.import("CashFlow", child2);
  main.import("autoTypeExcel", child2);
  main.import("dateFormat", child2);
  const child3 = runtime.module(define3);
  main.import("Table", child3);
  const child4 = runtime.module(define4);
  main.import("CSVText", child4);
  const child5 = runtime.module(define5);
  main.import("set", child5);
  const child6 = runtime.module(define6);
  main.import("toc", child6);
  return main;
}
