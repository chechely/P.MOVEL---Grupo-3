// https://observablehq.com/@observablehq/synchronized-inputs@182
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Synchronized Inputs

[Observable Inputs](/@observablehq/inputs) behave similarly to native HTML inputs: they expose a value and emit an *input* event when the user changes the value. This makes them compatible with [Observable’s viewof operator](/@observablehq/introduction-to-views). It also means that you can programmatically control the value of an input.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Setting the value of an input with viewof requires two steps:

1. Assign the input’s value (<code>viewof x.value</code>)
2. Dispatch an *input* event (<code>viewof x.dispatchEvent</code>)

As a function:`
)});
  main.variable(observer("set")).define("set", ["Event"], function(Event){return(
function set(input, value) {
  input.value = value;
  input.dispatchEvent(new Event("input"));
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Now let’s try it!`
)});
  main.variable(observer("viewof x")).define("viewof x", ["Inputs"], function(Inputs){return(
Inputs.range([0, 100], {step: 1})
)});
  main.variable(observer("x")).define("x", ["Generators", "viewof x"], (G, _) => G.input(_));
  main.variable(observer()).define(["Inputs","set","viewof x"], function(Inputs,set,$0){return(
Inputs.button([
  ["Set to 0", () => set($0, 0)],
  ["Set to 100", () => set($0, 100)]
])
)});
  main.variable(observer()).define(["x"], function(x){return(
x
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Here viewof *x* refers to the view (the HTMLFormElement returned by [Range](/@observablehq/input-range)), whereas *x* refers to the view’s live value. A cell referencing *x* will run whenever the value of *x* changes, but a cell that only references viewof *x* only runs if the view itself is redefined (which typically only occurs on load and when the code is edited).`
)});
  main.variable(observer()).define(["viewof x"], function($0){return(
$0
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Programmatic control allows multiple inputs value to control a single value — to be synchronized. For example, in a tall notebook, you might offer redundant inputs under each chart so that the reader doesn’t have to scroll to change an input.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Observable Input’s **bind** function allows you to bind two inputs together so that interacting with one input updates the second and vice versa. It takes two inputs as arguments and returns the first input. This makes it convenient to bind a secondary input to an existing input while displaying it in a cell or elsewhere (even inline!).`
)});
  main.variable(observer()).define(["Inputs","viewof x"], function(Inputs,$0){return(
Inputs.bind(Inputs.range([0, 100]), $0)
)});
  main.variable(observer()).define(["md","Inputs","htl","viewof x"], function(md,Inputs,htl,$0){return(
md`This is a range input ${Inputs.bind(htl.html`<input type=range style="width: 80px;">`, $0)}.

This is a number input ${Inputs.bind(htl.html`<input type=number style="width: 80px;">`, $0)}.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Sometimes there isn’t an obvious “primary” input to bind to. In this case, you can use Observable’s **Input** function to create a lightweight mutable value store. The Input function takes an optional initial value and can be passed to bind as the second argument. Try dragging either slider below!`
)});
  main.variable(observer("viewof i")).define("viewof i", ["Inputs"], function(Inputs){return(
Inputs.input(42)
)});
  main.variable(observer("i")).define("i", ["Generators", "viewof i"], (G, _) => G.input(_));
  main.variable(observer()).define(["Inputs","viewof i"], function(Inputs,$0){return(
Inputs.bind(Inputs.range([0, 100]), $0)
)});
  main.variable(observer()).define(["Inputs","viewof i"], function(Inputs,$0){return(
Inputs.bind(Inputs.range([0, 100]), $0)
)});
  main.variable(observer()).define(["i"], function(i){return(
i
)});
  return main;
}
