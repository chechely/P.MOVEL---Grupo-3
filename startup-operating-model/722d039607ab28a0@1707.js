// https://observablehq.com/@observablehq/multidrag-axis@1707
import define1 from "./d8f51d77a0352725@164.js";
import define2 from "./3c37c9bffc213235@182.js";
import define3 from "./9867926ed8e2770b@691.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Multidrag Axis

This component lets you rearrange groups of items at once on a scale — in this case, heads along a timeline. Hover to see a preview of the “cone” indicating which items will be selected, then click and drag to move them left and right. The items expand and condense as the cone grows and shrinks as you drag up and down, allowing you to change the density and position of the arrangement in one motion. You can also use multitouch to move multiple clusters at once.

You can remove items by dragging them below the axis, or add items by clicking below the axis.`
)});
  main.variable(observer("viewof chart")).define("viewof chart", ["MultidragAxis","data"], function(MultidragAxis,data){return(
MultidragAxis(data)
)});
  main.variable(observer("chart")).define("chart", ["Generators", "viewof chart"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`This is a [view](https://next.observablehq.com/@observablehq/introduction-to-views), so you can reference its value in code:`
)});
  main.variable(observer()).define(["chart"], function(chart){return(
chart
)});
  main.variable(observer()).define(["md"], function(md){return(
md`It also works as a [synchronized input](https://observablehq.com/@observablehq/synchronized-inputs), so you can bind it to a [textarea input](https://observablehq.com/@tophtucker/structured-text-inputs) for precise editing, and updates flow between them:`
)});
  main.variable(observer()).define(["Inputs","CSVText","viewof chart"], function(Inputs,CSVText,$0){return(
Inputs.bind(CSVText(), $0)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---
## Data
This component expects an array of objects that each have a _date_ and a unique _id_. If the object has a _name_ property, the default \`enterItem\` function below will render it as a label over the head. For example, this samples ten evenly-spaced items from the _domain_.`
)});
  main.variable(observer("data")).define("data", ["reset","d3","scale"], function(reset,d3,scale){return(
reset, d3.range(10)
  .map((_, i, arr) => ({
    date: d3.interpolate(...scale.domain())((i + 0.5) / arr.length),
    id: i
  }))
)});
  main.variable(observer()).define(["md"], function(md){return(
md`MultidragAxis mutates the _date_ property of the objects (as specified by the _setter_ below); other properties will be unchanged.`
)});
  main.variable(observer("viewof reset")).define("viewof reset", ["html"], function(html){return(
html`<button>Reset`
)});
  main.variable(observer("reset")).define("reset", ["Generators", "viewof reset"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`---
## Appendix`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Import this function to another notebook:

~~~js
import {MultidragAxis} from "@data-workflows/multidrag-axis"
~~~

During import you can override any of the following cells to customize appearance and behavior. 

The variable _slope_ sets the slope of the cone. A higher slope lets you drag more items at once; a lower slope gives you more precision at a given height.`
)});
  main.variable(observer("slope")).define("slope", function(){return(
2
)});
  main.variable(observer()).define(["md"], function(md){return(
md`The variable _height_ sets the height of the whole component; the top margin is derived from it.`
)});
  main.variable(observer("height")).define("height", function(){return(
130
)});
  main.variable(observer("margin")).define("margin", ["height"], function(height)
{
  const bottom = 20;
  return {top: height - bottom, right: 15, bottom, left: 15}
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`Although this version of the axis uses a one-year date scale (i.e. a timeline) based on the \`date\` property of the item objects, you could use any property and any kind of scale by changing the _accessor_, _setter_, _scale_, and _domain_.`
)});
  main.variable(observer("accessor")).define("accessor", function(){return(
d => d.date
)});
  main.variable(observer("setter")).define("setter", function(){return(
(d, v) => d.date = v
)});
  main.variable(observer("scale")).define("scale", ["d3","domain","margin","width"], function(d3,domain,margin,width){return(
d3.scaleTime(
  domain, 
  [margin.left, width - margin.right]
).clamp(true)
)});
  main.variable(observer("domain")).define("domain", ["d3"], function(d3){return(
[
  d3.timeMonth.floor(new Date()), 
  d3.timeYear.offset(new Date(), 1)
]
)});
  main.variable(observer("inDomain")).define("inDomain", ["accessor","domain"], function(accessor,domain){return(
d => accessor(d) >= domain[0] && accessor(d) <= domain[1]
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Although this version draws heads along the axis (with text labels based on the \`name\` property of the data), you could change the \`"👤"\` emoji below to anything else, or define an entirely custom renderer; this function receives a D3 selection of an SVG group that will be translated along the timeline.`
)});
  main.variable(observer("enterItem")).define("enterItem", function(){return(
g => g.append("g")
  .attr("text-anchor", "middle")
  .call(g => g.append("text")
    .attr("font-size", "2em")
    .attr("y", "-0.1em")
    .text("👤"))
  .call(g => g.append("text")
    .attr("font-size", "10px")
    .attr("font-family", "sans-serif")
    .attr("y", "-3.75em")
    .text(d => d.name))
)});
  main.variable(observer()).define(["md"], function(md){return(
md`You can also customize how the item is transformed while it’s being dragged. Here it’s translated and tilted.`
)});
  main.variable(observer("renderItem")).define("renderItem", ["scale","accessor"], function(scale,accessor){return(
g => g
  .attr("transform", d => {
    const x = scale(accessor(d));
    const y = d.__captor ? -5 : 0;
    const tilt = d.__captor ? (d.__captor.x - x) / 10 : 0;
    return `translate(${x}, ${y}) rotate(${tilt})`
  })
  .attr("opacity", d => d.__captor?.y > 0 ? 0.25 : 1)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Initialization
The basic pattern for the component is the [getter/setter-driven custom input](https://next.observablehq.com/@tophtucker/custom-input-example).`
)});
  main.variable(observer("MultidragAxis")).define("MultidragAxis", ["d3","width","height","axis","addItemSurface","renderItems","set","dragSurface","newItem","scale"], function(d3,width,height,axis,addItemSurface,renderItems,set,dragSurface,newItem,scale){return(
(data) => {
  const svg = d3.create("svg")
    .attr("viewBox", [0, 0, width, height]);
  const node = svg.node();
  let value;

  svg.append("g").call(axis);
  const dragG = svg.append("g");
  const items = svg.append("g").attr("pointer-events", "none");
  svg.append("g").call(addItemSurface(addItem));
  
  // Update the display whenever the value changes
  Object.defineProperty(node, "value", {
    get() {
      return value;
    },
    set(v) {
      const oldValue = value;
      for (const d of v.filter(d => d.__condemned))
        v.splice(v.indexOf(d), 1);
      value = v;
      items.datum(value).call(renderItems);
      if (oldValue !== value) 
        dragG.datum({items, value, set: () => set(node, value)}).call(dragSurface);
    }
  });

  // Set the initial value
  node.value = data;
  
  function addItem({x}) {
    node.value.push(newItem({
      id: node.value.length, 
      date: scale.invert(x)
    }));
    set(node, node.value);
  }
  
  return node;
}
)});
  main.variable(observer("axis")).define("axis", ["margin","d3","scale","width"], function(margin,d3,scale,width){return(
g => g
  .attr("transform", `translate(0, ${margin.top})`)
  .attr("pointer-events", "none")
  .call(d3.axisBottom(scale).ticks(width / 80))
)});
  main.variable(observer("renderItems")).define("renderItems", ["margin","inDomain","enterItem","renderItem"], function(margin,inDomain,enterItem,renderItem){return(
g => g
  .attr("transform", `translate(0, ${margin.top})`)
  .selectAll("g")
  .data(data => data.filter(inDomain), d => d.id)
  .join(enterItem, g => g, g => g.remove())
  .call(renderItem)
)});
  main.variable(observer("dragSurface")).define("dragSurface", ["margin","width","height","drawInstructions","initInstructions","drag","hover"], function(margin,width,height,drawInstructions,initInstructions,drag,hover){return(
g => g.attr("transform", `translate(0, ${margin.top})`)
  .style("cursor", "grab")
  .call(
    g => g.selectAll("rect.click-capture")
      .data([0])
      .join(
        enter => enter.append("rect")
          .attr("class", "click-capture")
          .attr("visibility", "hidden")
          .attr("pointer-events", "all"), 
        update => update, 
        exit => exit.remove())
      .attr("y", -margin.top)
      .attr("width", width)
      .attr("height", height - margin.bottom))
  .call(
    g => g.selectAll("g.instructions")
      .data([0])
      .join(
        enter => enter.append("g").attr("class", "instructions"),
        update => update,
        exit => exit.remove())
      .call(drawInstructions(initInstructions)))
  .call(drag)
  .call(hover)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Add item behavior`
)});
  main.variable(observer("addItemSurface")).define("addItemSurface", ["margin","width","d3","pointers","coneFill","coneBaseline"], function(margin,width,d3,pointers,coneFill,coneBaseline){return(
addItem => g => g.attr("transform", `translate(0, ${margin.top})`)
  .style("cursor", "copy")
  .call(g => g.append("rect")
    .attr("width", width)
    .attr("height", margin.bottom)
    .attr("visibility", "hidden")
    .attr("pointer-events", "all"))
  .on("mousemove", function(event) {
    d3.select(this)
      .selectAll("text")
      .data(pointers(event))
      .join(enter => enter.append("text")
            .text("+")
            .attr("dy", "-0.2em")
            .attr("fill", coneFill)
            .attr("stroke", coneBaseline)
            .attr("font-size", "28px")
            .attr("font-weight", "bold")
            .attr("text-anchor", "middle")
            .attr("pointer-events", "none"))
      .attr("x", d => d.x)
  })
  .on("mouseleave.rm click.rm", function(event) {
    d3.select(this).selectAll("text").remove();
  })
  .on("click", function(event) {
    addItem(pointers(event)[0]);
  })
)});
  main.variable(observer()).define(["md"], function(md){return(
md`When a new item is added, \`newItem\` will be called with \`{id, date}\`. You can override this constructor function to add default props to new items; e.g., to add a default name, you could set this function to \`d => ({name: "New item", ...d})\`.`
)});
  main.variable(observer("newItem")).define("newItem", function(){return(
d => d
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Hover behavior`
)});
  main.variable(observer("hover")).define("hover", ["mousemove","mouseleave"], function(mousemove,mouseleave){return(
g => g
  .on("mousemove.hover", mousemove)
  .on("mouseleave.hover", mouseleave)
)});
  main.variable(observer("mousemove")).define("mousemove", ["d3","pointers","coneStroke","getCone"], function(d3,pointers,coneStroke,getCone){return(
function(event, d) {
  if (d.dragging) return;
  d3.select(this).selectAll("g.hover")
    .style("cursor", "grab")
    .data(pointers(event), d => d.id)
    .join(
      enter => enter.append("g")
        .attr("class", "hover")
        .attr("pointer-events", "none")
        .call(g => g.append("path").attr("class", "cone")
              .attr("fill", "none").attr("stroke", coneStroke))
        .call(g => g.append("path").attr("class", "range")
              .attr("stroke", "#6384dd").attr("stroke-width", 1.5))
    )
    .each(getCone)
    .call(g => g.select(".cone").attr("d", d => d.conePath))
    .call(g => g.select(".range").attr("d", d => d.rangePath));
}
)});
  main.variable(observer("mouseleave")).define("mouseleave", ["d3"], function(d3){return(
function(event) {
  d3.select(this).selectAll("g.hover").remove();
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Drag behavior`
)});
  main.variable(observer("drag")).define("drag", ["d3","pointers","validPointers","joinData","enter","exit","update","renderItems","drawInstructions","dragInstructions","initInstructions"], function(d3,pointers,validPointers,joinData,enter,exit,update,renderItems,drawInstructions,dragInstructions,initInstructions)
{
  function render(event, {items, value, set}) {
    const sel = d3.select(this).selectAll("g.drag");
    const oldData = sel.data();
    const newData = pointers(event, this).filter(validPointers);
    sel
      .data(joinData(oldData, newData), d => d.id)
      .join(enter(value, set), d => d, exit(value, set))
      .call(update(value, set));
    items.call(renderItems);
  }

  function dragstart() {
    d3.select(this)
      .style("cursor", "grabbing")
      .call(g => g.selectAll("g.hover").remove())
      .call(g => g.select(".instructions")
        .call(drawInstructions(dragInstructions)));
  }

  function dragend() {
    d3.select(this)
      .style("cursor", "grab")
      .call(g => g.select(".instructions")
        .attr("opacity", 1)
        .call(drawInstructions(initInstructions))
        .transition()
        .delay(1000)
        .duration(1000)
        .attr("opacity", 0)
        .remove())
  }

  return d3.drag()
    .on("start.init", dragstart)
    .on("end.cleanup", dragend)
    .on("start drag end", render);
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`The three functions _enter_, _update_, and _exit_ (which update the cones) correspond to the actions _capture_, _tug_, and _release_ (which updates the items in their thrall).`
)});
  main.variable(observer("coneFill")).define("coneFill", function(){return(
"#f0f4ff"
)});
  main.variable(observer("coneStroke")).define("coneStroke", function(){return(
"#ccdaff"
)});
  main.variable(observer("coneBaseline")).define("coneBaseline", function(){return(
"#6384dd"
)});
  main.variable(observer("enter")).define("enter", ["coneFill","coneStroke","coneBaseline","getCone","capture"], function(coneFill,coneStroke,coneBaseline,getCone,capture){return(
(value, set) => enter => enter.append("g")
  .attr("class", "drag")
  .attr("pointer-events", "none")
  .call(g => g.append("path").attr("class", "cone").attr("fill", coneFill).attr("stroke", coneStroke))
  .call(g => g.append("path").attr("class", "range").attr("stroke", coneBaseline).attr("stroke-width", 1.5))
  .each(getCone)
  .each(capture(value, set))
)});
  main.variable(observer("update")).define("update", ["getCone","tug"], function(getCone,tug){return(
(value, set) => update => update
  .each(getCone)
  .call(g => g.select(".cone").attr("d", d => d.conePath))
  .call(g => g.select(".range").attr("d", d => d.rangePath))
  .each(tug(value, set))
)});
  main.variable(observer("exit")).define("exit", ["release"], function(release){return(
(value, set) => exit => exit
  .each(release(value, set))
  .remove()
)});
  main.variable(observer("capture")).define("capture", ["accessor","scale"], function(accessor,scale){return(
(value, set) => cone => {
  const [lower, upper] = cone.range;
  itemLoop: for (const d of value) {
    if (accessor(d) >= scale.invert(lower) && accessor(d) <= scale.invert(upper)) {
      d.__captor = cone;
      // If cone is small enough, capture at most 1 item
      if (Math.abs(upper - lower) < 50) break itemLoop;
    }
  }
  set();
}
)});
  main.variable(observer("release")).define("release", function(){return(
(value, set) => cone => {
  for (const d of value) {
    if (d.__captor === cone) {
      if (d.__captor.y > 0) d.__condemned = true;
      delete d.__captor;
    }
  }
  set();
}
)});
  main.variable(observer("tug")).define("tug", ["scale","accessor","setter"], function(scale,accessor,setter){return(
(value, set) => function(cone) {
  const {x0, y0, x, y} = cone;
  if (!x0) return;
  for (const d of value) {
    if (d.__captor === cone) {
      // center of cone
      // + (distance from item to old center of cone) 
      // * (height of cone / old height of cone)
      // The `|| 1` prevents the singularity of all items collapsing irreversibly to center
      const itemX = scale(accessor(d));
      const newItemX = x + (itemX - x0) * ((y || 1) / (y0 || 1));
      setter(d, scale.invert(newItemX));
    }
  }
  set();
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`The _getCone_ function computes cone boundaries and its path strings (the triangle and the baseline).`
)});
  main.variable(observer("getCone")).define("getCone", ["slope"], function(slope){return(
d => {
  const {x, y} = d;
  const range = [x + y * slope, x - y * slope];
  const conePath = `M ${x} ${y} ${range[0]} 0 H ${range[1]} Z`;
  const rangePath = `M ${range[0]} 0 H ${range[1]}`;
  return Object.assign(d, {range, conePath, rangePath});
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Instructions
Show initial instructions; switch to drag instructions when pointer is down; switch back on pointer up and fade out.`
)});
  main.variable(observer("drawInstructions")).define("drawInstructions", ["width","margin"], function(width,margin){return(
instructions => g => g
  .style("font-family", "var(--sans-serif)")
  .style("font-size", 10)
  .style("color", "gray")
  .attr("transform", `translate(${width - 115}, ${-margin.top + 10})`)
  .attr("pointer-events", "none")
  .selectAll("g")
  .data(instructions, d => d.text)
  .join(
    enter => enter.append("g")
      .attr("transform", (d, i) => `translate(0, ${i * 15})`)
      .call(
        g => g.append("path")
          .attr("d", d => d.path)
          .attr("stroke", "currentColor")
          .attr("stroke-width", 1.5)
          .attr("fill", "none"))
      .call(
        g => g.append("text")
          .text(d => d.text)
          .attr("fill", "currentColor")
          .attr("font-weight", "500")
          .attr("dy", "0.31em")),
    update => update,
    exit => exit.remove())
)});
  main.variable(observer("initInstructions")).define("initInstructions", function(){return(
[
  {
    path: "M -20 0 m 3 -3 l -3 3 3 3 m 6 0 l 3 -3 -3 -3",
    text: "Drag to move"
  },
  {
    path: "M -14 -3 v 6 m -3 -3 h 6",
    text: "Click below line to add"
  }
]
)});
  main.variable(observer("dragInstructions")).define("dragInstructions", function(){return(
[
  {
    path: "M -20 0 m 3 -3 l -3 3 3 3 m 6 0 l 3 -3 -3 -3",
    text: "Drag up to stretch"
  }, 
  {
    path: "M -20 0 m 0 -3 l 3 3 -3 3 m 12 0 l -3 -3 3 -3",
    text: "Drag down to squish"
  },
  {
    path: "M -17 0 h 6",
    text: "Drag below line to remove"
  }
]
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Helpers`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`The drag behavior depends on being able to compare this cone to the last one; _joinData_ saves the old (x, y) as (x0, y0) and then updates (x, y) to the new values, maintaining reference equality of the cone object.`
)});
  main.variable(observer("joinData")).define("joinData", function(){return(
(oldData, newData) => {
  const data = [];
  const oldMap = new Map(oldData.map(d => [d.id, d]));
  for (const newCone of newData) {
    if (oldMap.has(newCone.id)) {
      const oldCone = oldMap.get(newCone.id)
      oldCone.x0 = oldCone.x;
      oldCone.y0 = oldCone.y;
      Object.assign(oldCone, newCone);
      data.push(oldCone);
    } else {
      data.push(newCone);
    }
  }
  return data;
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`On _mouseup_, an event is fired with x and y coordinates, which could be mistaken for an active pointer, meaning a cone would be drawn even when the mouse is no longer being held. This filters to the pointers we want to draw cones for, so we can bind pointers to cones.`
)});
  main.variable(observer("validPointers")).define("validPointers", function(){return(
d => d.type !== "mouseup"
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Imports`
)});
  const child1 = runtime.module(define1);
  main.import("pointers", child1);
  const child2 = runtime.module(define2);
  main.import("set", child2);
  const child3 = runtime.module(define3);
  main.import("CSVText", child3);
  return main;
}
