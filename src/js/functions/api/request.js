function call(method, url, data = null) {
  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (data) {
    options.body = JSON.stringify(data);
  }

  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
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

  // try {
  //   const response = await fetch(url, options);
  //   if (!response.ok) {
  //     throw new Error(response.statusText);
  //   }
  //   const responseData = await response.json();
  //   return responseData;
  // } catch (error) {
  //   return {
  //     errors: [
  //       {
  //         message: error.message,
  //       },
  //     ],
  //   };
  // }
}

function get(url, queryParams = null) {
  return call("GET", url + "?" + new URLSearchParams(queryParams));
}

function post(url, data) {
  return call("POST", url, data);
}

export { get, post };
