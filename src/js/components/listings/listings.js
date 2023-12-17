import createComponent from "../../utils/createComponent";
import pageTabNavigation from "../pageTabNavigation";
import listingIndex from "./listingsIndex";
import listingsForm from "./listingsForm";
import myBids from "./myBids";

function listings(searchQuery = "") {
  const html = `<div id="pageTabNavigation" class="p-4"></div>
    <div id="pageContent" class="p-4"></div>`;

  const component = createComponent(html);

  const pageTabNavigationContainer =
    component.querySelector("#pageTabNavigation");
  const pageContentContainer = component.querySelector("#pageContent");

  pageTabNavigationContainer.append(pageTabNavigation());
  const path = window.location.pathname;
  switch (path) {
    case "/listings":
      pageContentContainer.append(listingIndex(searchQuery));
      break;
    case "/listings/my-listings":
      pageContentContainer.append(listingsForm());
      break;
    case "/listings/my-bids":
      myBids().then((component) => {
        pageContentContainer.append(component);
      });
      break;
    default:
      pageContentContainer.append(listingIndex(searchQuery));
      break;
  }

  console.log("path", path);

  document.addEventListener("pageTabNavigation_pageChanged", (event) => {
    pageContentContainer.innerHTML = "";
    switch (event.detail.page) {
      case "listings":
        pageContentContainer.append(listingIndex());
        break;
      case "my-listings":
        pageContentContainer.append(listingsForm());
        break;
      case "my-bids":
        myBids().then((component) => {
          pageContentContainer.append(component);
        });
        break;
      default:
        break;
    }
  });

  document.addEventListener("popstate", () => {
    console.log("popstate in listings");
  });

  return component;
}

export default listings;
