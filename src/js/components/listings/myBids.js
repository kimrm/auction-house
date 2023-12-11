import createComponent from "../../utils/createComponent";
import bids from "../../functions/api/bids";
import listingsDetail from "../../functions/api/listingsDetail";
import getAuth from "../../functions/auth/getAuth";
import listingItem from "./listingsItem";
import { routeChangedEvent } from "../../customEvents";

function myBids() {
  const html = `
<div class="container">
    <div class="row">
        <div class="col-12">
            <h1>My Bids</h1>
            <div id="bidsForProfileContainer" class="grid gap-4 md:grid-cols-2 lg:grid-cols-3"></div>
        </div>
    </div>
</div>
    `;

  const profile = getAuth();

  if (!profile) {
    const loginAlertComponent = createComponent(
      `<p>You need to be logged in to view bids. <a href="#" id="loginLink" class="text-blue-900">Log in</p>`,
    );
    const loginLink = loginAlertComponent.querySelector("#loginLink");
    loginLink.addEventListener("click", () => {
      document.dispatchEvent(routeChangedEvent("login"));
    });
    return loginAlertComponent;
  }

  const component = createComponent(html);

  const bidsContainer = component.querySelector("#bidsForProfileContainer");

  bids(profile.name).then((data) => {
    data.forEach((bid) => {
      const listingId = bid.listing.id;
      listingsDetail(listingId, { _seller: true, _bids: true }).then(
        (listing) => {
          console.log("listing: ", listing);
          const item = listingItem(listing);
          bidsContainer.append(item);
        },
      );
    });
  });

  return component;
}

export default myBids;
