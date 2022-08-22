// Main file of the app
import { products } from "./data.js";

//Declared variables to target nodes
const payButtons = document.getElementsByClassName("button");
const itemCounter = document.getElementById("item-counter");
const cards = document.getElementById("card-container");


let counterNumber = 0;
itemCounter.innerHTML = counterNumber;

products.forEach(displayCards);

// Dynamically displays cards
function displayCards(product) {
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
            <button href="" class="button btn">Buy Now</button>
          </div>
  `;
  cards.appendChild(createCard);
}


// Item count in cart
function increaseCounter() {
  counterNumber++;
  itemCounter.innerHTML = counterNumber;
}

for (let i = 0; i < payButtons.length; i++) {
    payButtons[i].addEventListener("click", increaseCounter)
}


// search functionality
document.addEventListener('submit', searchItem);

function searchItem (e) {
  e.preventDefault();

  cards.innerHTML = '';
  let item = e.target[0].value.toLowerCase();
  let pattern = new RegExp(item);

  let filtered = products.filter(elem => {
    if (pattern.test(elem.title.toLowerCase())) {
      return elem;
    }
  });

  if (filtered.length == 0) {
    cards.innerHTML = `<h1>Not Found</h1>`;
  }

  else {
    filtered.forEach(displayCards);
  }
}
