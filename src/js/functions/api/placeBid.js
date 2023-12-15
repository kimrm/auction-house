import { listingsPath } from "./paths";
import { post } from "./request";

function placeBid(id, data) {
  console.log(data);
  return post(`${listingsPath}/${id}/bids?_bids=true`, data);
}

export default placeBid;
