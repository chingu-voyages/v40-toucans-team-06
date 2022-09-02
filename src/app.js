// Main file of the app
import { products } from "./data.js";

//Declared variables to target nodes
const addToCartButtons = document.getElementsByClassName("button");
const itemCounter = document.getElementById("item-counter");
const cards = document.getElementById("card-container");
const search = document.getElementById("search");
const check = document.getElementById("check");
const totalAmountEl = document.getElementById("total");

//Event listeners
search.addEventListener("keyup", reload_page);
check.addEventListener("submit", searchItem);

// Counter variables
let counterNumber = 0;
itemCounter.innerHTML = counterNumber;

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

  // Add event listener to each card when it is created
  for (let i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener("click", increaseCounter);
    addToCartButtons[i].addEventListener("click", addItemToShoppingCart);
  }
}

// Item count in cart
function increaseCounter() {
  counterNumber++;
  itemCounter.innerHTML = counterNumber;
}

// Function to add items to the shopping cart table
let myShoppingCartItems = [];

function addItemToShoppingCart(e) {
  let elementID = e.target.id;
  const shoppingTable = document.getElementById("my-shopping-list");
  shoppingTable.innerHTML = ``;

  // Check if the button ID is the same as in the products array and then put the item into the array.
  for (let i = 0; i < products.length; i++) {
    // Check if the item in the products array has the same ID as the clicked button.
    if (products[i].id === parseInt(e.target.id)) {
      /*
        Check if the myShoppingCartItems array already contains an item with the same ID as the ID of the clicked button.
        The some() method immediately stops searching as soon as it finds an item with the same id.
      */
      if (
        myShoppingCartItems.some(
          (element) => element.id === parseInt(e.target.id)
        )
      ) {
        // Loop through the myShoppingCartItems array and increase the productCounter if the item already exists in the array.
        for (let i = 0; i < myShoppingCartItems.length; i++) {
          if (myShoppingCartItems[i].id === parseInt(e.target.id)) {
            myShoppingCartItems[i].productCounter++;
          }
        }
      } else {
        // Add the item to the table if it isn't there yet.
        products[i].productCounter = 1;
        myShoppingCartItems.push(products[i]);
      }
    } else {
      // Do nothing
    }
  }

  for (let i = 0; i < myShoppingCartItems.length; i++) {
    let row = `
      <tr>
        <td><img class="table-image" src="${myShoppingCartItems[i].image}"</td>
        <td>${myShoppingCartItems[i].title}</td>
        <td>${myShoppingCartItems[i].color}</td>
        <td>${myShoppingCartItems[i].price} $</td>
        <td>${myShoppingCartItems[i].productCounter}</td>
      </tr>
    `;
    shoppingTable.innerHTML += row;
  }
  // Updates total amount with the product counter
  let total = 0;
  for (let i = 0; i < myShoppingCartItems.length; i++) {
    total += myShoppingCartItems[i].price * myShoppingCartItems[i].productCounter;
    totalAmountEl.innerHTML = `$${total}`;
  }
  // End of total amount element
}

// Add modal that loads data dynamically and updates automatically
let myModal = new bootstrap.Modal(document.getElementById("exampleModal"), {
  keyboard: false,
});

const openCart = document.getElementById("open-shopping-cart");
openCart.addEventListener("click", openShoppingCart);

function openShoppingCart() {
  myModal.toggle();
}

// search functionality
function searchItem(e) {
  e.preventDefault();
  cards.innerHTML = "";

  let item = e.target[0].value.toLowerCase();
  let pattern = new RegExp(item);

  let filtered = products.filter((elem) => {
    if (pattern.test(elem.title.toLowerCase())) {
      return elem;
    }
  });

  if (filtered.length == 0) {
    cards.innerHTML = `<h1>Not Found</h1>`;
  } else {
    filtered.forEach(displayCards);
  }
}

// reload cards
function reload_page(e) {
  if (e.target.value == "") {
    let reload = products.filter((elem) => {
      return elem;
    });

    cards.innerHTML = "";
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
