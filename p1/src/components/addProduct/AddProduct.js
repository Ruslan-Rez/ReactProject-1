import React, {useState} from "react";
import {productList} from "../../apiCalls/productApiMockData";
import {Link} from "react-router-dom";
import { useTranslation } from 'react-i18next';
function AddProduct(){
    const { t } = useTranslation();
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
        productList.push(formData);
        setFormData({
            _id: '',
            pName: '',
            pCategory: '',
            _price: '',
            pImg: 'default-product-image.png', // Pre-set image
        });
        window.alert(t('add-new.pop-up'));
    };
    return (
        <main className="container content-section">
            <h2 className="page-head">{t('add-new.add-new')}</h2>
            <form onSubmit={handleSubmit} className="form">
                <section>
                    <label htmlFor="pName">{t('add-new.pr-name')}</label>
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
                    <label htmlFor="pCategory">{t('add-new.pr-cat')}</label>
                    <select
                        id="pCategory"
                        required
                        name="pCategory"
                        value={formData.pCategory}
                        onChange={handleChange}
                    >
                        <option value="">{t('add-new.sel-cat')}</option>
                        <option value="Microphone">{t('add-new.microphones')}</option>
                        <option value="Headphones">{t('add-new.headphones')}</option>
                    </select>
                </section>
                <section>
                    <label htmlFor="_price">{t('add-new.pr-price')}</label>
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
                    <Link to="/products" className="btn btn-primary ">{t('add-new.cancel-btn')}</Link>
                    <button type="submit" className="btn btn-primary">{t('add-new.add-btn')}</button>
                </section>
            </form>

        </main>
    );
}
export default AddProduct