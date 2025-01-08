const API_BASE_URL = "http://localhost:5000/api/products";
export const addProduct = async (productData, token) => {
    try {
        const response = await fetch("http://localhost:5000/api/products/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`, // Include the token in the request headers
            },
            body: JSON.stringify(productData),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Error adding product");
        }
        return data;
    } catch (error) {
        throw error;
    }
};
export const deleteProduct = async (id) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.token) {
        throw new Error('User is not authenticated');
    }

    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${user.token}`, // Pass the token here for authorization
            },
        });

        if (!response.ok) {
            throw new Error('Error deleting product');
        }

        return await response.json();
    } catch (error) {
        console.error('Error in deleteProduct:', error);
        throw error;
    }
};
