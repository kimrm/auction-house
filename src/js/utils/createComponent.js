function createFromTemplate(html, ...classList) {
  const template = document.createElement("template");
  template.innerHTML = html;
  const containerDiv = document.createElement("div");
  containerDiv.classList.add(...classList);
  containerDiv.appendChild(template.content.cloneNode(true));
  return containerDiv;
}

export default createFromTemplate;
