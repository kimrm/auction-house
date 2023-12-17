import createComponent from "../../utils/createComponent";
import authenticate from "../../functions/auth/authenticate";
import { loggedInEvent, routeChangedEvent } from "../../customEvents";

function login() {
  const html = `
    <div id="container" class="container mx-auto p-4">
        <h2 class="text-3xl font-bold mb-4">Login</h1>
        <p>To get access to bidding and adding listings you need to login. If you don't have an account yet, please <a id="registerLink" href="/register" class=" visited:text-blue-500">register</a></p>
        <div id="validationMessage" class="text-red-700 my-3 p-4 bg-red-100 rounded-lg md:w-2/3 lg:w-1/2 hidden"></div>
        ${
          new URLSearchParams(window.location.search).get("registered") ===
          "true"
            ? `<div class="bg-green-200 text-green-900 p-4 rounded-lg mt-4 md:w-2/3 lg:w-1/2"><p class="font-bold">You have successfully registered. Please login.</p></div>`
            : ""
        }

        <form class="flex flex-col gap-4 mt-6 md:w-2/3 lg:w-1/2 bg-gray-100 rounded-lg p-4">
          <div class="flex flex-col">
            <label for="email">Email</label>
            <input id="email" name="email" type="email" autocomplete="username" class="border border-gray-300 p-2 rounded-lg">
          </div>
          <div class="flex flex-col">
            <label for="password">Password</label>
            <input id="password" name="password" type="password" autocomplete="current-password" class="border border-gray-300 p-2 rounded-lg">
          </div>            
          <button type="submit" class="bg-deep-blue-500 hover:bg-deep-blue-400 text-white rounded-lg p-2">Login</button>
        </form>
    </div>
    `;

  const component = createComponent(html);

  const container = component.querySelector("#container");

  const registerLink = component.querySelector("#registerLink");
  registerLink.addEventListener("click", (event) => {
    event.preventDefault();
    document.dispatchEvent(routeChangedEvent("register"));
  });

  const form = component.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const validationMessage = container.querySelector("#validationMessage");
    validationMessage.classList.add("hidden");

    const form = event.target;
    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries());

    authenticate(data).then((auth) => {
      if (auth.errors) {
        validationMessage.classList.remove("hidden");
        validationMessage.innerHTML = `<p class="font-bold">Could not log you in:</p>`;
        validationMessage.innerHTML += auth.errors
          .map((error) => `<p>${error.message}</p>`)
          .join("");
        return;
      }

      document.dispatchEvent(loggedInEvent(auth));
      document.dispatchEvent(routeChangedEvent("listings"));
    });
  });

  return component;
}

export default login;
