import { post } from "./request";
import { listingsPath } from "./paths";

function createListing(data) {
  return post(listingsPath, data);
}

export default createListing;
