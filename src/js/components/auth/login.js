import createComponent from "../../utils/createComponent";

function login() {
  const html = `
    <div class="container mx-auto px-4">
        <h1 class="text-3xl font-bold mb-4">Login</h1>
        <p>To get access to bidding and adding listings you need to login. If you don't have an account yet, please <a id="registerLink" href="/register" class=" visited:text-blue-500">register</a></p>
        
        ${
          new URLSearchParams(window.location.search).get("registered") ===
          "true"
            ? `<div class="bg-green-200 text-green-900 p-4 rounded-lg mt-4 md:w-2/3 lg:w-1/2"><p class="font-bold">You have successfully registered. Please login.</p></div>`
            : ""
        }

        <form class="flex flex-col gap-4 mt-4 md:w-2/3 lg:w-1/2">
            <label for="email">Email</label>
            <input id="email" type="email" class="border border-gray-300 p-2 rounded-lg">
            <label for="password">Password</label>
            <input id="password" type="password" class="border border-gray-300 p-2 rounded-lg">
            <button type="submit" class="bg-blue-500 text-white rounded-lg p-2">Login</button>
        </form>
    </div>
    `;

  const component = createComponent(html);

  const registerLink = component.querySelector("#registerLink");
  registerLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.history.pushState({}, null, "/register");
    const routeChanged = new CustomEvent("routeChanged", {
      bubbles: true,
      detail: {
        route: "register",
      },
    });
    document.dispatchEvent(routeChanged);
  });

  const form = component.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = component.querySelector("#email").value;
    const password = component.querySelector("#password").value;
    const loginEvent = new CustomEvent("login", {
      bubbles: true,
      detail: {
        email,
        password,
      },
    });
    document.dispatchEvent(loginEvent);
  });

  return component;
}

export default login;
