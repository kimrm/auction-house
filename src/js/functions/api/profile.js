import { get } from "./request";
import { profilesPath } from "./paths";

async function profile(name) {
  return await get(`${profilesPath}/${name}`, {});
}

export default profile;
