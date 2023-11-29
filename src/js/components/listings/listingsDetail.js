import createComponent from "../../utils/createComponent";
import listingsDetailCall from "../../functions/api/listingsDetail";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { detailsModalClosedEvent } from "../../customEvents";

dayjs.extend(relativeTime);

function listingsDetail(id) {
  const html = `
<div id="listingsDetail" class="grid md:grid-cols-5 gap-4 text-black">  
    <div class="absolute top-1 right-1 px-4 py-2 bg-slate-50 rounded-full border border-slate-200">
        <button id="closeButton" class="text-3xl">&times;</button>  
    </div>
    <div class="md:col-span-3 bg-gray-100 rounded-lg p-4">
        <img id="image" class="rounded-xl object-cover mx-auto h-96" src="">
    </div>
    <div class="md:col-span-2 p-2">
    <div class="mb-5">
    <h2 id="title" class="text-3xl capitalize font-bold mb-3"></h2>
            <h3 class="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">Auction ends in</h3>
            <div class="flex gap-1">
                <div class="grid grid-rows-2 bg-slate-100 bg-gradient-to-t from-slate-300 to-slate-50 rounded w-16 p-1 border border-slate-300">
                    <div class="text-xs text-center uppercase tracking-wider font-bold text-slate-500 mb-1 border-b border-slate-300">Days</div>
                    <div id="endsInDays" class="text-center text-lg text-slate-500 animate-in slide-in-from-bottom">33</div>
                </div>
                <div class="grid grid-rows-2 bg-slate-100 bg-gradient-to-t from-slate-300 to-slate-50 rounded w-16 p-1 border border-slate-300">
                    <div class="text-xs text-center uppercase tracking-wider font-bold text-slate-500 mb-1 border-b border-slate-300">hrs.</div>
                    <div id="endsInHours" class="text-center border border-red-400 rounded-lg text-lg text-slate-600 animate-in slide-in-from-bottom">2</div>
                </div>          
                <div id="minutesDisplay" class="grid grid-rows-2 bg-slate-100 bg-gradient-to-t from-slate-300 to-slate-50 rounded w-16 p-1 border border-slate-300 overflow-hidden">
                    <div class="text-xs text-center uppercase tracking-wider font-bold text-slate-500 mb-1 border-b border-slate-300">Min.</div>
                    <div id="endsInMinutes" class="text-center text-lg text-slate-700 animate-in slide-in-from-bottom">3</div>
                </div>  
                <div id="secondsDisplay" class="grid grid-rows-2 bg-slate-100 bg-gradient-to-t from-slate-300 to-slate-50 rounded w-16 p-1 border border-slate-300 overflow-hidden">
                    <div class="text-xs text-center uppercase tracking-wider font-bold text-slate-500 mb-1 border-b border-slate-300">Sec.</div>
                    <div id="endsInSeconds" class="text-center text-lg text-slate-800 animate-in slide-in-from-bottom">3</div>
                </div>                
            </div>
        </div>        
        <p id="description" class="mb-5"></p>
        <button class="bg-[#1D3461] text-white hover:bg-[#1D1D1D] w-full md:w-auto py-2 px-4 rounded-lg">Place Bid</button>
        <div class="mt-5">
            <h3 class="text-sm font-bold mb-3 uppercase tracking-wider text-slate-500">Current bids</h3>
            <div id="bids" class="font-bold">33</div>
        </div>
        
    </div>  
</div>`;
  const component = createComponent(html);

  const title = component.querySelector("#title");
  const description = component.querySelector("#description");
  const image = component.querySelector("#image");
  const closeButton = component.querySelector("#closeButton");

  closeButton.addEventListener("click", () => {
    document.dispatchEvent(detailsModalClosedEvent());
  });

  listingsDetailCall(id).then((data) => {
    console.log(data);
    image.src = data.media[0];
    title.textContent = data.title;
    description.textContent = data.description;
    const startsAt = dayjs();
    const endsAt = dayjs(data.endsAt);
    const endsIn = endsAt.diff(startsAt, "day");
    const endsInHours = endsAt.diff(startsAt, "hour");
    const endsInMinutes = endsAt.diff(startsAt, "minute");
    const endsInSeconds = endsAt.diff(startsAt, "second");

    let overflowingHours = endsInHours - endsIn * 24;
    let overflowingMinutes = endsInMinutes - endsInHours * 60;
    let overflowingSeconds = endsInSeconds - endsInMinutes * 60;

    const endsInDaysElement = component.querySelector("#endsInDays");
    const endsInHoursElement = component.querySelector("#endsInHours");
    const endsInMinutesElement = component.querySelector("#endsInMinutes");
    const endsInSecondsElement = component.querySelector("#endsInSeconds");

    endsInDaysElement.textContent = endsIn;
    endsInHoursElement.textContent = overflowingHours;
    endsInMinutesElement.textContent = overflowingMinutes;
    endsInSecondsElement.textContent = overflowingSeconds;

    setInterval(() => {
      const secondsDisplay = component.querySelector("#secondsDisplay");
      const minutesDisplay = component.querySelector("#minutesDisplay");
      secondsDisplay.removeChild(endsInSecondsElement);
      overflowingSeconds -= 1;
      if (overflowingSeconds < 0) {
        overflowingSeconds = 59;
        overflowingMinutes -= 1;
        minutesDisplay.removeChild(endsInMinutesElement);
        endsInMinutesElement.textContent = overflowingMinutes;
        minutesDisplay.append(endsInMinutesElement);
      }
      endsInSecondsElement.textContent = overflowingSeconds;

      secondsDisplay.append(endsInSecondsElement);
    }, 1000);

    console.log("Ends in: ", data.endsAt);
    console.log("Dayjs: ", dayjs(data.endsAt).fromNow(true));
  });

  return component;
}

export default listingsDetail;
