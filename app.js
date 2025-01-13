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
