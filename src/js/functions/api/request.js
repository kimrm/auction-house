function call(method, url, data = null) {
  const loggedInProfile = localStorage.getItem("profile");
  const token = loggedInProfile
    ? JSON.parse(loggedInProfile).accessToken
    : null;
  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (data) {
    options.body = JSON.stringify(data);
  }
  if (token) {
    options.headers.Authorization = "Bearer " + token;
  }

  return fetch(url, options)
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      return {
        errors: [
          {
            message: error.message,
          },
        ],
      };
    });
}

function get(url, queryParams = null) {
  return call("GET", url + "?" + new URLSearchParams(queryParams));
}

function post(url, data) {
  return call("POST", url, data);
}

function put(url, data) {
  return call("PUT", url, data);
}

export { get, post, put };
