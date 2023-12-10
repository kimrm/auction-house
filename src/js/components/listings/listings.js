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
    case "listings":
      pageContentContainer.append(listingIndex(searchQuery));
      break;
    case "listings/my-listings":
      pageContentContainer.append(listingsForm());
      break;
    case "listings/my-bids":
      pageContentContainer.append(myBids());
      break;
    default:
      pageContentContainer.append(listingIndex(searchQuery));
      break;
  }

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
        pageContentContainer.append(myBids());
        break;
      default:
        break;
    }
  });

  return component;
}

export default listings;
