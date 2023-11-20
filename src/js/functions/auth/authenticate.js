import login from "../api/login";
import storeAuth from "./storeAuth";

async function authenticate(data) {
  try {
    const response = await login(data);
    if (response.statusCode === 400) {
      return { errors: response.errors };
    }
    const profile = storeAuth(response);
    return profile;
  } catch (error) {
    return { errors: [error] };
  }
}

export default authenticate;
