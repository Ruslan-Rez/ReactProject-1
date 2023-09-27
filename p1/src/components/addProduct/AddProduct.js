import React, {useState} from "react";
import {productList} from "../../apiCalls/productApiMockData";
import {Link} from "react-router-dom";
function AddProduct(){
    const [formData, setFormData] = useState({
        _id: '',
        pName: '',
        pCategory: '',
        _price: '',
        pImg: 'default-product-image.png', // Pre-set image
    });
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add the new product to the productList array
        productList.push(formData);
        // Reset the form, including the category field
        setFormData({
            _id: '',
            pName: '',
            pCategory: '',
            _price: '',
            pImg: 'default-product-image.png', // Pre-set image
        });
        window.alert('Product added successfully');
    };
    return (
        <main className="container content-section">
            <h2 className="page-head">Add a New Product</h2>
            <form onSubmit={handleSubmit} className="form">
                <section>
                    <label htmlFor="pName">Product Name:</label>
                    <input
                        type="text"
                        required
                        id="pName"
                        name="pName"
                        value={formData.pName}
                        onChange={handleChange}
                    />
                </section>
                <section>
                    <label htmlFor="pCategory">Product Category:</label>
                    <select
                        id="pCategory"
                        required
                        name="pCategory"
                        value={formData.pCategory}
                        onChange={handleChange}
                    >
                        <option value="">Select Category</option>
                        <option value="Microphone">Microphone</option>
                        <option value="Headphones">Headphones</option>
                    </select>
                </section>
                <section>
                    <label htmlFor="_price">Price:</label>
                    <input
                        type="number"
                        required
                        id="_price"
                        name="_price"
                        value={formData._price}
                        onChange={handleChange}
                    />
                </section>
                <section className="form-btns">
                    <Link to="/products" className="btn btn-primary ">Cancel</Link>
                    <button type="submit" className="btn btn-primary">Add Product</button>
                </section>
            </form>

        </main>
    );
}
export default AddProduct