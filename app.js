const loginForm = document.getElementById("loginForm");
const loginSection = document.getElementById("loginSection");
const dashboard = document.getElementById("dashboard");
const logoutBtn = document.getElementById("logoutBtn");
const loginMessage = document.getElementById("loginMessage");

const productForm = document.getElementById("productForm");
const productList = document.getElementById("productList");
const productCount = document.getElementById("productCount");
const searchInput = document.getElementById("searchInput");

let products = JSON.parse(localStorage.getItem("capstoneProducts")) || [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 49.99,
    category: "Electronics"
  },
  {
    id: 2,
    name: "Classic T-Shirt",
    price: 19.99,
    category: "Clothing"
  },
  {
    id: 3,
    name: "JavaScript Guide",
    price: 29.99,
    category: "Books"
  }
];

function saveProducts() {
  localStorage.setItem("capstoneProducts", JSON.stringify(products));
}

function renderProducts() {
  const searchTerm = searchInput.value.toLowerCase();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm)
  );

  productList.innerHTML = "";

  filteredProducts.forEach(product => {
    const card = document.createElement("article");
    card.className = "product-card";

    card.innerHTML = `
      <h3>${product.name}</h3>
      <p>Category: ${product.category}</p>
      <p>Price: $${product.price.toFixed(2)}</p>

      <div class="product-actions">
        <button onclick="editProduct(${product.id})">
          Edit
        </button>

        <button onclick="deleteProduct(${product.id})">
          Delete
        </button>
      </div>
    `;

    productList.appendChild(card);
  });

  productCount.textContent = products.length;
}

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  localStorage.setItem("capstoneLoggedIn", "true");

  loginSection.classList.add("hidden");
  dashboard.classList.remove("hidden");

  loginMessage.textContent = "";
  renderProducts();
});

logoutBtn.addEventListener("click", function () {
  localStorage.removeItem("capstoneLoggedIn");

  dashboard.classList.add("hidden");
  loginSection.classList.remove("hidden");
});

productForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("productName").value.trim();
  const price = Number(document.getElementById("productPrice").value);
  const category = document.getElementById("productCategory").value;

  const newProduct = {
    id: Date.now(),
    name,
    price,
    category
  };

  products.push(newProduct);
  saveProducts();
  renderProducts();

  productForm.reset();
});

function deleteProduct(id) {
  products = products.filter(product => product.id !== id);

  saveProducts();
  renderProducts();
}

function editProduct(id) {
  const product = products.find(product => product.id === id);

  if (!product) return;

  const newName = prompt("Enter new product name:", product.name);

  if (newName && newName.trim()) {
    product.name = newName.trim();

    saveProducts();
    renderProducts();
  }
}

searchInput.addEventListener("input", renderProducts);

if (localStorage.getItem("capstoneLoggedIn") === "true") {
  loginSection.classList.add("hidden");
  dashboard.classList.remove("hidden");
}

renderProducts();
