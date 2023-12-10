import { get } from "./request";
import { profilesPath } from "./paths";

function bids(profileName) {
  return get(`${profilesPath}/${profileName}/bids`, { _listings: "true" });
}

export default bids;
