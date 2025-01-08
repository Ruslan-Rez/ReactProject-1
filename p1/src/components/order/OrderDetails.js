import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function OrderDetails() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user) {
                // Redirect to login if user is not authenticated
                return;
            }

            try {
                const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user.token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch order details');
                }

                const data = await response.json();
                setOrder(data); // Set the order details
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    if (!order) {
        return <p>Loading order details...</p>;
    }

    return (
        <div className="order-details">
            <h2>Order Details</h2>
            <p>Order ID: {order._id}</p>
            <p>Status: {order.status}</p>
            <p>Total Price: ${order.totalPrice}</p>
            <p>Shipping Address: {order.shippingAddress.country}</p>
            <p>Created At: {new Date(order.createdAt).toLocaleString()}</p>
            <h3>Items:</h3>
            <ul>
                {order.items.map((item) => (
                    <li key={item._id}>
                        <p>{item.pName}</p>
                        <p>Price: ${item._price}</p>
                        <p>Quantity: {item.quantity}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default OrderDetails;
