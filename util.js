// Utility function to populate a dropdown menu with options
export function populateDropdown(dropdownElement, options) {
    clearElementContent(dropdownElement);
    
    // Add a default option
    const defaultOption = document.createElement('option');
    defaultOption.textContent = 'Select a breed';
    defaultOption.value = '';
    dropdownElement.appendChild(defaultOption);
    
    // Add options from the provided array
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.textContent = option.name;
        optionElement.value = option.id;
        dropdownElement.appendChild(optionElement);
    });
}

// Utility function to clear the content of an element
export function clearElementContent(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

// Utility function to create an image element
export function createImageElement(src, alt = 'Dog Image') {
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.classList.add('dog-image');
    return img;
}

// Utility function to format price
export function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
}

// Utility function to create a loading spinner
export function createLoadingSpinner() {
    const spinner = document.createElement('div');
    spinner.classList.add('loading-spinner');
    return spinner;
}

// Utility function to display error messages
export function displayError(container, message) {
    clearElementContent(container);
    const errorElement = document.createElement('div');
    errorElement.classList.add('error-message');
    errorElement.textContent = message;
    container.appendChild(errorElement);
}

// Utility function to display success messages
export function displaySuccess(container, message) {
    clearElementContent(container);
    const successElement = document.createElement('div');
    successElement.classList.add('success-message');
    successElement.textContent = message;
    container.appendChild(successElement);
}

// Utility function to validate form inputs
export function validateForm(formData) {
    const errors = [];
    
    if (!formData.get('name')) {
        errors.push('Name is required');
    }
    
    const email = formData.get('email');
    if (!email || !email.includes('@')) {
        errors.push('Valid email is required');
    }
    
    const phone = formData.get('phone');
    if (!phone || phone.length < 10) {
        errors.push('Valid phone number is required');
    }
    
    return errors;
}

// Utility function to create a dog card element
export function createDogCard(dog) {
    const card = document.createElement('div');
    card.classList.add('dog-card');
    
    card.innerHTML = `
        <img src="${dog.imageUrl}" alt="${dog.breed}" class="dog-image">
        <div class="dog-info">
            <h3>${dog.breed}</h3>
            <p class="price">${formatPrice(dog.price)}</p>
            <button class="add-to-cart-btn" data-dog-id="${dog.id}">
                Add to Cart
            </button>
        </div>
    `;
    
    return card;
}

// Utility function to create cart item element
export function createCartItem(item) {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    
    cartItem.innerHTML = `
        <img src="${item.imageUrl}" alt="${item.breed}" class="cart-item-image">
        <div class="cart-item-info">
            <h4>${item.breed}</h4>
            <p>${formatPrice(item.price)}</p>
        </div>
        <button class="remove-from-cart-btn" data-dog-id="${item.id}">
            Remove
        </button>
    `;
    
    return cartItem;
}

// Utility function to calculate cart total
export function calculateCartTotal(cartItems) {
    return cartItems.reduce((total, item) => total + item.price, 0);
}

// Utility function to save cart to local storage
export function saveCartToStorage(cart) {
    localStorage.setItem('dogShopCart', JSON.stringify(cart));
}

// Utility function to load cart from local storage
export function loadCartFromStorage() {
    const savedCart = localStorage.getItem('dogShopCart');
    return savedCart ? JSON.parse(savedCart) : [];
}

// Utility function to generate a unique ID
export function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function createDogCard(dog, onAddToCart, onToggleFavorite) {
    const card = document.createElement('div');
    card.classList.add('dog-card');
    
    card.innerHTML = `
        <img src="${dog.imageUrl}" alt="${dog.breed}" class="dog-image">
        <div class="dog-info">
            <h3>${dog.breed}</h3>
            <p class="price">${formatPrice(dog.price)}</p>
            <div class="card-buttons">
                <button class="add-to-cart-btn" data-dog-id="${dog.id}">
                    Add to Cart
                </button>
                <button class="favorite-btn" data-image-id="${dog.id}">
                    🩷
                </button>
            </div>
        </div>
    `;
    
    // Add event listeners
    card.querySelector('.add-to-cart-btn').addEventListener('click', onAddToCart);
    card.querySelector('.favorite-btn').addEventListener('click', onToggleFavorite);
    
    return card;
}