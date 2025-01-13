import { 
    fetchDogBreeds, 
    fetchDogImages, 
    fetchAvailableDogs, 
    submitPurchaseOrder, 
    addToCart 
} from './api.js';

let cart = [];

async function initializeApp() {
    await loadBreeds();
    await loadAvailableDogs();
    setupEventListeners();
    setupModalHandlers();  //added seperate function for maodal handler
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

async function loadAvailableDogs() {
    try {
        const dogs = await fetchAvailableDogs();
        const container = document.getElementById('dogs-container');
        container.innerHTML = '';

        dogs.forEach(dog => {
            const dogCard = createDogCard(dog);
            container.appendChild(dogCard);
        });
    } catch (error) {
        console.error('Error loading available dogs:', error);
        showError('Failed to load available dogs');
    }
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