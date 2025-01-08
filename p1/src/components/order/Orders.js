import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Orders() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    // Fetch orders when the component mounts
    useEffect(() => {
        const fetchOrders = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user) {
                navigate('/login'); // Redirect to login if user is not authenticated
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/api/orders', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user.token}`, // Use user's token to authenticate
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }

                const data = await response.json();
                setOrders(data); // Set fetched orders to the state
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, [navigate]);

    return (
        <div className="orders-page">
            <h2>Your Orders</h2>

            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <ul>
                    {orders.map((order) => (
                        <li key={order._id}>
                            <div className="order">
                                <h3>Order ID: {order._id}</h3>
                                <p>Status: {order.status}</p>
                                <p>Total Price: ${order.totalPrice}</p>
                                <p>Shipping Address: {order.shippingAddress.country}</p>
                                <p>Created At: {new Date(order.createdAt).toLocaleString()}</p>

                                <h4>Items:</h4>
                                <ul>
                                    {order.items.map((item, index) => (
                                        <li key={index}>
                                            <p><strong>Product Name:</strong> {item.pName}</p>
                                            <p><strong>Price:</strong> ${item._price}</p>
                                            <p><strong>Quantity:</strong> {item.quantity}</p>
                                            <p><strong>Item Total:</strong> ${item._price * item.quantity}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Orders;
