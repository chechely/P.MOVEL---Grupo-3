// https://observablehq.com/@tophtucker/multitouch-circles@164
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Multitouch Circles
Shows a circle for each pointer, including the mouse.`
)});
  main.variable(observer("chart")).define("chart", ["d3","width","height","drag"], function(d3,width,height,drag)
{
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("stroke-width", 2)
      .call(drag)

  return svg.node();
}
);
  main.variable(observer("drag")).define("drag", ["d3","pointers","radius"], function(d3,pointers,radius)
{
  function render(event, d) {
    let sel = d3.select(this).selectAll("circle")
      .data(pointers(event, this).filter(d => d.type !== "mouseup"), d => d.id);
    sel.exit().remove();
    sel.enter().append("circle")
      .attr("r", radius)
      .attr("pointer-events", "none")
      .attr("fill", () => `hsl(${Math.random() * 360}, 50%, 50%)`)
    .merge(sel)
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);
  }

  return d3.drag()
      .on("start drag end", render);
}
);
  main.variable(observer("radius")).define("radius", function(){return(
60
)});
  main.variable(observer("height")).define("height", function(){return(
600
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---

## Tweaking d3.pointers
Passes touch ID and event type with \`{x, y, id, type}\` instead of an array of \`[x, y]\`.`
)});
  main.variable(observer("sourceEvent")).define("sourceEvent", function(){return(
function sourceEvent(event) {
  let sourceEvent;
  while (sourceEvent = event.sourceEvent) event = sourceEvent;
  return event;
}
)});
  main.variable(observer("pointer")).define("pointer", ["sourceEvent"], function(sourceEvent){return(
function pointer(event, node) {
  event = sourceEvent(event);
  const id = event.identifier || "pointer";
  const type = event.type;
  if (node === undefined) node = event.currentTarget;
  if (node) {
    var svg = node.ownerSVGElement || node;
    if (svg.createSVGPoint) {
      var point = svg.createSVGPoint();
      point.x = event.clientX, point.y = event.clientY;
      point = point.matrixTransform(node.getScreenCTM().inverse());
      return {
        x: point.x, 
        y: point.y, 
        id, 
        type
      };
    }
    if (node.getBoundingClientRect) {
      var rect = node.getBoundingClientRect();
      return {
        x: event.clientX - rect.left - node.clientLeft, 
        y: event.clientY - rect.top - node.clientTop,
        id,
        type
      };
    }
  }
  return {x: event.pageX, y: event.pageY, id, type};
}
)});
  main.variable(observer("pointers")).define("pointers", ["sourceEvent","pointer"], function(sourceEvent,pointer){return(
function pointers(events, node) {
  if (events.target) { // i.e., instanceof Event, not TouchList or iterable
    events = sourceEvent(events);
    if (node === undefined) node = events.currentTarget;
    events = events.touches || [events];
  }
  return Array.from(events, event => pointer(event, node));
}
)});
  return main;
}
