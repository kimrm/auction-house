import { get } from "./request";
import { listingsPath } from "./paths";

async function listingsDetail(id) {
  return await get(`${listingsPath}/${id}`);
}

export default listingsDetail;
