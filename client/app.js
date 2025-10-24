const API_URL = 'http://localhost:3000/api/cart';

const productsDiv = document.getElementById('products');
const cartDiv = document.getElementById('cart');

// Fetch and display products
async function loadProducts() {
    const res = await fetch(`${API_URL}/products`);
    const products = await res.json();
    productsDiv.innerHTML = '';
    products.forEach(p => {
        const div = document.createElement('div');
        div.textContent = `${p.name} - $${p.price}`;
        const button = document.createElement('button');
        button.textContent = 'Add to Cart';
        button.onclick = () => addToCart(p.id);
        div.appendChild(button);
        productsDiv.appendChild(div);
    });
}

// Fetch and display cart
async function loadCart() {
    const res = await fetch(API_URL);
    const cart = await res.json();
    cartDiv.innerHTML = '';
    cart.forEach(item => {
        const div = document.createElement('div');
        div.textContent = `${item.product.name} x ${item.quantity}`;
        const button = document.createElement('button');
        button.textContent = 'Remove';
        button.onclick = () => removeFromCart(item.product.id);
        div.appendChild(button);
        cartDiv.appendChild(div);
    });
}

// Add product to cart
async function addToCart(productId) {
    await fetch(`${API_URL}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity: 1 })
    });
    loadCart();
}

// Remove product from cart
async function removeFromCart(productId) {
    await fetch(`${API_URL}/remove`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId })
    });
    loadCart();
}

// Initial load
loadProducts();
loadCart();
