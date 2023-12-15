import { get } from "./request";
import { profilesPath } from "./paths";

function listingsForProfile(profileName, queryParams = {}) {
  return get(`${profilesPath}/${profileName}/listings`, queryParams);
}

export default listingsForProfile;
