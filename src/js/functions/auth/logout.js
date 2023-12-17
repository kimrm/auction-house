function logout() {
  try {
    localStorage.removeItem("profile");
    return true;
  } catch (error) {
    console.error(error);
  }

  return false;
}

export default logout;
