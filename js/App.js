const firebaseConfig = {
    apiKey: "AIzaSyDYVUt2Rm-w1y0L61a72NbaELFzu_tkiC8",
    authDomain: "coffee-system-c3ec2.firebaseapp.com",
    projectId: "coffee-system-c3ec2",
    storageBucket: "coffee-system-c3ec2.firebasestorage.app",
    messagingSenderId: "312702943745",
    appId: "1:312702943745:web:d18fd554838126b558f600",
    measurementId: "G-TFN5Z0L658"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// CART DATA
let cart = [];
const menuItems = document.querySelectorAll(".menu-item");
const cartCount = document.querySelector(".cart-count");
const cartIcon = document.querySelector(".cart-icon");

const cartPanel = document.getElementById("cartPanel");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");
// UPDATE COUNT
function updateCartCount() {
    let total = 0;
    cart.forEach(i => total += i.qty);
    if (cartCount) cartCount.textContent = total;
}

function renderCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, i) => {
        total += item.qty;

        cartItems.innerHTML += `
            <div class="cart-item">
                <div>
                    <h3>${item.name}</h3>
                    <p>Qty: ${item.qty}</p>
                </div>
                <button onclick="removeItem(${i})">Remove</button>
            </div>
        `;
    });

    cartTotal.textContent = "Total Items: " + total;
}

window.removeItem = function(i) {
    cart.splice(i, 1);
    updateCartCount();
    renderCart();
};
// MENU ACTIONS
menuItems.forEach(item => {

    const minus = item.querySelectorAll(".qty-btn")[0];
    const plus = item.querySelectorAll(".qty-btn")[1];
    const qtyText = item.querySelector(".qty");
    const addBtn = item.querySelector(".add-cart");
    const name = item.querySelector("[class^='card']").innerText;
    let qty = 1;

    plus.addEventListener("click", () => {
        qty++;
        qtyText.textContent = qty;
    });

    minus.addEventListener("click", () => {
        if (qty > 1) {
            qty--;
            qtyText.textContent = qty;
        }
    });
    addBtn.addEventListener("click", () => {
        const existing = cart.find(c => c.name === name);
        if (existing) {
            existing.qty += qty;
        } else {
            cart.push({ name, qty });
        }
        qty = 1;
        qtyText.textContent = 1;
        updateCartCount();
        renderCart();
    });
});

cartIcon.addEventListener("click", () => {
    cartPanel.classList.add("show");
    renderCart();
});
closeCart.addEventListener("click", () => {
    cartPanel.classList.remove("show");
});
// CHECKOUT
checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }
    document.getElementById("checkoutModal").style.display = "flex";
});

// CONFIRM ORDER
document.getElementById("confirmCheckout").addEventListener("click", () => {
    const name = document.getElementById("customerName").value;
    const location = document.getElementById("customerLocation").value;
    if (!name || !location) {
        alert("Please fill all fields");
        return;
    }
    db.collection("orders").add({
        customer: { name, location },
        items: cart,
        totalItems: cart.reduce((a, b) => a + b.qty, 0),
        status: "pending",
        createdAt: new Date()
    });
    document.getElementById("popup").style.display = "flex";
    setTimeout(() => {
        document.getElementById("popup").style.display = "none";
    }, 2500);

    cart = [];
    updateCartCount();
    renderCart();

    document.getElementById("checkoutModal").style.display = "none";
});

document.getElementById("closeCheckout").addEventListener("click", () => {
    document.getElementById("checkoutModal").style.display = "none";
});
const phoneInput = document.getElementById("customerPhone");

if (phoneInput) {
    phoneInput.addEventListener("input", function () {
        this.value = this.value.replace(/[^0-9]/g, "");
    });
}