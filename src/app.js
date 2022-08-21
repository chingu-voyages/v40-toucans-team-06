// Main file of the app
import { products } from "./data.js";

const payButtons = document.getElementsByClassName("button");
const itemCounter = document.getElementById("item-counter");
let counterNumber = 0;
itemCounter.innerHTML = counterNumber;

products.forEach(displayCards);

function displayCards(product) {
  const cards = document.getElementById("card-container");
  const {
    image,
    sizes: [xlarge, large, medium, small],
    price,
    color,
  } = product || {};

  const createCard = document.createElement("div");
  createCard.classList.add("cards");
  createCard.innerHTML = `
  <img src=${image} alt="" srcset="" />
          <div class="card-details">
            <h6>T-shirt</h6>
            <p>${color}</p>
            <h6>${price} $</h6>
            <button class="button btn">Buy Now</button>
          </div>
  `;
	  cards.appendChild(createCard);
}

function increaseCounter() {
  counterNumber++;
  itemCounter.innerHTML = counterNumber;
}

for (let i = 0; i < payButtons.length; i++) {
    payButtons[i].addEventListener("click", increaseCounter)
}