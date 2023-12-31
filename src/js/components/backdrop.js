import createComponent from "../utils/createComponent";

function backdrop() {
  const html = `<div id="backdrop" class="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm"></div>`;
  const component = createComponent(html);

  const backdrop = component.querySelector("#backdrop");

  backdrop.addEventListener("click", () => {
    history.back();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") history.back();
    document.removeEventListener("keydown", () => {});
  });

  return component;
}

export default backdrop;
