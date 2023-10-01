import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
function Header(){
    const { t, i18n } = useTranslation();
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng)
    }
    return(
        <header className="main-header">
          <h1 className="ss-name"> <Link to="/">STEAM studio</Link><img src="/img/ss-logo-green.png"/> </h1>
            <nav className="nav main-nav" >
                <ul>
                    <li><Link to="/addProduct">{t('nav.add-new')}</Link></li>
                    <li ><Link to="/products">{t('nav.products')}</Link> </li>
                    <li><Link to="/contact" >{t('nav.contact')}</Link> </li>
                    <li><Link to="/ourValues">{t('nav.our-values')}</Link> </li>
                   <section className="lang-menu">
                    <figure>
                        <img src="/img/globe.png"/>
                    </figure>
                    <ul>
                        <li> <button type="button" onClick={() => changeLanguage('pl')}>Polska</button></li>
                        <li> <button type="button" onClick={() => changeLanguage('en')}>English</button></li>
                        <li> <button type="button" onClick={() => changeLanguage('ua')}>Українська</button></li>
                    </ul>
                </section>
                </ul>

            </nav>

        </header>
    )
}
export default Header