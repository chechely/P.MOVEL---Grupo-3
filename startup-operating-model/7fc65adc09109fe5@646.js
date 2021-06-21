// https://observablehq.com/@observablehq/draggable-cash-flow-curve@646
import define1 from "./1e895142b9a15cc0@1035.js";
import define2 from "./ab3e70b29c480e6d@79.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Draggable Cash Flow Curve
Convert a smooth curve into a series of monthly cash flows, starting with the following amount (per month).`
)});
  main.variable(observer("start")).define("start", function(){return(
6000
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Click below to place a new control point, or to drag an existing one. Hitting Delete will delete the selected control point.`
)});
  main.variable(observer("chart")).define("chart", ["mutable points","d3","width","height","style","xAxis","yAxis","mutable path","line"], function($0,d3,width,height,style,xAxis,yAxis,$1,line)
{
  let selected = $0.value[0];

  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr("tabindex", 1)
      .attr("pointer-events", "all")
      .call(d3.drag()
        .subject(dragsubject)
        .on("start", dragstarted)
        .on("drag", dragged));

  svg.append("style").text(style);

  svg.append("g").call(xAxis);
  svg.append("g").call(yAxis);

  svg.append("rect")
      .attr("fill", "none")
      .attr("width", width)
      .attr("height", height);

  svg.append("path")
      .attr("class", "path")
      .datum($0.value)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 1.5)
      .call(update);

  d3.select(window)
      .on("keydown", keydown);

  function calculatePoints(path) {
    if(!path) return;
    const length = path.getTotalLength()
    $1.value = [...d3.range(0, length, length / 10), length]
      .map(len => {
        const {x, y} = path.getPointAtLength(len);
        return {x, y};
      })
  }

  function update() {
    svg.select("path.path").attr("d", line)
      .call(sel => calculatePoints(sel.node()))

    const circle = svg.selectAll("g.circle")
        .data($0.value, d => d)

    circle.enter().append("g")
        .attr("class", "circle")
        .call(g => g.append("circle")
            .attr("r", 30)
            .attr("fill", "none"))
        .call(g => g.append("circle")
            .attr("r", 0)
            .attr("stroke", "black")
            .attr("stroke-width", 1.5)
          .transition()
            .duration(750)
            .ease(d3.easeElastic)
            .attr("r", 5))
      .merge(circle)
        .attr("transform", d => `translate(${d})`)
      .select("circle:last-child")
        .attr("fill", d => d === selected ? "lightblue" : "black");

    circle.exit().remove();
  }

  function dragsubject(event) {
    let subject = event.sourceEvent.target.__data__;
    if (!subject) {
      $0.value.push(subject = [event.x, event.y]);
      $0.value = $0.value;
      update();
    }
    return subject;
  }

  function dragstarted({subject}) {
    selected = subject;
    update();
  }

  function dragged(event) {
    event.subject[0] = Math.max(-14, Math.min(width + 14, event.x));
    event.subject[1] = Math.max(0, Math.min(height, event.y));
    $0.value = $0.value;
    update();
  }

  function keydown(event) {
    if (!selected) return;
    if (document.activeElement !== svg.node()) return;
    switch (event.key) {
      case "Backspace":
      case "Delete": {
        event.preventDefault();
        const i = $0.value.indexOf(selected);
        $0.value.splice(i, 1);
        $0.value = $0.value;
        selected = $0.value.length ? $0.value[i > 0 ? i - 1 : 0] : null;
        update();
        break;
      }
    }
  }

  return svg.node();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`This translate into the follow cash flow:`
)});
  main.variable(observer()).define(["flow"], function(flow){return(
flow.plot()
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Which accumulates to:`
)});
  main.variable(observer()).define(["flow"], function(flow){return(
flow.plotCum()
)});
  main.variable(observer()).define(["md"], function(md){return(
md`You can download a CSV of this data using the cell menu (**⋮**) to the left of the cell below, or copy the data to the clipboard:`
)});
  main.variable(observer()).define(["flow"], function(flow){return(
flow.diff
)});
  main.variable(observer()).define(["Inputs","d3","flow"], function(Inputs,d3,flow){return(
Inputs.textarea({value: d3.tsvFormat(flow.diff), rows: 6})
)});
  main.variable(observer()).define(["htl","copy","d3","flow"], function(htl,copy,d3,flow){return(
htl.html`<button onclick=${() => copy(d3.tsvFormat(flow.diff))}>Copy data to clipboard`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---

## Appendix`
)});
  main.define("initial path", function(){return(
[]
)});
  main.variable(observer("mutable path")).define("mutable path", ["Mutable", "initial path"], (M, _) => new M(_));
  main.variable(observer("path")).define("path", ["mutable path"], _ => _.generator);
  main.variable(observer("x")).define("x", ["d3","timeDomain","margin","width"], function(d3,timeDomain,margin,width){return(
d3.scaleTime()
  .domain(timeDomain)
  .range([margin.left, width - margin.right])
)});
  main.variable(observer("y")).define("y", ["d3","start","height","margin"], function(d3,start,height,margin){return(
d3.scaleLinear()
  .domain([0, 5 * start])
  .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("scaleTimeToValue")).define("scaleTimeToValue", ["d3","path","x","y"], function(d3,path,x,y){return(
d3.scaleLinear()
  .domain(path.map(({x: x0}) => new Date(+x.invert(x0))))
  .range(path.map(({y: y0}) => y.invert(y0)))
)});
  main.variable(observer("flow")).define("flow", ["CashFlow","scaleTimeToValue","timeDomain"], function(CashFlow,scaleTimeToValue,timeDomain){return(
new CashFlow(scaleTimeToValue, {domain: timeDomain})
)});
  main.variable(observer("timeDomain")).define("timeDomain", ["d3"], function(d3){return(
[d3.timeYear.offset(new Date(), -1), new Date()].map(date => d3.timeMonth.floor(date))
)});
  main.variable(observer("style")).define("style", function(){return(
`
svg[tabindex] {
  display: block;
  border: solid 2px transparent;
  box-sizing: border-box;
}
svg[tabindex]:focus {
  outline: none;
  border: solid 2px lightblue;
}
`
)});
  main.define("initial points", ["d3","x","timeDomain","y","start"], function(d3,x,timeDomain,y,start){return(
d3.range(0, 4).map(i => [
  x(d3.interpolate(...timeDomain)(i / 3)), 
  y(start * Math.exp(0.4 * i))
])
)});
  main.variable(observer("mutable points")).define("mutable points", ["Mutable", "initial points"], (M, _) => new M(_));
  main.variable(observer("points")).define("points", ["mutable points"], _ => _.generator);
  main.variable(observer("line")).define("line", ["d3"], function(d3){return(
d3.line().curve(d3.curveMonotoneX)
)});
  main.variable(observer("height")).define("height", function(){return(
300
)});
  main.variable(observer("width")).define("width", function(){return(
640
)});
  main.variable(observer("margin")).define("margin", function(){return(
{left: 40, top: 20, right: 20, bottom: 30}
)});
  main.variable(observer("xAxis")).define("xAxis", ["height","margin","d3","x","width","dateFormat"], function(height,margin,d3,x,width,dateFormat){return(
g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0).tickFormat(dateFormat))
)});
  main.variable(observer("yAxis")).define("yAxis", ["margin","d3","y"], function(margin,d3,y){return(
g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(4).tickFormat(d => d3.format("$")(d / 1000)))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
        .attr("x", -margin.left)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("Flow / mo."))
)});
  const child1 = runtime.module(define1);
  main.import("CashFlow", child1);
  main.import("dateFormat", child1);
  const child2 = runtime.module(define2);
  main.import("copy", child2);
  return main;
}
