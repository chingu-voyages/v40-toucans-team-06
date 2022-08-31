// Main file of the app
import { products } from "./data.js";

//Declared variables to target nodes
const payButtons = document.getElementsByClassName("button");
const itemCounter = document.getElementById("item-counter");
const cards = document.getElementById("card-container");
const search = document.getElementById('search');
const check = document.getElementById('check');


//Event listeners 
search.addEventListener('keyup', reload_page);
check.addEventListener('submit', searchItem);


// Counter variables
let counterNumber = 0;
itemCounter.innerHTML = counterNumber;


// Shopping cart table
function displayShoppingCart() {
  const shoppingTable = document.getElementById("my-shopping-list");
  shoppingTable.innerHTML = `
    <tr>
      <th>Product Name</th>
      <th>Color</th>
      <th>Price</th>
      <th>Quantity</th>
    </tr>
    <tr>
      <td>Gecko T-Shirt</td>
      <td>Lime</td>
      <td>27 $</td>
      <td>1</td>
    </tr>
    <tr>
      <td>Toucan T-Shirt</td>
      <td>Red</td>
      <td>30 $</td>
      <td>5</td>
    </tr>
    <tr>
      <td>Bear T-Shirt</td>
      <td>Black</td>
      <td>50 $</td>
      <td>3</td>
    </tr>
  `;
}

displayShoppingCart();


let x = 1;
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
    <div class="card-details">
      <img src=${image} alt="" srcset="" />
      <h6>${title}</h6>
      <p>${color}</p>
      <h6>${price} $</h6>
      <button id="${x++}" class="button btn">Add to cart</button>
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
function searchItem(e) {
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

// reload cards
function reload_page(e) {
  if (e.target.value == '') {
    let reload = products.filter(elem => {
      return elem;
    });

    cards.innerHTML = '';
    reload.forEach(displayCards);
  }
}

// Dropdown menu
function filterWithDropdown() {
  const itemOptions = document.getElementsByClassName("dropdown-item");
  const allProducts = document.getElementById("all-products");

  function chooseAndCompareItem(e) {
    let chosenItem = e.target;
    let matchingItems = [];

    if (e.target === allProducts) {
      matchingItems = products;
    } else {
      // Don't do anything.
    }

    // Filter by color
    for (let i = 0; i < products.length; i++) {
      if (products[i].color === chosenItem.innerHTML) {
        matchingItems.push(products[i]);
      } else {
        cards.innerHTML = ``;
      }
    }

    // Filter by picture
    for (let i = 0; i < products.length; i++) {
      if (products[i].name === chosenItem.innerHTML) {
        matchingItems.push(products[i]);
      } else {
        cards.innerHTML = ``;
      }
    }

    // Filter by price
    for (let i = 0; i < products.length; i++) {
      if (products[i].price === parseInt(chosenItem.innerHTML)) {
        matchingItems.push(products[i]);
      } else {
        cards.innerHTML = ``;
      }
    }

    matchingItems.forEach(displayCards);
  }

  function listOptions(optionsArray, action) {
    for (let i = 0; i < optionsArray.length; i++) {
      optionsArray[i].addEventListener("click", action);
    }
  }
  listOptions(itemOptions, chooseAndCompareItem);
}

filterWithDropdown();