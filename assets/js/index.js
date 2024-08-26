$(window).ready(async () => {
  await fetchShelfs();
  await fetchWarehouses();
  // await fetchProducts();
  document.getElementById("productForm").addEventListener("submit", submitForm);
});

let warehouses,
  shelfs,
  productsG,
  selectedProduct = [];

const fetchProducts = async () => {
  const response = await fetch("https://cert-project.vercel.app/products");
  const products = await response.json();
  productsG = products;

  products.forEach((product, index) => {
    const wh = warehouses.find((wh) => wh.warehouseId == product.warehouseId);
    const sh = shelfs.find((sh) => sh.shelfId == product.shelfId);

    const input = document.createElement("input");
    input.type = "checkbox";
    input.onclick = (e) => OnClicked(e);
    input.value = product.productId;
    input.classList = "form-check-input border-dark";

    const row = document.createElement("tr");

    const td1 = document.createElement("td");
    td1.className = "border-bottom-0";
    td1.appendChild(input);

    const td2 = document.createElement("td");
    td2.className = "border-bottom-0";
    td2.innerHTML = `<h6 class="fw-semibold mb-1">${product.name}</h6>`;

    const td3 = document.createElement("td");
    td3.className = "border-bottom-0";
    td3.innerHTML = `<h6 class="fw-semibold mb-1">${product.productId}</h6>`;

    const td4 = document.createElement("td");
    td4.className = "border-bottom-0";
    td4.innerHTML = `<div class="d-flex align-items-center gap-2"><h6 class="fw-semibold mb-1">${wh.name}, ${sh.name}</h6></div>`;

    const td5 = document.createElement("td");
    td5.className = "border-bottom-0";
    td5.innerHTML = `<h6 class="fw-semibold mb-0 fs-4">${product.quantity}</h6>`;

    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    row.appendChild(td4);
    row.appendChild(td5);

    const table = document.getElementById("productTable");
    table.appendChild(row);
  });

  document.getElementById("spinner").classList.toggle("d-flex");
  document.getElementById("spinner").classList.toggle("d-none");
};

const fetchWarehouses = async () => {
  const response = await fetch("https://cert-project.vercel.app/warehouses");
  warehouses = await response.json();

  const selectElement = document.getElementById("warehouseSelection");
  warehouses.forEach((warehouse) => {
    const option = document.createElement("option");
    option.value = warehouse.warehouseId;
    option.textContent = warehouse.name;
    selectElement.appendChild(option);
  });
};

const fetchShelfs = async () => {
  const response = await fetch("https://cert-project.vercel.app/shelfs");
  shelfs = await response.json();

  const selectElement = document.getElementById("shelfSelection");
  shelfs.forEach((shelf) => {
    const option = document.createElement("option");
    option.value = shelf.shelfId;
    option.textContent = shelf.name;
    selectElement.appendChild(option);
  });
};

function OnClicked(e) {
  if (e.target.checked) {
    selectedProduct.push(productsG.find((p) => p.productId == e.target.value));
  } else {
    selectedProduct = selectedProduct.filter(
      (p) => p.productId != e.target.value
    );
  }
}

function submitForm(event) {
  event.preventDefault(); // Prevent the form from submitting the traditional way

  // Create a new product object
  const newProduct = {
    name: document.getElementById("name").value,
    productId: document.getElementById("productId").value,
    quantity: parseInt(document.getElementById("quantity").value),
    price: document.getElementById("price").value,
    warehouseId: document.getElementById("warehouseSelection").value,
    shelfId: document.getElementById("shelfSelection").value,
    createDate: Date.now(), // Optional: Set creation date as current time
  };

  // Call the function to post the new product data
  postNewProduct(newProduct);
}

function postNewProduct(product) {
  fetch("https://cert-project.vercel.app/products/create-product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Product created successfully:", data);
      alert("สร้างสินค้าสำเร็จ!", "success");
      // Optionally, clear the form after successful submission
      setTimeout(() => {
        clearForm();
        window.location.href = "/";
      }, 3500);
    })
    .catch((error) => {
      console.error("Error creating product:", error);
    });
}

function freezeForm() {
  const formElements = document.getElementById("productForm").elements;
  for (let i = 0; i < formElements.length; i++) {
    formElements[i].readOnly = true;
    formElements[i].disabled = true; // Disable select elements
  }
}

function clearForm() {
  document.getElementById("productForm").reset();
  const formElements = document.getElementById("productForm").elements;
  for (let i = 0; i < formElements.length; i++) {
    formElements[i].readOnly = false;
    formElements[i].disabled = false; // Enable select elements
  }
}

const alert = (message, type) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
  alertPlaceholder.append(wrapper);
};
