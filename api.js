// Base URL for the Dog API
const BASE_URL = 'https://api.thedogapi.com/v1';

// Your API Key
const API_KEY = 'live_QYkdrvBUT0y0SIfCt5N1WGHnR8kQW1p2Y4Ghrb2tw5pSRvfEMyirGDfIIn6sfgDp';

// Axios instance with API key included in headers
const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'x-api-key': API_KEY
    }
});

// Function to fetch all breeds
export async function fetchDogBreeds() {
    try {
        const response = await apiClient.get('/breeds');
        return response.data.map(breed => ({
            id: breed.id,
            name: breed.name,
            temperament: breed.temperament,
            weight: breed.weight.metric,
            height: breed.height.metric,
            lifeSpan: breed.life_span
        }));
    } catch (error) {
        console.error('Error fetching breeds:', error);
        throw error;
    }
}

// Function to fetch images for a specific breed
export async function fetchDogImages(breedId) {
    try {
        const response = await apiClient.get('/images/search', {
            params: {
                breed_id: breedId,
                limit: 5
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching breed images:', error);
        throw error;
    }
}

// Function to fetch available dogs for purchase (simulated)
export async function fetchAvailableDogs(breedId = null) {
    try {
        // In a real application, this would be your backend endpoint
        const params = {
            limit: 10,
            has_breeds:1
        };

        if (breedId) {
            params.breeds_id = breedId;
        }

        const response = await apiClient.get('/images/search', {params});
        // Transform the data to include price and availability
        return response.data.map(dog => ({
            id: dog.id,
            imageUrl: dog.url,
            breed: dog.breeds[0]?.name || 'Unknown',
            price: Math.floor(Math.random() * (2000 - 500) + 500), // Simulated price
            available: true
        }));
    } catch (error) {
        console.error('Error fetching available dogs:', error);
        throw error;
    }
}

// Function to submit a purchase order (POST request)
export async function submitPurchaseOrder(orderData) {
    try {
        // In a real application, this would be your backend endpoint
        const response = await apiClient.post('/purchase', orderData);
        return response.data;
    } catch (error) {
        console.error('Error submitting purchase order:', error);
        throw error;
    }
}

// Function to add a dog to shopping cart (POST request)
export async function addToCart(dogData) {
    try {
        // In a real application, this would be your backend endpoint
        const response = await apiClient.post('/cart/add', dogData);
        return response.data;
    } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;
    }
}

// function to add/remove favourite (post request)
export async function toggleFavourite(imageId) {
    try {
        const response = await apiClient.post('/favourites', {
            image_id: imageId
        });
        return response.data;
    } catch (error) {
        console.error('Error toggling favourite:', error);
        throw error;
    }
}

//function to fetch favourites
export async function fetchFavourites() {
    try {
        const response = await apiClient.get('/favourites');
        return response.data;
    } catch (error) {
        console.error('Error fetching favourites:', error);
        throw error;
    }
}