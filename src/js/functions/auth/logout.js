function logout() {
  try {
    localStorage.removeItem("profile");
    return true;
  } catch (error) {
    console.log(error);
  }

  return false;
}

export default logout;
