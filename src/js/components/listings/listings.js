import createComponent from "../../utils/createComponent";
import pageTabNavigation from "../pageTabNavigation";
import listingIndex from "./listingsIndex";

function listings() {
  const html = `<div id="pageTabNavigation" class="p-4"></div>
    <div id="pageContent" class="p-4"></div>`;

  const component = createComponent(html);

  const pageTabNavigationContainer =
    component.querySelector("#pageTabNavigation");
  const pageContentContainer = component.querySelector("#pageContent");

  pageTabNavigationContainer.append(pageTabNavigation());
  pageContentContainer.append(listingIndex());

  return component;
}

export default listings;
