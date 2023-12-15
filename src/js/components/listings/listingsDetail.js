import createComponent from "../../utils/createComponent";
import listingsDetailCall from "../../functions/api/listingsDetail";
import placeBid from "../../functions/api/placeBid";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { detailsModalClosedEvent } from "../../customEvents";
import { routeChangedEvent } from "../../customEvents";
import imageThumbnail from "./imageThumbnail";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

function listingsDetail(id) {
  const html = `
<div id="listingsDetail" class="grid md:grid-cols-5 gap-4 text-black">  
    <div class="absolute top-1 right-1 px-4 py-2 bg-slate-50 rounded-full border border-slate-200">
        <button id="closeButton" class="text-3xl">&times;</button>  
    </div>
    <div class="md:col-span-3 bg-gray-100 rounded-lg p-4">
        <img id="image" class="rounded-xl object-cover mx-auto h-96" src="">        
        <div id="imageThumbnails" class="flex flex-row justify-center flex-wrap gap-2 mt-2"></div>
    </div>
    <div class="md:col-span-2 p-2">
    <div class="mb-5">
    
    <h2 id="title" class="text-3xl capitalize font-bold mb-3 break-word overflow-clip text-ellipsis"></h2>
            <h3 class="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">Auction ends in</h3>
            <div class="flex gap-1" id="timerContainer">
                <div id="daysDisplay" class="grid grid-rows-2 bg-slate-100 bg-gradient-to-t from-slate-300 to-slate-50 rounded w-16 p-1 border border-slate-300">
                    <div class="text-xs text-center uppercase tracking-wider font-bold text-slate-500 mb-1 border-b border-slate-300">Days</div>
                    <div id="endsInDays" class="text-center text-lg text-slate-500 animate-in slide-in-from-bottom">-</div>
                </div>
                <div id="hoursDisplay" class="grid grid-rows-2 bg-slate-100 bg-gradient-to-t from-slate-300 to-slate-50 rounded w-16 p-1 border border-slate-300">
                    <div class="text-xs text-center uppercase tracking-wider font-bold text-slate-500 mb-1 border-b border-slate-300">hrs.</div>
                    <div id="endsInHours" class="text-center text-lg text-slate-600 animate-in slide-in-from-bottom">-</div>
                </div>          
                <div id="minutesDisplay" class="grid grid-rows-2 bg-slate-100 bg-gradient-to-t from-slate-300 to-slate-50 rounded w-16 p-1 border border-slate-300 overflow-hidden">
                    <div class="text-xs text-center uppercase tracking-wider font-bold text-slate-500 mb-1 border-b border-slate-300">Min.</div>
                    <div id="endsInMinutes" class="text-center text-lg text-slate-700 animate-in slide-in-from-bottom">-</div>
                </div>  
                <div id="secondsDisplay" class="grid grid-rows-2 bg-slate-100 bg-gradient-to-t from-slate-300 to-slate-50 rounded w-16 p-1 border border-slate-300 overflow-hidden">
                    <div class="text-xs text-center uppercase tracking-wider font-bold text-slate-500 mb-1 border-b border-slate-300">Sec.</div>
                    <div id="endsInSeconds" class="text-center text-lg text-slate-800 animate-in slide-in-from-bottom">-</div>
                </div>                
            </div>
        </div>        
        <p id="description" class="mb-5 break-word overflow-clip text-ellipsis"></p>

        <div class="mb-5">
            <h3 class="text-sm font-bold mb-3 uppercase tracking-wider text-slate-500">Highest bid</h3>
            <div class="flex gap-2">
              <div id="bids" class="font-bold"></div>
              <button type="button" id="bidHistoryButton" class="hidden text-blue-900">View bids history</button>
            </div>
            <div id="bidHistoryContainer" class="hidden flex-col gap-2 mt-2">

            </div>
        </div>
        
        <form id="bidForm" class="mb-5 flex flex-col gap-2">
          <div class="flex flex-row justify-between gap-2 border-2 border-[#1D3461] rounded-lg">
            <input id="bidInput" name="bid" type="number" class="border-0 p-2 text-gray-950 bg-gray-100 text-sm font-bold w-24 outline-none m-1">
            <input type="submit" value="Place Bid" class="bg-[#1D3461] text-white uppercase font-bold tracking-wider text-xs border outline-none rounded p-2 mx-auto w-full">
          </div>
          <p id="errorMessage" class="text-red-500"></p>
        </form>
        
        <div class="mt-5 ">
        <h3 class="text-sm font-bold mb-3 uppercase tracking-wider text-slate-500">Sold by</h3>
        <button id="seller" class="text-blue-900"></button>
        </div>
        
    </div>  
</div>`;
  const component = createComponent(html);

  const title = component.querySelector("#title");
  const description = component.querySelector("#description");
  const image = component.querySelector("#image");
  const bids = component.querySelector("#bids");
  const seller = component.querySelector("#seller");
  const closeButton = component.querySelector("#closeButton");
  const timerContainer = component.querySelector("#timerContainer");
  const imageThumbnailsContainer = component.querySelector("#imageThumbnails");
  const bidHistoryButton = component.querySelector("#bidHistoryButton");
  const bidHistoryContainer = component.querySelector("#bidHistoryContainer");

  bidHistoryButton.addEventListener("click", (event) => {
    event.preventDefault();
    bidHistoryContainer.classList.toggle("hidden");
  });

  closeButton.addEventListener("click", () => {
    document.dispatchEvent(detailsModalClosedEvent());
  });

  const bidForm = component.querySelector("#bidForm");
  bidForm.addEventListener("submit", (event) => {
    const errorMessage = component.querySelector("#errorMessage");
    errorMessage.textContent = "";
    event.preventDefault();
    const bidInput = component.querySelector("#bidInput");
    const bid = parseInt(bidInput.value);
    placeBid(id, { amount: bid })
      .then((data) => {
        const highestBid = data.bids.reduce((prev, current) => {
          return prev.amount > current.amount ? prev : current;
        }, 0);
        bidInput.value = highestBid.amount + 1;
        bidInput.min = highestBid.amount + 1;
        bids.textContent = `${highestBid.amount} by ${highestBid.bidderName}`;
      })
      .catch(() => {
        getListingData(id).then((data) => {
          const highestBid = data.bids.reduce((prev, current) => {
            return prev.amount > current.amount ? prev : current;
          }, 0);
          bidInput.value = highestBid.amount + 1;
          bidInput.min = highestBid.amount + 1;
          bids.textContent = `${highestBid.amount} by ${highestBid.bidderName}`;
          const errorMessage = component.querySelector("#errorMessage");
          errorMessage.textContent =
            "Woops! Could not place your bid. Please try a higher amount.";
        });
      });
  });

  listingsDetailCall(id, { _seller: true, _bids: true }).then((data) => {
    console.log("listingdetail: ", data);

    image.src = data.media[0];

    const imageThumbnails = data.media.map((media) => {
      return imageThumbnail(media);
    });

    imageThumbnailsContainer.append(...imageThumbnails);

    title.textContent = data.title;
    description.textContent = data.description;
    seller.textContent = data.seller.name;

    const buttonSeller = component.querySelector("#seller");

    buttonSeller.addEventListener("click", () => {
      document.dispatchEvent(
        routeChangedEvent(`profile/${data.seller.name}`, {}),
      );
    });

    const bidHistorySorted = data.bids.sort((a, b) => {
      return new Date(b.created) - new Date(a.created);
    });

    const bidHistory = bidHistorySorted.map((bid) => {
      const liElement = document.createElement("li");
      const bidAmount = document.createElement("span");
      bidAmount.classList.add("font-bold");
      bidAmount.textContent = bid.amount;
      liElement.append(bidAmount);
      const bidderName = document.createElement("span");
      bidderName.textContent = bid.bidderName;
      liElement.append(bidderName);

      const date = dayjs.tz(bid.created, "Europe/Oslo");
      const dateElement = document.createElement("span");
      dateElement.textContent = date.format("DD.MM.YYYY HH:mm");
      liElement.append(dateElement);

      liElement.classList.add(
        "text-sm",
        "flex",
        "flex-row",
        "justify-between",
        "gap-2",
        "bg-gray-100",
        "rounded",
        "my-1",
        "p-1",
      );
      return liElement;
    });

    const ul = document.createElement("ul");
    ul.append(...bidHistory);

    bidHistoryContainer.append(ul);

    const highestBid = data.bids.reduce((prev, current) => {
      return prev.amount > current.amount ? prev : current;
    }, 0);

    const highestBidAmount = highestBid.amount ?? 0;

    if (highestBidAmount > 0) {
      bidHistoryButton.classList.remove("hidden");
    }

    if (highestBid) {
      bids.textContent = `${highestBid.amount} credits by ${highestBid.bidderName}`;
    } else {
      bids.textContent = "No bids yet";
    }

    const bidInput = component.querySelector("#bidInput");
    bidInput.value = highestBidAmount + 1;
    bidInput.min = highestBidAmount + 1;

    if (data.isEnded) {
      timerContainer.innerHTML = "";
      timerContainer.classList.add("text-red-950", "text-2xl", "font-bold");
      timerContainer.textContent = "Ended";
      bidForm.classList.add("hidden");
      bidForm.classList.remove("flex");
    } else {
      bidForm.classList.remove("hidden");
      bidForm.classList.add("flex");
      const endsAt = dayjs.tz(data.endsAt, "Europe/Oslo");
      const dateNow = new Date();
      const startsAt = dayjs.tz(dateNow, "Europe/Oslo");

      renderTimer(startsAt, endsAt, component);

      let intervalId = setInterval(() => {
        const dateNow = new Date();
        const startsAt = dayjs.tz(dateNow, "Europe/Oslo");
        const isEnded = renderTimer(startsAt, endsAt, component);
        if (isEnded) {
          clearInterval(intervalId);
        }
      }, 1000);
    }
  });

  return component;
}

async function getListingData(id) {
  const data = await listingsDetailCall(id, { _seller: true, _bids: true });
  return data;
}

function renderTimer(startsAt, endsAt, component) {
  let ended = false;
  const endsInDays = endsAt.diff(startsAt, "day");
  const endsInHours = endsAt.diff(startsAt, "hour");
  const endsInMinutes = endsAt.diff(startsAt, "minute");
  const endsInSeconds = endsAt.diff(startsAt, "second");

  let overflowingHours = endsInHours - endsInDays * 24;
  let overflowingMinutes = endsInMinutes - endsInHours * 60;
  let overflowingSeconds = endsInSeconds - endsInMinutes * 60;

  const endsInDaysElement = component.querySelector("#endsInDays");
  const endsInHoursElement = component.querySelector("#endsInHours");
  const endsInMinutesElement = component.querySelector("#endsInMinutes");
  const endsInSecondsElement = component.querySelector("#endsInSeconds");

  if (endsInSecondsElement.textContent != overflowingSeconds) {
    const secondsDisplay = component.querySelector("#secondsDisplay");
    secondsDisplay.removeChild(endsInSecondsElement);
    endsInSecondsElement.textContent = overflowingSeconds;
    secondsDisplay.append(endsInSecondsElement);
  }

  if (endsInMinutesElement.textContent != overflowingMinutes) {
    const minutesDisplay = component.querySelector("#minutesDisplay");
    minutesDisplay.removeChild(endsInMinutesElement);
    endsInMinutesElement.textContent = overflowingMinutes;
    minutesDisplay.append(endsInMinutesElement);
  }

  if (endsInHoursElement.textContent != overflowingHours) {
    const hoursDisplay = component.querySelector("#hoursDisplay");
    hoursDisplay.removeChild(endsInHoursElement);
    endsInHoursElement.textContent = overflowingHours;
    hoursDisplay.append(endsInHoursElement);
  }

  if (endsInDaysElement.textContent != endsInDays) {
    const daysDisplay = component.querySelector("#daysDisplay");
    daysDisplay.removeChild(endsInDaysElement);
    endsInDaysElement.textContent = endsInDays;
    daysDisplay.append(endsInDaysElement);
  }

  if (
    endsInDays <= 0 &&
    overflowingHours <= 0 &&
    overflowingMinutes <= 0 &&
    overflowingSeconds <= 0
  ) {
    const endsAtElement = document.querySelector("#timerContainer");
    const bidForm = document.querySelector("#bidForm");
    console.log("Element: ", endsAtElement);
    endsAtElement.innerHTML = "";
    endsAtElement.classList.add("text-red-950", "text-2xl", "font-bold");
    endsAtElement.textContent = "Ended";
    bidForm.classList.add("hidden");
    bidForm.classList.remove("flex");
    ended = true;
  }

  return ended;
}

export default listingsDetail;
