// This is the file where we'll have our mock data of T-Shirts.


const products = [];

function Wears(image, sizes, price, color, title, name) {
  this.image = image;
  this.sizes = sizes;
  this.price = price;
  this.color = color;
  this.title = title;
  this.name = name;
      
  return {image, sizes, price, color, title, name}
}

let i;
let num_wears = 49;
for (i = 1; i < num_wears; i++) {
  let img = `./src/Images/T-Shirts_Variations/${i}.png`;
  let colors = ['Lime', 'Red', 'Blue', 'Yellow', 'White', 'Orange', 'Violet', 'Purple', 'Black', 'Sky Blue', 'Wine', 'Green'];
  let val = i / 4;
  let cost = 0
  let count = 1
  let name = ''

  let next_color = colors[Math.ceil(val) - 1];

  if (i % 4 == 0) {
    name = 'Bear';
    cost = 55
    count = 1
  }

  else if (i % 4 == 1){
    name = 'Plain';
    cost = 15
    count++;
  }

  else if (i % 4 == 2){
    name = 'Toucan';
    cost = 30
    count+=1;
  }

  else {
    name = 'Gecko';
    cost = 40
  }

  const new_wear = new Wears(img, ["XL", "L", "M", "S"], cost, next_color, `${name} T-Shirt`, name);
  products.push(new_wear);
}

export { products };
