import createComponent from "../../utils/createComponent";

function imageThumbnail(image) {
  const html = `
<div class="border rounded-xl overflow-clip">
    <img class="object-cover mx-auto h-24 cursor-pointer" src="${image}">
</div>
    `;

  const component = createComponent(html);

  const imageElement = component.querySelector("img");
  imageElement.addEventListener("error", () => {
    component.removeChild(imageElement);
    const noImage = document.createElement("div");
    noImage.classList.add(
      "bg-slate-200",
      "h-24",
      "flex",
      "justify-center",
      "items-center",
      "text-gray-500",
      "text-xs",
      "font-bold",
      "uppercase",
      "tracking-wider",
      "rounded-xl",
    );
    noImage.textContent = "No image";
    component.append(noImage);
  });

  const ImageClickedEvent = new CustomEvent("imageThumbnail_imageClicked", {
    bubbles: true,
    detail: {
      image: image,
    },
  });

  imageElement.addEventListener("click", () => {
    document.dispatchEvent(ImageClickedEvent);
  });

  return component;
}

export default imageThumbnail;
