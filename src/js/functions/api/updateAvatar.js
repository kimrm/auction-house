import { put } from "./request";
import { profilesPath } from "./paths";

function updateAvatar(name, avatar) {
  const avatarRequest = { avatar: avatar };
  return put(`${profilesPath}/${name}/media`, avatarRequest);
}

export default updateAvatar;
