import createComponent from "../../utils/createComponent";
import registerCall from "../../functions/api/register";

function register() {
  const html = `<div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Register</h1>
    <p>Register to get access to bidding and adding listings. If you already have an account, please <a href="/login" id="loginLink" class="visited:text-blue-500">login</a></p>
    <p id="validationMessage" class="text-red-700"></p>
    <form class="flex flex-col gap-4 mt-6 md:w-2/3 lg:w-1/2 bg-gray-100 rounded-lg p-4">
        <div class="flex flex-col">
            <label for="name">Username</label>
            <input id="name" name="name" type="text" class="border border-gray-300 p-2 rounded-lg">
            <span id="nameValidationMessage" class="mt-2 text-xs text-red-700"></span>
        </div>        
        <div class="flex flex-col">
            <label for="email">Email</label>
            <input id="email" name="email" type="text" class="border border-gray-300 p-2 rounded-lg">
            <span id="emailValidationMessage" class="mt-2 text-xs text-red-700"></span>
        </div>        
        <div class="flex flex-col">
            <label for="password">Password</label>
            <input id="password" name="password" type="password" class="border border-gray-300 p-2 rounded-lg">
            <span id="passwordValidationMessage" class="mt-2 text-xs text-red-700"></span>
        </div>        
        <div class="flex flex-col">
            <label for="password">Confirm password</label>
            <input id="confirmPassword" name="confirmPassword" type="password" class="border border-gray-300 p-2 rounded-lg">
            <span id="passwordConfirmValidationMessage" class="mt-2 text-xs text-red-700"></span>
        </div>        
        <div class="flex flex-col">
            <label for="email">Avatar</label>
            <input id="avatar" name="avatar" type="url" class="border border-gray-300 p-2 rounded-lg">
        </div>
        <button type="submit" class="bg-blue-500 text-white rounded-lg p-2 mt-4">Register</button>
        
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

  const registeredEvent = new CustomEvent("registered", {
    bubbles: true,
    detail: {},
  });

  const form = event.target;

  if (!validate(form)) {
    const validationMessage = document.querySelector("#validationMessage");
    validationMessage.textContent = "Please fix the validation errors below.";
    return;
  }

  const formData = new FormData(form);
  formData.delete("confirmPassword");
  registerCall({ ...Object.fromEntries(formData.entries()) }).then((result) => {
    if (result.errors) {
      const validationMessage = document.querySelector("#validationMessage");
      validationMessage.textContent = result.errors[0].message;
      return;
    }

    document.dispatchEvent(registeredEvent);
  });
}

function handleLoginClick(event) {
  event.preventDefault();
  window.history.pushState({}, null, "/login");
  const routeChangedEvent = new CustomEvent("routeChanged", {
    bubbles: true,
    detail: {
      route: "login",
    },
  });
  document.dispatchEvent(routeChangedEvent);
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
  let emailRegex = /^[A-Za-z0-9._%+-]{2,}@(noroff\.no|stud\.noroff\.no)$/;
  if (!emailRegex.test(email)) {
    emailValidationMessage.textContent =
      "Email is not a valid noroff.no or stud.noroff.no e-mail address.";
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
