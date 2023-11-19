import createComponent from "../../utils/createComponent";

function listingItem(listing) {
  const html = `
  <div class="relative flex max-[375px]:flex-col rounded-xl">
        <img id="image" alt="Macbook" class="rounded-xl">            
        <div class="min-[375px]:absolute grid grid-flow-col gap-4 justify-between items-center bottom-3 min-[375px]:left-3 min-[375px]:right-3 min-[375px]:mx-auto max-[375px]:text-sm bg-gray-100 bg-opacity-70 rounded-lg p-4">
            <div>
                <h2 id="title" class="font-bold tracking-wide"></h2>
                <p id="description" class="tracking-wide"></p>
                <p class="mt-3 font-bold">Highest bid: <span id="highestBid"></span></p>
            </div>   
            <button class="bg-white rounded p-4 text-blue-950 uppercase text-xs leading-none font-bold tracking-wider hover:bg-slate-100 hover:shadow-md hover:scale-110 transition-transform">View Item</button>               
        </div>          
    </div>    
  `;

  const component = createComponent(html);

  const title = component.querySelector("#title");
  const description = component.querySelector("#description");
  const highestBid = component.querySelector("#highestBid");
  const image = component.querySelector("#image");

  title.textContent = listing.title;
  description.textContent = listing.description;
  highestBid.textContent = listing.highestBid;
  image.src = listing.image;

  return component;
}

export default listingItem;
