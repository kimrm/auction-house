import { get } from "./request";
import { listingsPath } from "./paths";

async function listings(params) {
  return await get(listingsPath, params);
}

export default listings;
