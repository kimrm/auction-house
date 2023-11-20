import createComponent from "../utils/createComponent";
import header from "./header";
import footer from "./footer";
import listings from "./listings/listings";
import login from "./auth/login";
import register from "./auth/register";

function app() {
  const component = createComponent(
    `
    <div id="header" class="container mx-auto px-4"></div>
    <div id="content" class="container mx-auto pb-14">
    </div>
    `,
  );

  const headerContainer = component.querySelector("#header");
  const contentContainer = component.querySelector("#content");

  headerContainer.append(header());

  const footerElement = footer();

  component.append(footerElement);

  document.addEventListener("routeChanged", (event) => {
    const { route } = event.detail;
    window.history.pushState({}, null, `/${route}`);
    handleRoutes(route);
  });

  document.addEventListener("registered", () => {
    window.history.pushState({}, null, "/login?registered=true");
    renderRoute(contentContainer, login());
  });

  document.addEventListener("loggedIn", () => {
    console.log("reloading header");
    headerContainer.innerHTML = "";
    headerContainer.append(header());
    contentContainer.innerHTML = "";
    contentContainer.append(listings());
    component.removeChild(footerElement);
    const footerElement = footer();
    component.append(footerElement);
  });

  function handleRoutes(route) {
    switch (route) {
      case "login":
        renderRoute(contentContainer, login());
        break;
      case "register":
        renderRoute(contentContainer, register());
        break;
      default:
        renderRoute(contentContainer, listings());
        break;
    }
  }

  document.addEventListener("pageTabNavigation_pageChanged", (event) => {
    console.log(event.detail.page);
  });

  const path = window.location.pathname.replace("/", "");

  handleRoutes(path);

  return component;
}

function renderRoute(parent, child) {
  parent.innerHTML = "";
  parent.append(child);
}

export default app;
