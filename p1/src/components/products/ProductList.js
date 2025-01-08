import React, { useEffect, useState } from "react";
import { getProductsByCategoryApiCall } from "../../apiCalls/productApiCalls";
import { useTranslation } from "react-i18next";
import { deleteProduct } from '../../service/productService';


function ProductList() {
    const [micList, setMicList] = useState([]);
    const [headphoneList, setHeadphoneList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cartCount, setCartCount] = useState(0);
    const [user, setUser] = useState(null);
    const { t } = useTranslation();


    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        setUser(userData);
        async function fetchProducts() {
            try {
                const microphones = await getProductsByCategoryApiCall("Microphone");
                const headphones = await getProductsByCategoryApiCall("Headphones");
                setMicList(microphones);
                setHeadphoneList(headphones);
            } catch (error) {
                console.error("Error loading products:", error);
            } finally {
                setLoading(false); // Stop loading spinner
            }
        }
        fetchProducts();
    }, []);

    if (loading) {
        return <div>Loading products...</div>; // Simple loading state
    }
    const handleDelete = async (productId, category) => {
        try {
            await deleteProduct(productId);

            if (category === 'Microphone') {
                setMicList((prevMicList) => prevMicList.filter((product) => product._id !== productId));
            } else if (category === 'Headphones') {
                setHeadphoneList((prevHeadphoneList) => prevHeadphoneList.filter((product) => product._id !== productId));
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            // Optionally, show an error message to the user
            window.alert(t('products.delete-error')); // Example: show error if deletion fails
        }
    };

    const handleAddToCart = (product) => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existingProduct = cart.find((item) => item._id === product._id);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        setCartCount(cart.length);
        window.alert("Added to cart!");
    };


    return (
        <main className="container content-section">
            <h2 className="page-head">{t("products.products")}</h2>
            <h2 className="section-name">{t("products.microphones")}</h2>
            <section className="products">
                {micList.map((mic) => (
                    <figure className="product" key={mic._id}>
                        <img className="prod-img" src={`/img/${mic.pImg}`} alt={mic.pName} />
                        <figcaption className="prod-price">{mic._price}</figcaption>
                        <figcaption >{mic.pName}</figcaption>
                            <section className="form-btns">
                            {user && user.role === 'customer' ? (
                            <button
                                className="btn btn-primary"
                                onClick={() => handleAddToCart(mic)}
                            >
                                {t('products.add-to-cart')}
                            </button>) : user && user.role==='employee' ?(
                            <button
                                className="btn btn-danger"
                                onClick={() => handleDelete(mic._id,"Microphone")}
                            >
                                {t('products.delete')}
                            </button>) : (<p />)
                            }
                            </section>


                    </figure>
                ))}
            </section>
            <h2 className="section-name">{t("products.headphones")}</h2>
            <section className="products">
                {headphoneList.map((hph) => (
                    <figure className="product" key={hph._id}>
                        <img className="prod-img" src={`/img/${hph.pImg}`} alt={hph.pName} />
                        <figcaption className="prod-price">{hph._price}</figcaption>
                        <figcaption>{hph.pName}</figcaption>
                        <section className="form-btns">
                            {user && user.role === 'customer' ? (
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleAddToCart(hph)}
                                >
                                    {t('products.add-to-cart')}
                                </button>) : user && user.role==='employee' ?(
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(hph._id,"Headphones")}
                                >
                                    {t('products.delete')}
                                </button>) : (<p />)
                            }
                            </section>
                    </figure>
                ))}
            </section>
        </main>
    );
}

export default ProductList;
