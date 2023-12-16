import createComponent from "../utils/createComponent";
import getAuth from "../functions/auth/getAuth";
import { routeChangedEvent } from "../customEvents";

function footer() {
  const profile = getAuth();
  const html = `
<footer class="fixed bottom-0 left-0 right-0 flex items-center bg-slate-900 text-white">
  <div class="container mx-auto flex gap-8 p-4"> 
    <div class="hidden md:block text-blue-50"><a id="myListingsLink" class="hover:text-blue-300" href="/listings/my-listings">My listings <span class="ml-1 py-1 px-2 rounded-full outline outline-yellow-100">30</span></a></div> 
    <div class="hidden md:block text-blue-50"><a id="myBidsLink" class="hover:text-blue-300" href="/listings/my-bids">My bids <span class="ml-1 py-1 px-2 rounded-full outline outline-yellow-100">3</span></a></div>        
    <div class="text-blue-50"><a id="profileLink" class="hover:text-blue-300" href="/profile">My credits <span class="ml-1 py-1 px-2 rounded-full outline outline-yellow-100">${
      profile && profile.credits
    }</span></a></div>
    <button id="footer_menuButton" class="md:hidden">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
      </svg>
    </button>
  </div>
</footer>`;

  const component = createComponent(html);

  const menuButton = component.querySelector("#footer_menuButton");
  const menu = footerMenuPopUp();
  menuButton.addEventListener("click", () => {
    console.log("show menu");
    menu.classList.toggle("hidden");
  });
  const footerElement = component.querySelector("footer");
  footerElement.append(menu);

  const myListingsLink = component.querySelector("#myListingsLink");
  const myBidsLink = component.querySelector("#myBidsLink");
  const profileLink = component.querySelector("#profileLink");

  myListingsLink.addEventListener("click", (event) => {
    event.preventDefault();
    const pageChangedEvent = new CustomEvent("pageTabNavigation_pageChanged", {
      bubbles: true,
      detail: {
        page: "my-listings",
      },
    });
    document.dispatchEvent(routeChangedEvent("listings"));
    window.history.pushState({}, null, "/listings/my-listings");
    document.dispatchEvent(pageChangedEvent);
  });

  myBidsLink.addEventListener("click", (event) => {
    event.preventDefault();
    const pageChangedEvent = new CustomEvent("pageTabNavigation_pageChanged", {
      bubbles: true,
      detail: {
        page: "my-bids",
      },
    });
    document.dispatchEvent(routeChangedEvent("listings"));
    window.history.pushState({}, null, "/listings/my-bids");
    document.dispatchEvent(pageChangedEvent);
  });

  profileLink.addEventListener("click", (event) => {
    event.preventDefault();
    document.dispatchEvent(routeChangedEvent("profile"));
  });

  return component;
}

function footerMenuPopUp() {
  const html = `
<div id="footer_menu" class="absolute z-50 bottom-[3rem] left-0 md:left-auto right-0 bg-slate-300 border border-slate-300 rounded-lg">
  <ul class="flex flex-col gap-1">
    <li><a id="popUpMyBidsLink" class="text-black block bg-slate-100 hover:bg-slate-200 px-12 py-4" href="/listings/my-bids">My bids: 3</a></li>
    <li><a id="popUpMyListingsLink" class="text-black block bg-slate-100 hover:bg-slate-200 px-12 py-4" href="/listings/my-listings">My Listings: 3</a></li>
  </ul>
</div>    
  `;
  const popUpMenu = createComponent(html, "hidden");

  const myListingsLink = popUpMenu.querySelector("#popUpMyListingsLink");
  const myBidsLink = popUpMenu.querySelector("#popUpMyBidsLink");

  myListingsLink.addEventListener("click", (event) => {
    event.preventDefault();
    const pageChangedEvent = new CustomEvent("pageTabNavigation_pageChanged", {
      bubbles: true,
      detail: {
        page: "my-listings",
      },
    });
    document.dispatchEvent(routeChangedEvent("listings"));
    window.history.pushState({}, null, "/listings/my-listings");
    document.dispatchEvent(pageChangedEvent);
  });

  myBidsLink.addEventListener("click", (event) => {
    event.preventDefault();
    const pageChangedEvent = new CustomEvent("pageTabNavigation_pageChanged", {
      bubbles: true,
      detail: {
        page: "my-bids",
      },
    });
    document.dispatchEvent(routeChangedEvent("listings"));
    window.history.pushState({}, null, "/listings/my-bids");
    document.dispatchEvent(pageChangedEvent);
  });

  return popUpMenu;
}

export default footer;
