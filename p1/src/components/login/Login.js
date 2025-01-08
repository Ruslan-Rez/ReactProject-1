import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link,useNavigate } from 'react-router-dom';

function Login() {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Store user data in localStorage
                const user = {
                    firstName: data.firstName, // Assuming firstName is returned
                    role: data.role, // Assuming role is returned
                    token: data.token,
                };

                localStorage.setItem('user', JSON.stringify(user)); // Save to localStorage
                localStorage.removeItem("cart");


                setErrorMessage(''); // Clear any previous error message

                // Trigger page reload after login
                window.location.reload(); // This will reload the app and update the UI with the new user data
            } else {
                setErrorMessage(data.message || 'Login failed');
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
        }
    };

    return (
        <main className="container content-section">
            <h1 className="page-head">{t('login.form.login')}</h1>
            <section className="form">
                <form className="create" onSubmit={handleLogin}>
                    <label htmlFor="email">{t('login.form.email')}</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="password">{t('login.form.password')}</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errorMessage && (
                        <section className="error-message">
                            <span>{errorMessage}</span>
                        </section>
                    )}
                    <section className="form-btns">
                        <input
                            className="btn btn-primary"
                            type="submit"
                            value={t('login.form.login')}
                        />
                    </section>
                    <section className="login-links">
                        <Link className="location" to="/login/registration">
                            {t("login.creation.header")}
                        </Link>
                    </section>
                </form>
            </section>
        </main>
    );
}

export default Login;
