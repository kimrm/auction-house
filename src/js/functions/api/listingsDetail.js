import { get } from "./request";
import { listingsPath } from "./paths";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

async function listingsDetail(id, queryParams = {}) {
  const listing = await get(`${listingsPath}/${id}`, queryParams);

  const dateNow = new Date();
  const startsAt = dayjs.tz(dateNow, "Europe/Oslo");
  const endsAtDate = dayjs.tz(listing.endsAt, "Europe/Oslo");

  listing.isEnded = endsAtDate < startsAt;

  return listing;
}

export default listingsDetail;
