const API_BASE_URL = "http://localhost:5000/api/orders";

// Create a new order
export const createOrder = async (orderData, token) => {
    try {
        console.log("Sending Order Data to Backend:", orderData); // Log the order data being sent

        const response = await fetch(API_BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(orderData),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Error creating order");
        }

        return data;
    } catch (error) {
        console.error("Error creating order:", error);
        throw error;
    }
};
