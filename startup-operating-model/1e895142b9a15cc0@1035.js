// https://observablehq.com/@observablehq/cash-flow@1035
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Cash Flow

A CashFlow is a UTC month-aligned array of \`{date, value}\` pairs with some helper functions. It can be initialized with a constant value, a function of time, or an array of \`{date, value}\` objects. If initialized with an array, the dates need not match the start of the month; items will be rolled up into monthly sums. Not all helpers are incorporated into the CashFlow class.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`

~~~js
new CashFlow(data, {label, domain})
~~~
- _data_: a constant number, a function of \`month\`, or an array of \`{date, value}\`
- _label_: name of flow to be used in plot and such
- _domain_: array of [start date, end date) (optional if \`data\` is an array)

~~~js
CashFlow.diff
Array.from(CashFlow)
~~~
- Get an array of the differences (default iterable)

~~~js
CashFlow.cum
~~~
- Get an array of the cumulative

~~~js
CashFlow.plot(options)
CashFlow.plotDiff(options)
~~~
- Plot the differences
- _options_ (optional): Passed through to Plot

~~~js
CashFlow.plotCum(options)
~~~
- Plot the cumulative
- _options_ (optional): Passed through to Plot

~~~js
CashFlow.sum(flows)
~~~
- Sum an array of Flows and return a Flow

---
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Demo

A simple operating model with two positive flows (venture capital money and monthly recurring revenue) and two negative flows (rent and payroll). 

The domain must be set explicitly (unless the initial data is an array):`
)});
  main.variable(observer("domain")).define("domain", function(){return(
[
  new Date(Date.UTC(2021, 0, 1)), 
  new Date(Date.UTC(2022, 0, 1))
]
)});
  main.variable(observer()).define(["md"], function(md){return(
md`#### Money In`
)});
  main.variable(observer("vc")).define("vc", ["CashFlow","domain"], function(CashFlow,domain){return(
new CashFlow([
  {date: new Date(Date.UTC(2021, 2, 1)), value: 2e6},
  {date: new Date(Date.UTC(2021, 11, 15)), value: 2.5e6},
], {label: "VC", domain})
)});
  main.variable(observer()).define(["vc"], function(vc){return(
vc.plotDiff()
)});
  main.variable(observer("mrr")).define("mrr", ["CashFlow","domain"], function(CashFlow,domain){return(
new CashFlow((_, i) => 3000 * Math.exp(i / 20), {label: "MRR", domain})
)});
  main.variable(observer()).define(["mrr"], function(mrr){return(
mrr.plotDiff()
)});
  main.variable(observer()).define(["CashFlow","mrr","vc"], function(CashFlow,mrr,vc){return(
CashFlow.sum([mrr, vc]).plot()
)});
  main.variable(observer()).define(["md"], function(md){return(
md`#### Money Out`
)});
  main.variable(observer("rent")).define("rent", ["CashFlow","domain"], function(CashFlow,domain){return(
new CashFlow(-15000, {label: "Rent", domain})
)});
  main.variable(observer()).define(["rent"], function(rent){return(
rent.plotDiff()
)});
  main.variable(observer("payroll")).define("payroll", ["CashFlow","domain"], function(CashFlow,domain){return(
new CashFlow((_, i) => -9000 * (i * 2 + 10), {label: "Payroll", domain})
)});
  main.variable(observer()).define(["payroll"], function(payroll){return(
payroll.plotDiff()
)});
  main.variable(observer()).define(["md"], function(md){return(
md`#### Total`
)});
  main.variable(observer("total")).define("total", ["CashFlow","vc","mrr","rent","payroll"], function(CashFlow,vc,mrr,rent,payroll){return(
CashFlow.sum([vc, mrr, rent, payroll])
)});
  main.variable(observer()).define(["total"], function(total){return(
total.plotCum()
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---

## Appendix`
)});
  main.variable(observer("CashFlow")).define("CashFlow", ["d3","Plot","dateFormat","xnpv"], function(d3,Plot,dateFormat,xnpv){return(
class CashFlow {
  constructor(data, {label = "", domain = [], truncate = false /*todo*/, fromCum = false /*todo*/} = {}) {
    this.label = label;
    const getDate = d => d.date;
    const getValue = d => d.value;
    
    if(!domain.length && Array.isArray(data)) domain = [
      d3.min(data, getDate), 
      d3.utcMonth.offset(d3.max(data, getDate), 1)
    ]
    this.domain = domain.map(d3.utcMonth.floor);
    this.index = d3.utcMonth.range(...this.domain);
    
    // convert data to plain array
    if (typeof data === "function") {
      // f(date) -> monthly flow
      this.diff = this.index
        .map((date, i) => ({date, value: data(date, i)}));
    } else if (Array.isArray(data)) {
      // array of {date, value}
      const rollup = d3.rollup(
        data, 
        arr => d3.sum(arr, getValue),
        ({date}) => d3.utcMonth.floor(date)
      );
      this.diff = this.index
        .map(date => ({date, value: rollup.get(date) || 0}));
    } else if (typeof data === "number") {
      // constant monthly flow
      this.diff = this.index.map(date => ({date, value: data}));
    } else {
      throw new Error(`Invalid flow data. Please provide one of the following: 
- a number (constant monthly flow)
- an array of {date, value} objects
- a function that takes a month and returns a {date, value} object`);
    }
    
    // constructor expects series of differences;
    // this rolls them up into cumulative sum
    this.cum = Array.from(d3.cumsum(this.diff, getValue),
      (value, i) => ({date: this.index[i], value}));

  }
  
  static sum(flows) {
    const data = Array.from(
      d3.rollup(
      flows.flatMap(d => [...d]),
      values => ({
        date: values[0].date, 
        value: d3.sum(values, d => d.value)
      }),
      d => +d.date
    ).values());
    return new CashFlow(data, {
      label: flows.map(flow => flow.label).join(" + ")
    });
  }
  
  static plotFlow(data, label, options = {}) {
    return Plot.plot({
      height: 200,
      x: {tickFormat: dateFormat, label: null},
      y: {tickFormat: d3.format("$"), label, transform: d => d / 1000},
      color: {
        type: "diverging",
        scheme: "RdBu",
        domain: [-1e-6, 1e-6]
      },
      marks: [
        Plot.barY(data, {x: "date", y: "value", fill: "value"}),
        Plot.ruleY([0])
      ],
      ...options
    })
  }
  
  plot(options) {
    return this.plotDiff(options)
  }
  
  plotCum(options) {
    return CashFlow.plotFlow(this.cum, `Cumulative ${this.label || "flow"} (k)`, options)
  }
  
  plotDiff(options) {
    return CashFlow.plotFlow(this.diff, `${this.label || "Flow"} / mo. (k)`, options)
  }
  
  npv(rate) {
    return xnpv(rate, this.diff.map(d => d.value), this.diff.map(d => d.date))
  }
  
  [Symbol.iterator]() {
    return this.diff[Symbol.iterator]()
  };
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Helpers`
)});
  main.variable(observer("dateFormat")).define("dateFormat", ["d3"], function(d3){return(
d => d.getUTCMonth() ? d3.utcFormat("%b")(d) : d3.utcFormat("%Y")(d)
)});
  main.variable(observer("longMonth")).define("longMonth", ["d3"], function(d3){return(
d3.utcFormat("%B %Y")
)});
  main.variable(observer("parseExcelDate")).define("parseExcelDate", ["d3"], function(d3){return(
d3.utcParse("%m/%d/%y")
)});
  main.variable(observer("xnpv")).define("xnpv", ["d3"], function(d3){return(
(rate, values, dates) =>
  d3.sum(
    values.map(
      (value, i) =>
        value / (1 + rate) ** (d3.timeDay.count(dates[0], dates[i]) / 365)
    )
  )
)});
  main.variable(observer("autoTypeExcel")).define("autoTypeExcel", ["d3","parseExcelDate"], function(d3,parseExcelDate){return(
row => {
  row = d3.autoType(row);
  for (const key in row) {
    if (typeof row[key] === "string") {
      const date = parseExcelDate(row[key].trim());
      if (date) row[key] = date;
    }
  }
  return row;
}
)});
  main.variable(observer("rollupByMonth")).define("rollupByMonth", ["d3"], function(d3){return(
arr => [...d3.rollup(
  arr.flat(Infinity),
  arr => ({date: d3.utcMonth.floor(arr[0].date), value: d3.sum(arr, d => d.value)}),
  d => d3.utcMonth.floor(d.date)
).values()].sort((a, b) => d3.ascending(a.date, b.date))
)});
  main.variable(observer("zip")).define("zip", ["d3"], function(d3){return(
obj => [...d3.rollup(
  Object.entries(obj)
    .flatMap(([name, arr]) => arr.map(({date, value}) => ({date, [name]: value}))), 
  arr => (Object.assign({}, ...arr)),
  d => d.date
).values()]
)});
  main.variable(observer("cumsum")).define("cumsum", ["d3"], function(d3){return(
arr => Array.from(
  d3.cumsum(arr, d => d.value),
  (value, i) => ({date: arr[i].date, value})
)
)});
  main.variable(observer("zero")).define("zero", function(){return(
arr => arr.find(({value}) => value <= 0)?.date
)});
  return main;
}
