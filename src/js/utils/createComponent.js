function createFromTemplate(html) {
  const template = document.createElement("template");
  template.innerHTML = html;
  return template.content.cloneNode(true);
}

export default createFromTemplate;
