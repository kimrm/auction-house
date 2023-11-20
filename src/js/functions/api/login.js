import { authPath } from "./paths";
import { post } from "./request";

async function login(data) {
  return await post(`${authPath}/login`, data);
}

export default login;
