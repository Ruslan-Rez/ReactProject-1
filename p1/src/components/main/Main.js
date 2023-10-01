import {Link} from "react-router-dom";
import React from "react";
import { useTranslation } from 'react-i18next';
function Main(){
    const { t } = useTranslation();
    return(
        <main>
            <section className="home-head">
                <h1 className="ss-name-home">{t('main-page.header')} </h1>
            </section>
            <section className="container content-section">
                <section className="text-image-block">
                <section className="desc">
                    <h2 className="section-name">{t('main-page.explore-head')}</h2>
                    <aside>
                        {t('main-page.explore-content')}
                    </aside>
                    <section className="form-btns">
                    <Link to="/products" className="btn btn-primary ">{t('main-page.explore-btn')}</Link>
                    </section>
                </section>
                <figure>
                    <img src="/img/val1.jpeg" alt="a computer and a microphone"/>
                </figure>
                </section>
                <section className="text-image-block">
                    <figure>
                        <img src="/img/val2.png" alt="man holding a microphone"/>
                    </figure>
                    <section className="desc">
                        <h2 className="section-name">{t('main-page.values-head')}</h2>
                        <aside>
                            {t('main-page.values-content')}
                        </aside>
                        <section className="form-btns">
                            <Link to="/ourValues" className="btn btn-primary ">{t('main-page.values-btn')}</Link>
                        </section>
                    </section>
                </section>
            </section>
        </main>
    );
}
export default Main