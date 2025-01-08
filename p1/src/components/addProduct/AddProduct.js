import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { addProduct } from "../../service/productService";

function AddProduct() {
    const { t } = useTranslation();
    const navigate = useNavigate(); // to redirect the user after the product is added
    const [formData, setFormData] = useState({
        pName: "",
        pCategory: "",
        _price: "",
        pImg: "default-product-image.png", // Pre-set image
    });
    const [errorMessage, setErrorMessage] = useState(""); // To display error messages

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check if user is logged in and has the correct role (employee)
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || user.role !== "employee") {
            setErrorMessage(t("add-new.permission-error")); // Display permission error
            return;
        }

        try {
            // Make the API request with the token in the Authorization header
            await addProduct(formData, user.token);
            setFormData({
                pName: "",
                pCategory: "",
                _price: "",
                pImg: "default-product-image.png", // Reset form after success
            });
            window.alert(t("add-new.pop-up"));
            navigate("/products"); // Redirect to the products page after success
        } catch (error) {
            console.error("Error adding product:", error);
            window.alert(t("add-new.error-msg"));
        }
    };

    return (
        <main className="container content-section">
            <h2 className="page-head">{t("add-new.add-new")}</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error */}
            <form onSubmit={handleSubmit} className="form">
                <section>
                    <label htmlFor="pName">{t("add-new.pr-name")}</label>
                    <input
                        type="text"
                        required
                        id="pName"
                        name="pName"
                        value={formData.pName}
                        onChange={handleChange}
                        minLength="3"
                    />
                </section>
                <section>
                    <label htmlFor="pCategory">{t("add-new.pr-cat")}</label>
                    <select
                        id="pCategory"
                        required
                        name="pCategory"
                        value={formData.pCategory}
                        onChange={handleChange}
                    >
                        <option value="">{t("add-new.sel-cat")}</option>
                        <option value="Microphone">{t("add-new.microphones")}</option>
                        <option value="Headphones">{t("add-new.headphones")}</option>
                    </select>
                </section>
                <section>
                    <label htmlFor="_price">{t("add-new.pr-price")}</label>
                    <input
                        type="number"
                        required
                        id="_price"
                        name="_price"
                        value={formData._price}
                        onChange={handleChange}
                        min="10.00"
                        max="10000"
                        step="0.01"
                    />
                </section>
                <section className="form-btns">
                    <Link to="/products" className="btn btn-primary ">
                        {t("add-new.cancel-btn")}
                    </Link>
                    <button type="submit" className="btn btn-primary">
                        {t("add-new.add-btn")}
                    </button>
                </section>
            </form>
        </main>
    );
}

export default AddProduct;
