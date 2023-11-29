import createComponent from "../utils/createComponent";

function pageTabNavigation() {
  const html = `
  <button id="listingsButton" class="text-xl uppercase font-bold tracking-wider">Listings</button>
  <button id="auctionButton" class="text-xl uppercase font-bold tracking-wider"> My listing</button>
  `;
  const component = createComponent(html, "flex", "gap-6");

  const listingsButton = component.querySelector("#listingsButton");
  const auctionButton = component.querySelector("#auctionButton");

  const path = window.location.pathname;
  setActiveButton(
    path === "/auction" ? auctionButton : listingsButton,
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
    window.history.pushState({}, null, "/auction");
    pageChangedEvent.detail.page = "auction";
    setActiveButton(event.target, component);
    document.dispatchEvent(pageChangedEvent);
  });

  return component;
}

function setActiveButton(button, parent) {
  const listingsButton = parent.querySelector("#listingsButton");
  const auctionButton = parent.querySelector("#auctionButton");

  if (button === auctionButton) {
    auctionButton.classList.add(
      "text-blue-950",
      "border-b-2",
      "border-blue-950",
    );

    auctionButton.classList.remove("text-gray-600");

    listingsButton.classList.add("text-gray-600");

    listingsButton.classList.remove("border-b-2", "border-blue-950");
  } else {
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
  }
}

export default pageTabNavigation;
