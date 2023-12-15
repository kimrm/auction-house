import { authPath } from "./paths";
import { post } from "./request";

async function register(data) {
  console.log(data);
  return await post(`${authPath}/register`, data);
}

export default register;
