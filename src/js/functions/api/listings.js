import { get } from "./request";
import { listingsPath } from "./paths";

async function listings(queryParams = {}) {
  return await get(listingsPath, queryParams);
}

export default listings;
