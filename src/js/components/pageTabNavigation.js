import createComponent from "../utils/createComponent";

function pageTabNavigation() {
  const html = `
  <button id="listingsButton" class="sm:text-lg md:text-xl uppercase font-bold tracking-wider">Listings</button>
  <button id="auctionButton" class="sm:text-lg md:text-xl uppercase font-bold tracking-wider">My listings</button>
  <button id="myBidsButton" class="sm:text-lg md:text-xl uppercase font-bold tracking-wider">My bids</button>

  `;
  const component = createComponent(
    html,
    "flex",
    "gap-6",
    "justify-between",
    "md:justify-start",
  );

  const listingsButton = component.querySelector("#listingsButton");
  const auctionButton = component.querySelector("#auctionButton");
  const myBidsButton = component.querySelector("#myBidsButton");

  const path = window.location.pathname;
  setActiveButton(
    path === "/listings/my-listings" ? auctionButton : listingsButton,
    component,
  );

  const pageChangedEvent = new CustomEvent("pageTabNavigation_pageChanged", {
    bubbles: true,
    detail: {
      page: "listings",
    },
  });

  listingsButton.addEventListener("click", (event) => {
    window.history.pushState({}, null, "/listings");
    pageChangedEvent.detail.page = "listings";
    setActiveButton(event.target, component);
    document.dispatchEvent(pageChangedEvent);
  });

  auctionButton.addEventListener("click", (event) => {
    window.history.pushState({}, null, "/listings/my-listings");
    pageChangedEvent.detail.page = "my-listings";
    setActiveButton(event.target, component);
    document.dispatchEvent(pageChangedEvent);
  });

  myBidsButton.addEventListener("click", (event) => {
    window.history.pushState({}, null, "/listings/my-bids");
    pageChangedEvent.detail.page = "my-bids";
    setActiveButton(event.target, component);
    document.dispatchEvent(pageChangedEvent);
  });

  return component;
}

function setActiveButton(button, parent) {
  const listingsButton = parent.querySelector("#listingsButton");
  const auctionButton = parent.querySelector("#auctionButton");
  const myBidsButton = parent.querySelector("#myBidsButton");

  if (button === auctionButton) {
    auctionButton.classList.add(
      "text-blue-950",
      "border-b-2",
      "border-blue-950",
    );

    auctionButton.classList.remove("text-gray-600");

    listingsButton.classList.add("text-gray-600");
    listingsButton.classList.remove("border-b-2", "border-blue-950");

    myBidsButton.classList.add("text-gray-600");
    myBidsButton.classList.remove("border-b-2", "border-blue-950");
  } else if (button === listingsButton) {
    listingsButton.classList.add(
      "text-blue-950",
      "border-b-2",
      "border-blue-950",
    );

    listingsButton.classList.remove("text-gray-600");

    auctionButton.classList.add("text-gray-600");
    auctionButton.classList.remove(
      "text-blue-950",
      "border-b-2",
      "border-blue-950",
    );

    myBidsButton.classList.add("text-gray-600");
    myBidsButton.classList.remove("border-b-2", "border-blue-950");
  } else {
    myBidsButton.classList.add(
      "text-blue-950",
      "border-b-2",
      "border-blue-950",
    );

    myBidsButton.classList.remove("text-gray-600");

    auctionButton.classList.add("text-gray-600");
    auctionButton.classList.remove(
      "text-blue-950",
      "border-b-2",
      "border-blue-950",
    );

    listingsButton.classList.add("text-gray-600");
    listingsButton.classList.remove("border-b-2", "border-blue-950");
  }
}

export default pageTabNavigation;
