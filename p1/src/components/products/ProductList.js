import {getProductsApiCall,getProductsByCategoryApiCall} from "../../apiCalls/productApiCalls";
import React from "react";
import { useTranslation } from 'react-i18next';
function ProductList(){
    const micList = getProductsByCategoryApiCall("Microphone")
    const headphoneList = getProductsByCategoryApiCall("Headphones")
    const { t } = useTranslation();
    return(
        <main className="container content-section">
            <h2 className="page-head">{t('products.products')}</h2>
            <h2 className="section-name">{t('products.microphones')}</h2>
            <section className="products">
                {micList.map( mic =>(
                <figure className="product" key={mic._id}>
                    <img className="prod-img" src={`/img/${mic.pImg}`} />
                    <figcaption className="prod-price">{mic._price}</figcaption>
                    <figcaption>{mic.pName}</figcaption>
                </figure>
                ))}

            </section>
            <h2 className="section-name">{t('products.headphones')}</h2>
            <section className="products">
                {headphoneList.map( hph =>(
                <figure className="product">
                    <img className="prod-img" src={`/img/${hph.pImg}`}/>
                    <figcaption className="prod-price">{hph._price}</figcaption>
                    <figcaption>{hph.pName}</figcaption>
                </figure>
                ))}

            </section>
        </main>
    );
}
export default ProductList