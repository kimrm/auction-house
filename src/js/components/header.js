import createComponent from "../utils/createComponent";
import { siteName } from "../utils/vars";
import getAuth from "../functions/auth/getAuth";
import userIcon from "../../images/user.png";
import menuIcon from "../../images/menu.png";
import { routeChangedEvent } from "../customEvents";
import logout from "../functions/auth/logout";

function header() {
  const profile = getAuth();
  const html = `
    <div class="relative z-20 flex justify-between items-center h-20">
        <a id="logoLink" href="/"><h1 class="font-serif font-bold text-xl"></h1></a>
        <form id="searchForm" class="flex gap-2 items-center">
          <input id="searchInput" class=" w-36 md:w-80 rounded-lg border border-slate-300 p-2 text-gray-600 text-sm font-bold" type="search" placeholder="Search for listings">
          <label for="searchInput" class="sr-only">Search for listings</label>
          <button id="searchButton" class="hidden md:block bg-deep-blue-500 hover:bg-deep-blue-400 text-white uppercase font-bold tracking-wider text-sm rounded-lg p-2">Search</button>
        </form>
        <div class="flex justify-between items-center gap-4">          
          <button id="profileButton" class="hidden md:flex gap-2 items-center border-0 hover:text-blue-500 border-slate-300 rounded-xl p-2">${
            profile
              ? `<span>${profile.name}</span> 
              <img alt="Profile image" class="object-fit h-7 rounded-full custom-position" width="28" src=${
                profile.avatar === "" ? userIcon : profile.avatar
              }>`
              : `<img alt="Profile placeholder image" height="20" width="20" src=${userIcon}>`
          }
          </button>
          <button id="menuButton"><img alt="Menu button icon" height="24" width="24" src=${menuIcon}></button>
          <div id="menu" class="hidden absolute z-20 top-20 left-0 md:left-auto right-0 bg-white border border-slate-300 rounded-lg">
            <ul class="flex flex-col gap-1">
              ${
                profile
                  ? `
                  <li><a class="block bg-slate-50 hover:bg-slate-200 px-12 py-4" href="/listings/my-bids">My bids</a></li>
                  <li><a class="block bg-slate-50 hover:bg-slate-200 px-12 py-4" href="/listings/my-listings">My Listings</a></li>
              <li><a class="block bg-slate-50 hover:bg-slate-200 px-12 py-4" href="/profile">Profile</a></li>
              <li><a id="logoutLink" class="block bg-slate-50 hover:bg-slate-200 px-12 py-4">Log out</a></li>`
                  : `<li><a class="block bg-slate-50 hover:bg-slate-200 px-12 py-4" href="/login">Log in</a></li>
                  <li><a class="block bg-slate-50 hover:bg-slate-200 px-12 py-4" href="/register">Register</a></li>`
              }
          </div>
        </div>        
    </div>
  `;
  const component = createComponent(html);
  const h1 = component.querySelector("h1");
  h1.textContent = siteName;

  const searchForm = component.querySelector("#searchForm");
  const searchInput = component.querySelector("#searchInput");
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (searchInput.value) {
      document.dispatchEvent(
        routeChangedEvent(`listings/search/${searchInput.value}`),
      );
    }
  });

  const menuButton = component.querySelector("#menuButton");
  const menu = component.querySelector("#menu");
  menuButton.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });

  const logoutLink = component.querySelector("#logoutLink");
  if (logoutLink) {
    logoutLink.addEventListener("click", () => {
      if (logout()) {
        location.reload();
      }
    });
  }

  const logoLink = component.querySelector("#logoLink");
  logoLink.addEventListener("click", (event) => {
    event.preventDefault();
    document.dispatchEvent(routeChangedEvent("listings"));
  });

  const profileButton = component.querySelector("#profileButton");
  profileButton.addEventListener("click", () => {
    document.dispatchEvent(routeChangedEvent(profile ? "profile" : "login"));
  });

  return component;
}

export default header;
