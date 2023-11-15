async function call(method, url, data = null) {
  const options = {
    method: method,
    body: data ? JSON.stringify(data) : null,
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(url, options);
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log({ error: error });
  }
}

async function get(url) {
  return await call("GET", url);
}

async function post(url, data) {
  return await call("POST", url, data);
}

export { get, post };
