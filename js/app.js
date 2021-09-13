
//load data from api

const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
       <div class="card h-100 mt-5 bg-info">
            <img class="card-img-top mx-auto" style="width: 150px;height: 150px;" src=${image}></img>
            <div class="card-body text-dark">  
               <h3 class="card-title">${product.title.slice(0, 20)}</h3>
               <p class="card-text">Category: ${product.category}</p>
               <p>Average Rating: ${product.rating.rate} by ${product.rating.count} Customers</p>
               <h2>Price: $ ${product.price}</h2>
               <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success m-3">Add to Cart</button>
                <button id="details-btn" class="btn btn-danger m-3">Details</button>
           </div>
       </div>  
         `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = parseFloat(total).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(total).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    document.getElementById("delivery-charge").innerText = 30;
    document.getElementById("total-tax").innerText = (priceConverted * 0.2).toFixed(2);
  }
  if (priceConverted > 400) {
    document.getElementById("delivery-charge").innerText = 50;
    document.getElementById("total-tax").innerText = (priceConverted * 0.3).toFixed(2);
  }
  if (priceConverted > 500) {
    document.getElementById("delivery-charge").innerText = 60;
    document.getElementById("total-tax").innerText = (priceConverted * 0.4).toFixed(2);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
