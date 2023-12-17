import createComponent from "../../utils/createComponent";
import listingsItem from "./listingsItem";
import listings from "../../functions/api/listings";

function listingsIndex(searchQuery = "") {
  const html = `
<div class="mb-4 flex gap-2 items-center"> 
  <div>
    <input class="hidden peer" type="radio" id="sortEnding" name="sortOrder" value="ending" checked>
    <label for="sortEnding" class="text-xs uppercase font-bold tracking-wider ml-2 p-2 outline outline-white peer-checked:outline-blue-200 peer-checked:text-blue-900 hover:text-blue-900 rounded cursor-pointer">Ending soon</label>    
  </div>
  <div>
    <input class="hidden peer" type="radio" id="sortNew" name="sortOrder" value="newlyCreated">
    <label for="sortNew" class="text-xs uppercase font-bold tracking-wider ml-2 p-2 outline outline-white peer-checked:outline-blue-200 peer-checked:text-blue-900 hover:text-blue-900 rounded cursor-pointer">Newly listed</label>    
  </div>
</div>
<div id="listings" class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
  <div class="m-auto md-col-span-2 lg:col-span-3 mt-12">
    <p class="font-bold uppercase text-sm tracking-wider text-gray-700">Loading listings...</p>
  </div>
</div>
`;
  const component = createComponent(html);

  const options = {
    sort: "endsAt",
    sortOrder: "asc",
    _bids: "true",
    _seller: "true",
    _active: "true",
    limit: 100,
    offset: 0,
  };

  const sortEnding = component.querySelector("#sortEnding");
  const sortNew = component.querySelector("#sortNew");

  sortEnding.addEventListener("change", () => {
    options.sort = "endsAt";
    options.sortOrder = "asc";
    loadListings(options, component, searchQuery);
  });

  sortNew.addEventListener("change", () => {
    options.sort = "created";
    options.sortOrder = "desc";
    loadListings(options, component, searchQuery);
  });

  loadListings(options, component, searchQuery);

  return component;
}

function loadListings(options, component, searchQuery = "") {
  const listingsContainer = component.querySelector("#listings");
  fetchAllListings(options).then((data) => {
    listingsContainer.innerHTML = "";
    const searchQueryLower = searchQuery.toLowerCase();

    const filteredData = data.filter((item) => {
      const titleLower = item.title ? item.title.toLowerCase() : "";
      const descriptionLower = item.description
        ? item.description.toLowerCase()
        : "";

      return (
        titleLower.includes(searchQueryLower) ||
        descriptionLower.includes(searchQueryLower)
      );
    });

    const items = filteredData.map((listing) => {
      return listingsItem(listing);
    });

    listingsContainer.append(...items);
  });
}

async function fetchAllListings(options, isSearch = false) {
  let allListings = [];
  let offset = 0;

  if (isSearch) {
    let hasMore = true;

    while (hasMore) {
      const response = await listings({ ...options, offset });
      allListings.push(...response);

      if (response.length < options.limit) {
        hasMore = false;
      }

      hasMore = false;

      offset += options.limit;
    }
  } else {
    const response = await listings({ ...options, offset });
    allListings = allListings.concat(response);
  }

  return allListings;
}

export default listingsIndex;
