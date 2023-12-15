import createComponent from "../../utils/createComponent";
import listingsItem from "./listingsItem";
import listings from "../../functions/api/listings";

function listingsIndex(searchQuery = "") {
  const html = `
<div class="mb-4 flex gap-2 items-center"> 
  <div>
    <label for="sortEnding" class="text-xs uppercase font-bold tracking-wider ml-2">Ending soon</label>
    <input type="radio" id="sortEnding" name="sortOrder" value="ending" checked>
  </div>
  <div>
    <label for="sortNew" class="text-xs uppercase font-bold tracking-wider ml-2">Newly listed</label>
    <input type="radio" id="sortNew" name="sortOrder" value="newlyCreated">
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
    limit: 20,
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
    const searchQueryLower = searchQuery.toLowerCase(); // Convert search query to lowercase

    const filteredData = data.filter((item) => {
      const titleLower = item.title ? item.title.toLowerCase() : ""; // Handle undefined and convert to lowercase
      const descriptionLower = item.description
        ? item.description.toLowerCase()
        : ""; // Handle undefined and convert to lowercase

      return (
        titleLower.includes(searchQueryLower) ||
        descriptionLower.includes(searchQueryLower)
      );
    });

    const items = filteredData.map((listing) => {
      return listingsItem(listing);
    });

    listingsContainer.append(...items);

    console.log("Data: ", filteredData);
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
