import createComponent from "../../utils/createComponent";

function imageThumbnail(image) {
  const html = `
<div class="border rounded-xl overflow-clip">
    <img class="object-cover mx-auto h-24" src="${image}">
</div>
    `;

  const component = createComponent(html);

  return component;
}

export default imageThumbnail;
