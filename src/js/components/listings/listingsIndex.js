import createComponent from "../../utils/createComponent";
import listingsItem from "./listingsItem";

function listingsIndex() {
  const html = `<div id="listings" class="grid gap-3 md:grid-cols-2 lg:grid-cols-3"></div>`;
  const component = createComponent(html);

  const listingsContainer = component.querySelector("#listings");
  const listingsItems = [
    {
      title: "MacBook Air",
      description: "MacBook Air 2020",
      highestBid: 200,
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2826&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "iPhone 12",
      description: "iPhone 12 Pro Max 256GB",
      highestBid: 200,
      image:
        "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Samsung Galaxy S21",
      description: "Samsung Galaxy S21 Ultra 256GB",
      highestBid: 200,
      image:
        "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Nike Air Max",
      description: "Nike Air Max 97",
      highestBid: 200,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Macbook Air",
      description: "Macbook Pro 13' 2019",
      highestBid: 200,
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2826&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Macbook Air",
      description: "Macbook Pro 13' 2019",
      highestBid: 200,
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2826&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Macbook Air",
      description: "Macbook Pro 13' 2019",
      highestBid: 200,
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2826&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const items = listingsItems.map((listing) => {
    return listingsItem(listing);
  });

  listingsContainer.append(...items);

  return component;
}

export default listingsIndex;
