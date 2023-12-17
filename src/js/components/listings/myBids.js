import createComponent from "../../utils/createComponent";
import bids from "../../functions/api/bids";
import listingsDetail from "../../functions/api/listingsDetail";
import getAuth from "../../functions/auth/getAuth";
import listingItem from "./listingsItem";
import { routeChangedEvent } from "../../customEvents";
import profile from "../../functions/api/profile";

async function myBids() {
  const html = `
<div class="container">
    <div class="row">
        <div class="col-12">            
            <div id="bidsForProfileContainer" class="grid gap-4 md:grid-cols-2 lg:grid-cols-3"></div>
        </div>
    </div>
</div>
    `;

  const loggedInProfile = getAuth();

  if (!loggedInProfile) {
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

  const bidsData = await bids(loggedInProfile.name);

  const uniqueListingBids = Array.from(
    new Map(bidsData.map((bid) => [bid.listing.id, bid])).values(),
  );

  const profileName = getAuth().name;

  const fullProfile = await profile(profileName);

  const wins = fullProfile.wins;

  uniqueListingBids.forEach((bid) => {
    listingsDetail(bid.listing.id, { _seller: true, _bids: true }).then(
      (listing) => {
        const item = listingItem(listing, wins);
        bidsContainer.append(item);
      },
    );
  });

  return component;
}

export default myBids;
