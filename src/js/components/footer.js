import createComponent from "../utils/createComponent";

function footer() {
  const html = `<footer class="fixed bottom-0 left-0 right-0 flex items-center bg-slate-900 text-white">
  <div class="container mx-auto flex gap-5 p-4">  
  <div class="hidden md:block">My bids: 3</div>
    <div class="hidden md:block">My listings: 3</div>
    <div class="hidden md:block">Bids received: 10</div>
    <div>Remaining credits: 100</div>
    </div>
    </footer>`;

  const component = createComponent(html);

  return component;
}

export default footer;