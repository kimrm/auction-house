function getAuth() {
  return localStorage.getItem("profile")
    ? JSON.parse(localStorage.getItem("profile"))
    : null;
}

export default getAuth;
