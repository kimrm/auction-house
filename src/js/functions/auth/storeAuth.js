function storeAuth(profile) {
  window.localStorage.setItem("profile", JSON.stringify(profile));
  return profile;
}

export default storeAuth;
