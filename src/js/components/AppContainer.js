import createComponent from "../utils/createComponent";
import header from "./header";
import footer from "./footer";
import listings from "./listings/listings";
import viewProfile from "./profile/viewProfile";
import login from "./auth/login";
import register from "./auth/register";
import listingsDetail from "./listings/listingsDetail";
import backdrop from "./backdrop";
import overlay from "./overlay";
import pageState from "../utils/pageState";
import getAuth from "../functions/auth/getAuth";

class AppContainer {
  constructor() {
    this.state = pageState();
    this.loginComponent = login();
    this.registerComponent = register();
    this.listingsComponent = listings();
    this.backdropComponent = backdrop();
    this.overlayComponent = overlay();
    this.headerContainer = null;
    this.contentContainer = null;
    this.footerElement = null;

    this.component = createComponent(
      `
      <div id="header" class="container bg-slate-100 transition-all mx-auto left-0 right-0 top-2 px-4 z-50 w-full bg-opacity-95 backdrop-blur-lg rounded-lg fixed"></div>
      <div id="content" class="container mx-auto mt-24 pb-14 relative">
      </div>
      `,
    );

    this.addEventListeners();
    this.render();
    const path = window.location.pathname.replace("/", "");
    this.handleRoutes(path);
  }

  addEventListeners() {
    window.addEventListener("popstate", () => {
      this.handlePopStateEvent();
    });
    document.addEventListener("scroll", () => {
      this.handleScrollEvent();
    });
    document.addEventListener("routeChanged", (event) => {
      this.handleRouteChangedEvent(event);
    });
    document.addEventListener("registered", () => {
      this.handleRegisteredEvent();
    });
    document.addEventListener("loggedIn", () => {
      this.handleLoggedInEvent();
    });
    document.addEventListener("detailsModalClosed", () => {
      this.handleDetailsModalClosedEvent();
    });
  }

  render() {
    const contentContainerElement = this.component.querySelector("#content");
    const headerContainerElement = this.component.querySelector("#header");
    this.headerContainer = headerContainerElement;
    this.contentContainer = contentContainerElement;

    this.headerContainer.append(header());

    this.footerElement = footer();
    this.component.append(this.footerElement);
  }

  renderRoute(parent, child) {
    parent.append(child);
  }

  renderComponent(component) {
    const child = this.contentContainer.childNodes[0];
    if (child) {
      this.contentContainer.removeChild(child);
    }
    this.renderRoute(this.contentContainer, component);
    this.state.currentComponent = component;
  }

  renderDetailsModal(route) {
    const id = route.split("/")[1];
    const detailsComponent = listingsDetail(id);
    this.displayModal(detailsComponent);
    this.state.currentModal = detailsComponent;
  }

  displayModal(modalBodyComponent) {
    this.removeCurrentComponent();
    this.component.append(this.backdropComponent);
    this.component.append(this.overlayComponent);
    this.overlayComponent.append(modalBodyComponent);
  }

  removeCurrentComponent() {
    const child = this.contentContainer.childNodes[0];
    if (child) {
      this.contentContainer.removeChild(child);
    }
  }

  handleRoutes(route) {
    if (this.state.currentModal) {
      this.component.removeChild(this.backdropComponent);
      this.component.removeChild(this.overlayComponent);
      this.overlayComponent.innerHTML = "";
      this.state.currentModal = null;
    }
    switch (route) {
      case "login":
        this.renderComponent(this.loginComponent);
        break;
      case "register":
        this.renderComponent(this.registerComponent);
        break;
      case "":
        this.renderComponent(this.listingsComponent);
        break;
      case "listings":
        this.renderComponent(this.listingsComponent);
        break;
      case "listings/my-listings":
        this.renderComponent(this.listingsComponent);
        break;
      case "listings/my-bids":
        this.renderComponent(this.listingsComponent);
        break;
      default:
        console.log("route: ", route);
        if (route.includes("search")) {
          const searchQuery = route.split("/")[2];
          this.renderComponent(listings(searchQuery));
          break;
        }
        if (route.includes("profile")) {
          let profileName = route.split("/")[1];
          if (!profileName) {
            const auth = getAuth();
            if (!auth) {
              break;
            }
            profileName = auth.name;
          }
          this.renderComponent(viewProfile(profileName));
          break;
        }
        this.renderDetailsModal(route);
        break;
    }
  }

  app() {
    return this.component;
  }

  handleScrollEvent() {
    // const header = document.querySelector("#header");
    // if (window.scrollY > 50) {
    //   header.classList.add("shadow", "fixed");
    // } else {
    //   header.classList.remove("shadow", "fixed");
    // }
  }

  handlePopStateEvent() {
    const path = window.location.pathname.replace("/", "");
    this.handleRoutes(path);
  }

  handleRouteChangedEvent(event) {
    const { route } = event.detail;
    history.pushState({}, null, `/${route}`);

    this.handleRoutes(route);
  }

  handleRegisteredEvent() {
    location.replace("/login?registered=true");
  }

  handleLoggedInEvent() {
    this.headerContainer.innerHTML = "";
    this.headerContainer.append(header());
    this.contentContainer.innerHTML = "";
    this.contentContainer.append(this.listingsComponent);
    this.component.removeChild(this.footerElement);
    const footerElement = footer();
    this.component.append(footerElement);
  }

  handleDetailsModalClosedEvent() {
    this.component.removeChild(this.backdropComponent);
    this.component.removeChild(this.overlayComponent);
    this.overlayComponent.innerHTML = "";
    this.state.currentModal = null;
    if (this.state.currentComponent) {
      history.back();
    } else {
      history.pushState({}, null, `/listings`);
      this.handleRoutes("listings");
    }
  }
}

export default AppContainer;
