import createComponent from "../../utils/createComponent";
import createListing from "../../functions/api/createListing";
import formMaximize from "./formMaximize";
import formMinimize from "./formMinimize";
import listingsForProfile from "../../functions/api/listingsForProfile";
import listingsItem from "./listingsItem";
import getAuth from "../../functions/auth/getAuth";

function listingsForm() {
  const component = createComponent(`
    <div class="container mx-auto my-4 pb-14 relative">
        <div id="listingsFormContainer">
            <div id="minimizeMaximizeContainer"></div>
            <form id="listingsForm" class="flex-col gap-4 hidden">    
                <div class="flex flex-col gap-2">
                    <label for="title" class="text-sm uppercase font-bold tracking-wider">Title</label>
                    <input id="title" name="title" type="text" class="rounded-lg border border-gray-300 p-2 text-gray-600 text-sm font-bold">
                </div>
                <div class="flex flex-col gap-2">
                    <label for="description" class="text-sm uppercase font-bold tracking-wider">Description</label>
                    <textarea id="description" name="description" type="text" class="rounded-lg border border-gray-300 p-2 text-gray-600 text-sm font-bold"></textarea>
                </div>
                <div class="flex flex-col gap-2">
                    <label for="datetime" class="text-sm uppercase font-bold tracking-wider">When will the auction end</label>
                    <input id="datetime" name="endsAt" type="datetime-local" class="rounded-lg border border-gray-300 p-2 text-gray-600 text-sm font-bold">
                </div>
                <div id="mediaInputContainer" class="flex flex-col gap-2">
                    <label for="media" class="text-sm uppercase font-bold tracking-wider">Image</label>
                    <input name="media" placeholder="https://" type="url" class="rounded-lg border border-gray-300 p-2 text-gray-600 text-sm font-bold">
                </div>
                <div class="flex flex-col gap-2 justify-start">
                    <button id="addMoreImagesButton" class="w-48 border bg-[#353841] text-gray-100 uppercase text-sm font-bold p-1 rounded-lg">Add more Images</button>
                </div>
                <input type="submit" value="Submit" class="bg-[#1D3461] text-white uppercase font-bold tracking-wider text-sm rounded-lg p-2 mt-8">
            </form>
        </div>
        <div class="my-10">
            <h2 class="text-lg uppercase font-bold tracking-wider mb-4">My listings</h2>
            <div id="listingsForProfileContainer" class="grid gap-4 md:grid-cols-2 lg:grid-cols-3"></div>
        </div>        
        
    </div>
    `);

  const profile = getAuth();

  listingsForProfile(profile.name, { _bids: true }).then((listings) => {
    const items = listings.map((listing) => listingsItem(listing));
    const container = component.querySelector("#listingsForProfileContainer");
    container.append(...items);
  });

  const maximizeButton = formMaximize();
  const minimizeButton = formMinimize();

  const minimizeMaximizeContainer = component.querySelector(
    "#minimizeMaximizeContainer",
  );
  minimizeMaximizeContainer.append(maximizeButton);

  minimizeButton.addEventListener("click", () => {
    console.log("minimize");
    minimizeMaximizeContainer.innerHTML = "";
    minimizeMaximizeContainer.append(maximizeButton);
    form.classList.add("hidden");
  });

  maximizeButton.addEventListener("click", () => {
    console.log("maximize");
    minimizeMaximizeContainer.innerHTML = "";
    minimizeMaximizeContainer.append(minimizeButton);
    form.classList.remove("hidden");
  });

  const datetimePicker = component.querySelector("#datetime");
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const datetime = `${year}-${month}-${day}T${hours}:${minutes}`;
  datetimePicker.value = datetime;

  const form = component.querySelector("#listingsForm");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const mediaInput = component.querySelectorAll("input[name='media']");
    data.media = [...mediaInput]
      .map((input) => (input.value ? input.value : false))
      .filter((value) => value);
    createListing(data).then((response) => {
      document.dispatchEvent(
        new CustomEvent("routeChanged", {
          bubbles: true,
          detail: {
            route: `listing/${response.id}`,
          },
        }),
      );
    });
  });

  const addMoreImagesButton = component.querySelector("#addMoreImagesButton");
  addMoreImagesButton.addEventListener("click", (event) => {
    event.preventDefault();
    const input = document.createElement("input");
    input.type = "url";
    input.name = "media";
    input.placeholder = "https://";
    input.classList.add(
      "rounded-lg",
      "border",
      "border-gray-300",
      "p-2",
      "text-gray-600",
      "text-sm",
      "font-bold",
    );
    component.querySelector("#mediaInputContainer").append(input);
  });

  return component;
}

export default listingsForm;
