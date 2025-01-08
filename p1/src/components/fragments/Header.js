import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

function Header() {
    const { t, i18n } = useTranslation();
    const [user, setUser] = useState(null); // State to store user info
    const navigate = useNavigate(); // Hook to navigate between pages
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartCount(cart.length);

        window.addEventListener("storage", updateCartCount);

        return () => {
            window.removeEventListener("storage", updateCartCount);
        };
    }, []);

    const updateCartCount = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartCount(cart.length);
    };
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem("cart");
        setUser(null);
        navigate('/login');
    };

    return (
        <header className="main-header">
            <h1 className="ss-name">
                <Link to="/">STEAM studio</Link>
                <img src="/img/ss-logo-green.png" alt="logo" />
            </h1>

            <nav className="nav main-nav">
                <ul>
                    {user && user.role === 'employee' && (
                        <li>
                            <NavLink to="/addProduct">{t('nav.add-new')}</NavLink>
                        </li>                    )}
                    <li>
                        <NavLink to="/products">{t('nav.products')}</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact">{t('nav.contact')}</NavLink>
                    </li>
                    <li>
                        <NavLink to="/ourValues">{t('nav.our-values')}</NavLink>
                    </li>


                    {user ?(

                            <li className="lang-menu user-menu">
                                <button onClick={toggleDropdown}>
                                    Welcome, {user.firstName} <span>▼</span>
                                </button>
                                <ul className={isDropdownOpen ? "open" : ""}>
                                    {user.role === "customer" && (
                                        <>
                                            <li>
                                                <button onClick={() => navigate('/cart')}>
                                                    Cart
                                                </button>
                                            </li>
                                            <li>
                                                <button onClick={() => navigate('/orders')}>
                                                    Orders
                                                </button>
                                            </li>
                                        </>
                                    )}
                                    <li>
                                        <button onClick={handleLogout}>Log Out</button>
                                    </li>
                                </ul>
                            </li>

                        ):
                        <li>
                            <NavLink to="/login">{t('login.form.login')}</NavLink>
                        </li>
                    }


                <section className="lang-menu">
                    <figure>
                        <img src="/img/globe.png" alt="language icon" />
                    </figure>
                    <ul>
                        <li>
                            <button type="button" onClick={() => changeLanguage('pl')}>
                                Polska
                            </button>
                        </li>
                        <li>
                            <button type="button" onClick={() => changeLanguage('en')}>
                                English
                            </button>
                        </li>
                        <li>
                            <button type="button" onClick={() => changeLanguage('ua')}>
                                Українська
                            </button>
                        </li>
                    </ul>
                </section>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
