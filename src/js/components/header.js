import createComponent from "../utils/createComponent";
import { siteName } from "../utils/vars";
import getLoggedInToken from "../functions/auth/getLoggedInToken";
import userIcon from "../../images/user.png";
import menuIcon from "../../images/menu.png";
import avatar from "../functions/profile/avatar";

function header() {
  const html = `
    <div class="flex justify-between items-center h-20">
        <a id="logoLink" href="/"><h1 class="font-serif font-bold text-xl"></h1></a>
        <div class="flex justify-between items-center gap-4">
          <button id="profileButton" class="flex gap-2 items-center border border-slate-300 rounded-xl p-2">${
            getLoggedInToken()
              ? `<span>Profile</span> 
              <img class="object-fit h-7 rounded-full custom-position" width="28" src=${avatar()}>`
              : `<img height="20" width="20" src=${userIcon}>`
          }
          </button>
          <button><img height="24" width="24" src=${menuIcon}></button>
        </div>        
    </div>
  `;
  const component = createComponent(html);
  const h1 = component.querySelector("h1");
  h1.textContent = siteName;

  const logoLink = component.querySelector("#logoLink");
  logoLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.history.pushState({}, null, "/");
    const routeChanged = new CustomEvent("routeChanged", {
      bubbles: true,
      detail: {
        route: "home",
      },
    });
    document.dispatchEvent(routeChanged);
  });

  const routeChanged = new CustomEvent("routeChanged", {
    bubbles: true,
    detail: {},
  });

  const profileButton = component.querySelector("#profileButton");
  profileButton.addEventListener("click", () => {
    window.history.pushState({}, null, "/login");
    routeChanged.detail.route = "login";
    document.dispatchEvent(routeChanged);
  });

  return component;
}

export default header;
