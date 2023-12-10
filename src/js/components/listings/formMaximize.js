import createComponent from "../../utils/createComponent";

function formMaximize() {
  const component =
    createComponent(`<button class="flex justify-center items-center gap-2 bg-[#1D3461] text-blue-50 border rounded-xl p-2 mb-5" id="maximizeFormButton" type="button">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
</svg>
    <span class="text-sm uppercase font-bold tracking-wider">Add new listing</span>    
    </button>`);

  return component;
}

export default formMaximize;
