import createComponent from "../../utils/createComponent";
import profile from "../../functions/api/profile";
import listingsForProfile from "../../functions/api/listingsForProfile";
import listingsItem from "../listings/listingsItem";
import updateAvatar from "../../functions/api/updateAvatar";
import getAuth from "../../functions/auth/getAuth";
import storeAuth from "../../functions/auth/storeAuth";
import { routeChangedEvent } from "../../customEvents";

function viewProfile(name) {
  const html = `
<div class="flex flex-col items-center">
    <div class="flex flex-col items-center justify-center w-full border-b-2">           
        <img id="avatar" class="mt-5 object-cover object-center h-24 w-24 rounded-full" src="">
        <button id="editAvatarButton" class="hidden mt-2 bg-slate-50 border border-slate-200 px-1 py-2 uppercase text-xs">
        Edit avatar
        </button>    
        <form id="editAvatarForm" class="hidden">
            <input id="avatarUrl" type="url" class="border rounded-lg p-2">
            <input type="submit" value="Submit" class="bg-[#1D3461] text-white uppercase font-bold tracking-wider text-sm rounded-lg p-2 mt-8">
        </form>    
        <h1 id="title" class=" mt-10 text-3xl uppercase font-bold">${name}</h1>
        <h2 id="subtitle" class="my-5 text-xs uppercase font-bold"></h2>        
    </div>
    <div id="listingsForProfileContainer" class="my-5 w-full grid gap-4 md:grid-cols-2 lg:grid-cols-3"></div>    
</div>`;
  const component = createComponent(html);

  const editAvatarButton = component.querySelector("#editAvatarButton");
  const editAvatarForm = component.querySelector("#editAvatarForm");
  const avatarUrl = component.querySelector("#avatarUrl");
  const avatarImage = component.querySelector("#avatar");

  const loggedInProfile = getAuth();

  if (!loggedInProfile) {
    const loginAlertComponent = createComponent(
      `<div><p>You need to be logged in to view profiles. <a href="#" id="loginLink" class="text-blue-900">Log in</p></div>`,
    );
    const loginLink = loginAlertComponent.querySelector("#loginLink");
    loginLink.addEventListener("click", () => {
      document.dispatchEvent(routeChangedEvent("login"));
    });
    return loginAlertComponent;
  }

  if (loggedInProfile && loggedInProfile.name === name) {
    editAvatarButton.classList.remove("hidden");
  }

  editAvatarButton.addEventListener("click", (event) => {
    event.preventDefault();
    editAvatarForm.classList.toggle("hidden");
  });
  editAvatarForm.addEventListener("submit", (event) => {
    event.preventDefault();
    updateAvatar(name, avatarUrl.value).then((data) => {
      const profileData = getAuth();
      profileData.avatar = data.avatar;
      storeAuth(profileData);
      avatarImage.src = data.avatar;
      editAvatarForm.classList.toggle("hidden");
    });
  });

  profile(name).then((data) => {
    const titleElement = component.querySelector("#title");
    const subtitleElement = component.querySelector("#subtitle");
    avatarImage.src = data.avatar;
    titleElement.textContent = data.name;
    subtitleElement.textContent = `Selling ${data._count.listings} items`;
  });

  listingsForProfile(name, { _bids: true }).then((listings) => {
    const items = listings.map((listing) => listingsItem(listing));
    const container = component.querySelector("#listingsForProfileContainer");
    container.append(...items);
  });

  return component;
}

export default viewProfile;
