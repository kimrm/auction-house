import createComponent from "../../utils/createComponent";

function formMinimize() {
  const component =
    createComponent(`<button class="flex justify-center items-center gap-2 mb-5" id="minimizeFormButton" type="button">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
  </svg>  
    <span class="text-sm uppercase font-bold tracking-wider">Minimize</span>    
    </button>`);
  return component;
}

export default formMinimize;
