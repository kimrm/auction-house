import createComponent from "../../utils/createComponent";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import lazyLoadImage from "../../utils/loadImage";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

function listingItem(listing, wins = []) {
  const html = `
  <div id="container" class="relative flex max-[350px]:flex-col rounded-xl min-[350px]:h-96 bg-slate-200 border border-gray-100 p-2">
  <span id="winIndicator" class="absolute right-4 top-4 hidden bg-yellow-500 text-slate-900 px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase">BID WINNER</span>
    <img id="image" alt="" class="hidden rounded-xl object-cover mx-auto">            
        <div id="glassPanel" class="min-[350px]:absolute grid gap-3 items-center bottom-0 min-[375px]:left-0 min-[375px]:right-0 min-[375px]:mx-auto max-[375px]:text-sm bg-gray-100 bg-opacity-50 backdrop-blur-lg rounded-lg p-4 transition-all">
          <div class="overflow-hidden">
            <h2 id="title" title="" class="font-bold tracking-wider uppercase text-xs pb-1 text-gray-800 max-w-lg truncate cursor-help"></h2>  
            <p id="description" class="text-gray-950 truncate cursor-help" title="Lorem ipsum">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam.</p>                              
            <div class="my-2 flex justify-between border-t border-slate-500 py-2">
              <div>
                <span class="uppercase text-xs tracking-wider text-gray-800">Highest bid:</span> 
                <span id="bids" class="font-bold"></span>
              </div>
              <div>
                <span class="uppercase text-xs tracking-wider text-gray-800">Ends in:</span>
                <span id="endsAt" class=" font-bold"></span> 
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
  const endsAtElement = component.querySelector("#endsAt");

  const win = wins.find((win) => win === listing.id);
  if (win) {
    const winIndicator = component.querySelector("#winIndicator");
    winIndicator.classList.remove("hidden");
  }

  const highestBid = listing.bids.reduce(
    (prev, current) => {
      return prev.amount > current.amount ? prev : current;
    },
    { amount: 0 },
  );

  title.textContent = listing.title;
  title.title = listing.title;
  description.textContent = listing.description;
  description.title = listing.description;

  lazyLoadImage(listing.media[0])
    .then((src) => {
      image.src = src;
      image.classList.remove("hidden");
    })
    .catch(() => {
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
  image.alt = listing.title;
  bids.textContent = highestBid.amount;

  const endsAt = dayjs.tz(listing.endsAt, "Europe/Oslo");
  const dateNow = new Date();
  const startsAt = dayjs.tz(dateNow, "Europe/Oslo");

  const timer = renderTimer(startsAt, endsAt);

  if (timer.endsInDays > 0) {
    endsAtElement.textContent = `${timer.endsInDays} days`;
  } else if (timer.overflowingHours > 0) {
    endsAtElement.textContent = `${timer.overflowingHours} hours`;
  } else if (timer.overflowingMinutes > 0) {
    let intervalId = setInterval(() => {
      endsAtElement.classList.add("text-red-700");
      const endsAt = dayjs.tz(listing.endsAt, "Europe/Oslo");
      const dateNow = new Date();
      const startsAt = dayjs.tz(dateNow, "Europe/Oslo");
      const timer = renderTimer(startsAt, endsAt);
      endsAtElement.textContent = `${timer.overflowingMinutes}m ${timer.overflowingSeconds}s`;
      if (timer.overflowingMinutes == 0 && timer.overflowingSeconds == 0) {
        clearInterval(intervalId);
        endsAtElement.classList.add("text-red-950");
        endsAtElement.textContent = "Ended";
      }
    }, 1000);
  } else if (timer.overflowingSeconds > 0) {
    let intervalId = setInterval(() => {
      endsAtElement.classList.add("text-red-700");
      const endsAt = dayjs.tz(listing.endsAt, "Europe/Oslo");
      const dateNow = new Date();
      const startsAt = dayjs.tz(dateNow, "Europe/Oslo");
      const timer = renderTimer(startsAt, endsAt);
      endsAtElement.textContent = `${timer.overflowingSeconds}s`;
      if (timer.overflowingSeconds === 0) {
        clearInterval(intervalId);
        endsAtElement.classList.add("text-red-950");
        endsAtElement.textContent = "Ended";
      }
    }, 1000);
  } else {
    endsAtElement.classList.add("text-red-950");
    endsAtElement.textContent = "Ended";
  }

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

function renderTimer(startsAt, endsAt) {
  const endsInDays = endsAt.diff(startsAt, "day");
  const endsInHours = endsAt.diff(startsAt, "hour");
  const endsInMinutes = endsAt.diff(startsAt, "minute");
  const endsInSeconds = endsAt.diff(startsAt, "second");

  let overflowingHours = endsInHours - endsInDays * 24;
  let overflowingMinutes = endsInMinutes - endsInHours * 60;
  let overflowingSeconds = endsInSeconds - endsInMinutes * 60;

  return {
    endsInDays,
    overflowingHours,
    overflowingMinutes,
    overflowingSeconds,
  };
}

export default listingItem;
