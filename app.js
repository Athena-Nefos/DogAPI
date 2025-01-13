import { 
    fetchDogBreeds, 
    fetchDogImages, 
    fetchAvailableDogs, 
    submitPurchaseOrder, 
    addToCart 
} from './api.js';

import {
    createDogCard,
    createCartItem,
    calculateCartTotal,
    formatePrice,
    saveCartToStorage,
    loadCartFromStorage
} from './utils.js';

// Initialze state
let cart = loadCartFromStorage;
let favourites = new Set();

async function initializeApp() {
    await loadBreeds();
    await loadAvailableDogs();
    await loadFavourites();
    setupEventListeners();
    setupModalHandlers();  //added seperate function for maodal handler
    updateCartCount();
}

async function loadBreeds() {
    try {
        const breeds = await fetchDogBreeds();
        const dropdown = document.getElementById('breed-dropdown');
        
        // Clear existing options
        dropdown.innerHTML = '<option value="">Select a breed</option>';
        
        // Add new options
        breeds.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed.id;
            option.textContent = breed.name;
            dropdown.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading breeds:', error);
        showError('Failed to load dog breeds');
    }
}

async function loadAvailableDogs(breedId = null) {
    try {
        const dogs = await fetchAvailableDogs(breedId);
        const container = document.getElementById('dogs-container');
        container.innerHTML = '';

        dogs.forEach(dog => {
            const dogCard = createDogCard(dog, 
                () => handleAddToCart(dog), 
                () => handleToggleFavourite(dog.id));
            container.appendChild(dogCard);
        });
    } catch (error) {
        console.error('Error loading available dogs:', error);
        showError('Failed to load available dogs');
    }
}

async function loadFavourites() {
    try {
        const favouritesData = await fetchFavourites();
        favourites = new Set(favouritesData.map(fav => fav.image_id));

        //update UI to show favourites status
        updateFavouritesUI();
    } catch (error) {
        console.error('Error loading favourites:', error);
    }
}

function handleAddToCart(dog) {
    cart.push(dog);
    saveCartToStorage(cart);
    updateCartDisplay();
    showMessage('Dog added to cart!');
}

async function handleToggleFavourites(imageId) {
    try {
        await toggleFavourite(imageId);
        if (favourites.has(imageId)) {
            favourites.delete(imageId);
        } else {
            favourites.add(imageId);
        }
        updateFavouritesUI();
    } catch (error) {
        showError('Failed to update favourites');
    }
}

function updateFavouritesUI() {
    const favouriteButtons = document.querySelectorAll('.favourite-btn');
    favouriteButtons.forEach(btn => {
        const imageId = btn.dataset.imageId;
        btn.classList.toggle('favourited', favourites.has(imageId));
    });
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    cartItems.innerHTML = '';
    cart.forEach(item => {
        cartItems.appendChild(createCartItem(item));
    });

    const total = calculateCartTotal(cart);
    cartTotal.textContent = 'Total: ${formatPrice(total)}';
}

function setModalHandlers() {
    const modal = document.getElementById('modal');
    const closeButton = document.querySelector('.close-button');
    const checkoutButton = document.getElementById('checkout-button');
    const purchaseForm = document.getElementById('purchase-form');

    //open modal
    checkoutButton.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    //close modal when clicking X button
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    //close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    //handle purchase form submission
    purchaseForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        try {
            await submitPurchaseOrder({
                items: cart,
                customerInfo: Object.fromEntries(formData)
            });

            cart = [];
            saveCartToStorage(cart);
            updateCartCount();
            updateCartDisplay();

            modal.style.display = 'none';
            e.target.reset();
            showMessage ('Purchase successful!');
        } catch (error) {
            showError('Failed to complete purchase');
        }
    });
}

function setupEventListeners() {
    //breed selection
    document.getElementById('breed-dropdown').addEventListener('change', async (e) => {
        const breedId = e.target.value;
        await loadAvailableDogs(breedId);
    });

    //cart icon
    document.querySelector('.cart-icon').addEventListener('click', () => {
        document.getElementById('shopping-cart').classList.toggle('hidden');
    });

    //remove from cart buttons
    document.getElementById('cart-items').addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-from-cart-btn')) {
            const dogId = e.target.dataset.dogId;
            cart = cart.filter(item => item.id !== dogId);
            saveCartToStorage(cart);
            updateCartCount();
            updateCartDisplay();
        }
    });
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}

function showMessage(message) {
    alert(message);  //replace with better notification system
}

function showError(message) {
    alert('Error: ' + message);  //replace with a better error display
}

function createDogCard(dog) {
    const card = document.createElement('div');
    card.className = 'dog-card';
    card.innerHTML = `
        <img src="${dog.imageUrl}" alt="${dog.breed}">
        <div class="dog-info">
            <h3>${dog.breed}</h3>
            <p class="price">$${dog.price}</p>
            <button onclick="addToCart(${JSON.stringify(dog)})">Add to Cart</button>
        </div>
    `;
    return card;
}

function updateCart(dog) {
    cart.push(dog);
    updateCartCount();
    showMessage('Dog added to cart!');
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}

function setupModalHandlers() {
    const modal = document.getElementById('modal');
    const closeButton = document.querySelector('.close-button');
    const checkoutButton = document.getElementById('checkout-button');
}

function setupEventListeners() {
    // Breed selection
    document.getElementById('breed-dropdown').addEventListener('change', async (e) => {
        if (e.target.value) {
            const images = await fetchDogImages(e.target.value);
            // Update the display with the new images
        }
    });

    // Cart icon
    document.querySelector('.cart-icon').addEventListener('click', () => {
        document.getElementById('shopping-cart').classList.toggle('hidden');
    });

    // Checkout button
    document.getElementById('checkout-button').addEventListener('click', () => {
        document.getElementById('modal').classList.remove('hidden');
    });

    const checkoutButton = document.getElementById('checkout-button');
    //Open modal
    checkoutButton.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    const closeButton = document.querySelector('.close-button');
    //close modal when clicking X button
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    //close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Close modal
    //document.querySelector('.close-button').addEventListener('click', () => {
    //    document.getElementById('modal').classList.add('hidden');
    //});

    // Handle Purchase form submission
    document.getElementById('purchase-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        try {
            await submitPurchaseOrder({
                items: cart,
                customerInfo: Object.fromEntries(formData)
            });

            //Clear cart and close modal
            cart = [];
            updateCartCount();
            modal.style.display = 'none';
            e.target.reset(); //reset form
            showMessage('Purchase successful!');
            
        } catch (error) {
            showError('Failed to complete purchase');
        }
    });
}

function showMessage(message) {
    // Implement a toast or notification system
    alert(message);
}

function showError(message) {
    // Implement error display
    alert('Error: ' + message);
}

// Initialize the application
initializeApp();