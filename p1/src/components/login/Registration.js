import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function Registration() {
    const { t } = useTranslation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");  // First name state
    const [lastName, setLastName] = useState("");    // Last name state
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const handleRegistration = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, firstName, lastName }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage("Registration successful! Redirecting...");
                setTimeout(() => {
                    navigate("/login"); // Redirect to login page
                }, 2000);
            } else {
                setErrorMessage(data.message || "Registration failed");
            }
        } catch (error) {
            setErrorMessage("An error occurred. Please try again.");
        }
    };

    return (
        <main className="container content-section">
            <h1 className="page-head">{t("registration.form.register")}</h1>
            <section className="form">
                <form className="create" onSubmit={handleRegistration}>
                    <label htmlFor="firstName">{t("registration.form.firstName")}</label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}  // Capture first name
                    />
                    <label htmlFor="lastName">{t("registration.form.lastName")}</label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}  // Capture last name
                    />
                    <label htmlFor="email">{t("registration.form.email")}</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="password">{t("registration.form.password")}</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="confirmPassword">{t("registration.form.confirmPassword")}</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {errorMessage && (
                        <section className="error-message">
                            <span>{errorMessage}</span>
                        </section>
                    )}
                    {successMessage && (
                        <section className="success-message">
                            <span>{successMessage}</span>
                        </section>
                    )}
                    <section className="form-btns">
                        <input className="btn btn-primary" type="submit" value={t("registration.form.register")} />
                    </section>
                </form>
            </section>
        </main>
    );
}

export default Registration;
