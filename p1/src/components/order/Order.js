import React, { useState, useEffect } from 'react';
import { createOrder } from '../../service/orderService';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Order() {
    const [cart, setCart] = useState([]);
    const [user, setUser] = useState(null);
    const [country, setCountry] = useState('');
    const [shippingCost, setShippingCost] = useState(0);
    const [loadingShipping, setLoadingShipping] = useState(false);
    const [countries, setCountries] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);

        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.token) {
            try {
                const decodedToken = jwtDecode(storedUser.token);
                storedUser._id = decodedToken.id;
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
        setUser(storedUser);

        setCountries(["Germany", "Spain", "UK", "Japan", "USA"]);
    }, []);

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item._price * item.quantity || 0), 0);
    };

    const handlePlaceOrder = async () => {
        if (!user) {
            alert("You must be logged in to place an order.");
            return;
        }

        const orderData = {
            userId: user._id,
            items: cart,
            shippingAddress: {
                country,
                shippingCost,
            },
            totalPrice: calculateTotal() + shippingCost,
        };

        // Log the order data
        console.log("Order Data:", orderData);

        try {
            const token = user.token;
            const order = await createOrder(orderData, token);

            // Clear cart after successful order
            localStorage.removeItem('cart');
            alert("Order placed successfully! Order ID: " + order._id);

            navigate('/');
        } catch (error) {
            alert("Error placing order: " + error.message);
        }
    };

    const finalTotal = (calculateTotal() + shippingCost).toFixed(2);

    return (
        <div>
            <section className="container content-section">
                <h2 className="page-head">Order Summary</h2>
                <div className="order-items">
                    {cart.map((item) => (
                        <div className="order-item" key={item._id}>
                            <span>{item.pName}</span> - <span>{item.quantity} x ${item._price}</span>
                        </div>
                    ))}
                </div>
                <div className="order-total">
                    <strong>Cart Total:</strong> ${calculateTotal().toFixed(2)}
                </div>
                <div className="shipping">
                    <label>
                        <strong>Select Country for Shipping:</strong>
                    </label>
                    <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    >
                        <option value="">-- Select Country --</option>
                        {countries.map((countryName, index) => (
                            <option key={index} value={countryName}>
                                {countryName}
                            </option>
                        ))}
                    </select>
                    {loadingShipping ? (
                        <div>Loading shipping cost...</div>
                    ) : (
                        shippingCost > 0 && (
                            <div>
                                <strong>Shipping Cost:</strong> ${shippingCost.toFixed(2)}
                            </div>
                        )
                    )}
                </div>
                <div className="order-total">
                    <strong>Total with Shipping:</strong> ${finalTotal}
                </div>
                <button onClick={handlePlaceOrder} className="btn btn-primary">
                    Place Order
                </button>
            </section>
        </div>
    );
}

export default Order;
