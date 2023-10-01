import { useTranslation } from 'react-i18next';
function OurValues(){
    const { t } = useTranslation();

    return(
        <main className="container content-section">
               <h2 className="page-head">{t('our-values.our-values')}</h2>
                <figure className="head-img" >
                    <img src="/img/val2.png" alt="two people talking at a podcast"/>
                <figcaption>
                    {t('our-values.head-start')}
                    <span className="ss-name-text">STEAM studio</span>
                    {t('our-values.head-text-one')}
                    <span className="ss-name-text">STEAM studio</span>
                    {t('our-values.head-text-two')}
                    </figcaption>
                </figure>
                <section className="text-image-block">
                    <section className="desc">
                        <h2 className="section-name">{t('our-values.craft-head')}</h2>
                        <aside>
                            {t('our-values.craft-text')}
                        </aside>
                    </section>
                    <figure>
                        <img src="/img/val1.jpeg" alt="a computer and a microphone"/>
                    </figure>
                </section>
                <section className="text-image-block">
                    <figure>
                        <img src="/img/val4.jpg" alt="man holding a microphone"/>
                    </figure>
                    <section className="desc">
                    <h2 className="section-name">{t('our-values.innovation-head')}</h2>
                    <aside>
                        {t('our-values.innovation-text')}
                    </aside>
                </section>
                </section>
                    <section className="text-image-block">
                <section className="desc">
                    <h2 className="section-name">{t('our-values.customer-head')}</h2>
                    <aside>
                        {t('our-values.customer-text')}
                    </aside>
                </section>
                        <figure>
                            <img src="/img/val3.webp" alt="woman smiling in front of a microphone"/>
                        </figure>
            </section>
        </main>
    );
}
export default OurValues