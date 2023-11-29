import createComponent from "../../utils/createComponent";
import listingsItem from "./listingsItem";
import listings from "../../functions/api/listings";

function listingsIndex() {
  const html = `<div id="listings" class="grid gap-4 md:grid-cols-2 lg:grid-cols-3"></div>`;
  const component = createComponent(html);

  const listingsContainer = component.querySelector("#listings");

  listings(`sort=created&sortOrder=desc`).then((data) => {
    console.log(data);
    const items = data.map((listing) => {
      return listingsItem(listing);
    });
    listingsContainer.append(...items);
  });

  return component;
}

export default listingsIndex;
