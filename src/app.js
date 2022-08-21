// Main file of the app
import { products } from "./data.js";

products.forEach(displayCards);
console.log(products);
function displayCards(product) {
  console.log(product);

  const cards = document.getElementById("card-container");
  const {
    image,
    sizes: [xlarge, large, medium, small],
    price,
    color,
    title,
  } = product || {};

  const createCard = document.createElement("div");
  createCard.classList.add("cards");
  createCard.innerHTML = `
  <img src=${image} alt="" srcset="" />
          <div class="card-details">
            <h6>${title}</h6>
            <p>${color}</p>
            <h6>${price} $</h6>
            <a href="" class="btn">Buy Now</a>
          </div>
  `;
  cards.appendChild(createCard);
}
