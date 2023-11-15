function app() {
  const html = `
    <div>
        <h1>App</h1>
    </div>
    `;
  const template = document.createElement("template");
  template.innerHTML = html;
  const container = template.content.cloneNode(true);

  return container;
}

export default app;
