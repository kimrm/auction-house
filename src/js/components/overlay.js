import createComponent from "../utils/createComponent";

function overlay() {
  const html = ``;
  const component = createComponent(
    html,
    "absolute",
    "bg-white",
    "rounded-lg",
    "p-2",
    "z-50",
    "transition-all",
    "m-auto",
    "container",
    "top-12",
    "left-0",
    "right-0",
    "md:p-24",
  );
  return component;
}

export default overlay;
