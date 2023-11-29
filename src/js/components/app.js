import createComponent from "../utils/createComponent";
import header from "./header";
import footer from "./footer";
import listings from "./listings/listings";
import login from "./auth/login";
import register from "./auth/register";
import listingsDetail from "./listings/listingsDetail";
import backdrop from "./backdrop";
import overlay from "./overlay";
import pageState from "../utils/pageState";

function app() {
  const component = createComponent(
    `
    <div id="header" class="container bg-slate-100 transition-all mx-auto left-0 right-0 px-4 z-10 w-full bg-opacity-95 backdrop-blur-lg rounded-lg"></div>
    <div id="content" class="container mx-auto my-4 pb-14 relative">
    </div>
    `,
  );

  const state = pageState();

  const loginComponent = login();
  const registerComponent = register();
  const listingsComponent = listings();
  const backdropComponent = backdrop();
  const overlayComponent = overlay();

  const headerContainer = component.querySelector("#header");
  const contentContainer = component.querySelector("#content");

  headerContainer.append(header());

  const footerElement = footer();
  component.append(footerElement);

  const path = window.location.pathname.replace("/", "");
  handleRoutes(path);

  function renderComponent(component) {
    state.previousComponent = state.currentComponent;
    if (state.currentComponent) {
      contentContainer.removeChild(state.currentComponent);
    }
    renderRoute(contentContainer, component);
    state.currentComponent = loginComponent;
  }

  function handleRoutes(route) {
    switch (route) {
      case "login":
        renderComponent(loginComponent);
        break;
      case "register":
        renderComponent(registerComponent);
        break;
      case "":
        renderComponent(listingsComponent);
        break;
      case "listings":
        renderComponent(listingsComponent);
        break;
      default:
        if (pageState.component) {
          contentContainer.removeChild(pageState.component);
        }
        renderDetailsModal(route);
        break;
    }
  }

  function renderDetailsModal(route) {
    const id = route.split("/")[1];
    const detailsComponent = listingsDetail(id);
    displayOverlay(component, overlayComponent, backdropComponent);
    overlayComponent.append(detailsComponent);
    pageState.component = null;
    pageState.modal = detailsComponent;
  }

  function displayOverlay(parent, modal, backdrop) {
    parent.append(backdrop);
    parent.append(modal);
  }

  function renderRoute(parent, child) {
    parent.append(child);
  }

  document.addEventListener("scroll", () => {
    const header = document.querySelector("#header");
    if (window.scrollY > 50) {
      header.classList.add("shadow", "fixed");
    } else {
      header.classList.remove("shadow", "fixed");
    }
  });

  window.addEventListener("popstate", () => {
    const path = window.location.pathname.replace("/", "");
    handleRoutes(path);
  });

  document.addEventListener("routeChanged", (event) => {
    const { route } = event.detail;
    history.pushState({}, null, `/${route}`);
    console.log("Route changed: ", route);
    handleRoutes(route);
  });

  document.addEventListener("registered", () => {
    history.pushState({ registered: true }, null, "/login");
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

  document.addEventListener("pageTabNavigation_pageChanged", (event) => {
    console.log(event.detail.page);
  });

  document.addEventListener("detailsModalClosed", () => {
    console.log(pageState.previousComponent);
    if (pageState.previousComponent === null) {
      history.pushState({ registered: true }, null, "/listings");
      handleRoutes("listings");
    } else {
      pageState.modal = null;
      overlayComponent.innerHTML = "";
      component.removeChild(backdropComponent);
      component.removeChild(overlayComponent);
      history.back();
    }
  });

  return component;
}

export default app;
