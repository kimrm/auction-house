import createComponent from "../utils/createComponent";
import { siteName } from "../utils/vars";
import getAuth from "../functions/auth/getAuth";
import userIcon from "../../images/user.png";
import menuIcon from "../../images/menu.png";
import avatar from "../functions/profile/avatar";
import { routeChangedEvent } from "../customEvents";

function header() {
  const profile = getAuth();
  const html = `
    <div class="flex justify-between items-center h-20">
        <a id="logoLink" href="/"><h1 class="font-serif font-bold text-xl"></h1></a>
        <div class="flex justify-between items-center gap-4">
          <button id="profileButton" class="flex gap-2 items-center border border-slate-300 rounded-xl p-2">${
            profile
              ? `<span>${profile.name}</span> 
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
    document.dispatchEvent(routeChangedEvent(""));
  });

  const profileButton = component.querySelector("#profileButton");
  profileButton.addEventListener("click", () => {
    document.dispatchEvent(routeChangedEvent("login"));
  });

  return component;
}

export default header;
