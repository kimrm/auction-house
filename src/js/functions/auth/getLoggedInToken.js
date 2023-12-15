function getLoggedInToken() {
  return localStorage.getItem("token") ? localStorage.getItem("token") : null;
}

export default getLoggedInToken;
