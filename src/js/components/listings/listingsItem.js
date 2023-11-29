import createComponent from "../../utils/createComponent";

function listingItem(listing) {
  const html = `
  <div id="container" class="relative flex max-[350px]:flex-col rounded-xl min-[350px]:h-96 bg-slate-200 border border-gray-100 p-2">
        <img id="image" alt="" class="rounded-xl object-cover mx-auto">            
        <div id="glassPanel" class="min-[350px]:absolute grid gap-3 items-center bottom-0 min-[375px]:left-0 min-[375px]:right-0 min-[375px]:mx-auto max-[375px]:text-sm bg-gray-100 bg-opacity-50 backdrop-blur-lg rounded-lg p-4 transition-all">
          <div class="overflow-hidden">
            <h2 id="title" title="" class="font-bold tracking-wider uppercase text-xs pb-1 text-gray-800 max-w-lg truncate cursor-help"></h2>  
            <p id="description" class="text-gray-950 truncate cursor-help" title="Lorem ipsum">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam.</p>                              
            <div class="my-2 flex justify-between border-t border-slate-500 py-2">
              <div>
                <span class="uppercase text-xs tracking-wider text-gray-800">BIDS:</span> 
                <span id="bids" class="font-bold"></span>
              </div>
              <div>
                <span class="uppercase text-xs tracking-wider text-gray-800">TIME LEFT:</span>
                <span class=" font-bold">1d 2h 3m</span> 
              </div>
            </div>
          </div>            
          <div>
            <button id="viewListingButton" class="bg-white w-full rounded p-4 text-blue-950 uppercase text-xs leading-none font-bold tracking-wider hover:bg-slate-100 hover:shadow-md hover:scale-110 transition-transform">View Item</button>               
          </div>
        </div>                        
    </div>    
  `;

  const component = createComponent(html);

  const container = component.querySelector("#container");
  const title = component.querySelector("#title");
  const description = component.querySelector("#description");
  const bids = component.querySelector("#bids");
  const image = component.querySelector("#image");

  title.textContent = listing.title;
  title.title = listing.title;
  description.textContent = listing.description;
  description.title = listing.description;
  image.addEventListener("error", () => {
    container.removeChild(image);
    const noImage = document.createElement("div");
    noImage.classList.add(
      "bg-gray-900",
      "bg-opacity-50",
      "backdrop-blur-lg",
      "rounded-lg",
      "p-4",
      "flex",
      "justify-center",
      "items-start",
      "text-gray-600",
      "text-xs",
      "font-bold",
      "uppercase",
      "w-full",
    );
    noImage.textContent = "No Image";
    container.prepend(noImage);
  });
  image.src = listing.media[0];
  image.alt = listing.title;
  bids.textContent = listing._count.bids === 0 ? "0" : listing._count.bids;

  const viewListingButton = component.querySelector("#viewListingButton");
  viewListingButton.addEventListener("click", () => {
    document.dispatchEvent(
      new CustomEvent("routeChanged", {
        bubbles: true,
        detail: {
          route: `listing/${listing.id}`,
        },
      }),
    );
  });

  return component;
}

export default listingItem;
