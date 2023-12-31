import createComponent from "../../utils/createComponent";
import registerCall from "../../functions/api/register";
import { registeredEvent, routeChangedEvent } from "../../customEvents";

function register() {
  const html = `<div class="container mx-auto p-4">
    <h2 class="text-3xl font-bold mb-4">Register</h1>
    <p>Register to get access to bidding and adding listings. If you already have an account, please <a href="/login" id="loginLink" class="visited:text-blue-500">login</a></p>
    <p id="validationMessage" class="hidden bg-red-100 text-red-700 p-4 mt-4 rounded"></p>
    <form class="flex flex-col gap-4 mt-6 md:w-2/3 lg:w-1/2 bg-gray-100 rounded-lg p-4">
        <div class="flex flex-col">
            <label for="name">Username</label>
            <input id="name" name="name" type="text" autocomplete="nickname" maxlength="20" class="border border-gray-300 p-2 rounded-lg">
            <span id="nameValidationMessage" class="mt-2 text-xs text-red-700"></span>
        </div>        
        <div class="flex flex-col">
            <label for="email">Email</label>
            <input id="email" name="email" type="email" autocomplete="new-username" class="border border-gray-300 p-2 rounded-lg">
            <span id="emailValidationMessage" class="mt-2 text-xs text-red-700"></span>
        </div>        
        <div class="flex flex-col">
            <label for="password">Password</label>
            <input id="password" name="password" type="password" autocomplete="new-password" class="border border-gray-300 p-2 rounded-lg">
            <span id="passwordValidationMessage" class="mt-2 text-xs text-red-700"></span>
        </div>        
        <div class="flex flex-col">
            <label for="password">Confirm password</label>
            <input id="confirmPassword" name="confirmPassword" type="password" autocomplete="new-password" class="border border-gray-300 p-2 rounded-lg">
            <span id="passwordConfirmValidationMessage" class="mt-2 text-xs text-red-700"></span>
        </div>        
        <div class="flex flex-col">
            <label for="email">Avatar</label>
            <input id="avatar" name="avatar" type="url" class="border border-gray-300 p-2 rounded-lg">
        </div>
        <button type="submit" class="bg-deep-blue-500 hover:bg-deep-blue-400 text-white rounded-lg p-2 mt-4">Register</button>
        
    </form>
    </div>`;

  const component = createComponent(html);

  const form = component.querySelector("form");
  form.addEventListener("submit", handleSubmit);

  const loginLink = component.querySelector("#loginLink");
  loginLink.addEventListener("click", handleLoginClick);

  return component;
}

function handleSubmit(event) {
  event.preventDefault();

  const form = event.target;

  if (!validate(form)) {
    const validationMessage = document.querySelector("#validationMessage");
    validationMessage.textContent = "Please fix the validation errors below.";
    validationMessage.classList.remove("hidden");
    throw new Error("Validation failed.");
  }

  const formData = new FormData(form);
  formData.delete("confirmPassword");
  const data = Object.fromEntries(formData.entries());
  registerCall(data)
    .then((result) => {
      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      document.dispatchEvent(registeredEvent());
    })
    .catch((error) => {
      const validationMessage = document.querySelector("#validationMessage");
      validationMessage.textContent = `Could not register your account: ${error}`;
      validationMessage.classList.remove("hidden");
    });
}

function handleLoginClick(event) {
  event.preventDefault();
  document.dispatchEvent(routeChangedEvent("login"));
}

function validateName(form, name) {
  const nameValidationMessage = form.querySelector("#nameValidationMessage");
  let nameRegex = /^[A-Za-z0-9_]+$/;
  if (!nameRegex.test(name)) {
    nameValidationMessage.textContent =
      "Username can only contain letters, numbers and underscores.";
    return false;
  } else {
    nameValidationMessage.textContent = "";
    return true;
  }
}

function validateEmail(form, email) {
  const emailValidationMessage = form.querySelector("#emailValidationMessage");
  let emailRegex = /^[A-Za-z0-9._%+-]{2,}@(stud\.noroff\.no)$/;
  if (!emailRegex.test(email)) {
    emailValidationMessage.textContent =
      "Email is not a valid stud.noroff.no e-mail address.";
    return false;
  } else {
    emailValidationMessage.textContent = "";
    return true;
  }
}

function validatePassword(form, password) {
  const passwordValidationMessage = form.querySelector(
    "#passwordValidationMessage",
  );
  if (password.length < 8) {
    passwordValidationMessage.textContent =
      "Password must be at least 8 characters long.";
    return false;
  } else {
    passwordValidationMessage.textContent = "";
    return true;
  }
}

function validatePasswordConfirm(form, password, confirmPassword) {
  const passwordConfirmValidationMessage = form.querySelector(
    "#passwordConfirmValidationMessage",
  );
  if (password !== confirmPassword) {
    passwordConfirmValidationMessage.textContent =
      "Password and confirmed password do not match.";
    return false;
  } else {
    passwordConfirmValidationMessage.textContent = "";
    return true;
  }
}

function validate(form) {
  let returnVal = true;

  const formData = new FormData(form);

  if (validateName(form, formData.get("name")) === false) {
    returnVal = false;
  }

  if (validateEmail(form, formData.get("email")) === false) {
    returnVal = false;
  }

  if (validatePassword(form, formData.get("password")) === false) {
    returnVal = false;
  }

  if (
    validatePasswordConfirm(
      form,
      formData.get("password"),
      formData.get("confirmPassword"),
    ) === false
  ) {
    returnVal = false;
  }

  return returnVal;
}

export default register;
