const API_BASE_URL = "http://localhost:5000/api/products";

export async function getProductsApiCall() {
    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) throw new Error("Failed to fetch products");
        return await response.json();
    } catch (error) {
        console.error("Error fetching all products:", error);
        return [];
    }
}

export async function getProductsByCategoryApiCall(category) {
    try {
        const response = await fetch(`${API_BASE_URL}/category/${category}`);
        if (!response.ok) throw new Error(`Failed to fetch products in category: ${category}`);
        return await response.json();
    } catch (error) {
        console.error(`Error fetching products by category (${category}):`, error);
        return [];
    }
}
