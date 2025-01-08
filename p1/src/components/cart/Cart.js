import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function Cart() {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, []);

    const handleRemoveItem = (productId) => {
        const updatedCart = cart.filter(item => item._id !== productId);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item._price * item.quantity, 0).toFixed(2);
    };

    const handleProceedToOrder = () => {
        navigate("/order", { state: { cart } }); // Pass cart data to the order page
    };

    return (
        <div>
            <section className="container content-section">
                <h2 className="page-head">Cart🛒</h2>
                <div className="cart-row">
                    <span className="cart-item cart-header cart-column">ITEM</span>
                    <span className="cart-price cart-header cart-column">PRICE</span>
                    <span className="cart-quantity cart-header cart-column">QUANTITY</span>
                </div>
                <div className="cart-items">
                    {cart.map(item => (
                        <div className="cart-row" key={item._id}>
                            <div className="cart-item cart-column">
                                <img className="cart-item-image" src={`/img/${item.pImg}`} alt={item.pName} />
                                <span className="cart-item-title">{item.pName}</span>
                            </div>
                            <span className="cart-price cart-column">{item._price}</span>
                            <div className="cart-quantity cart-column">
                                <input
                                    className="cart-quantity-input"
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => {
                                        const updatedCart = cart.map((cartItem) =>
                                            cartItem._id === item._id
                                                ? { ...cartItem, quantity: parseInt(e.target.value, 10) || 1 }
                                                : cartItem
                                        );
                                        setCart(updatedCart);
                                        localStorage.setItem('cart', JSON.stringify(updatedCart));
                                    }}
                                />
                                <button onClick={() => handleRemoveItem(item._id)} className="btn btn-danger">
                                    REMOVE
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="cart-total">
                    <strong className="cart-total-title">Total</strong>
                    <span className="cart-total-price">${calculateTotal()}</span>
                </div>
                <div className="form-btns">
                    <button onClick={handleProceedToOrder} className="btn btn-primary">Order</button>
                </div>
            </section>
        </div>
    );
}

export default Cart;
