import { Link } from "react-router";

function Footer() {
    return (
        <footer className="site-footer">
            <div className="container footer-grid">
                <div>
                    <h2 className="footer-title">TechStore</h2>
                    <p className="footer-description">
                        A modern training e-commerce store built with React and Vite.
                    </p>
                </div>

                <div>
                    <h3>Quick Links</h3>

                    <ul className="footer-links">
                        <li>
                            <Link to="/">Home</Link>
                        </li>

                        <li>
                            <Link to="/products">Products</Link>
                        </li>

                        <li>
                            <Link to="/cart">Cart</Link>
                        </li>

                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3>Information</h3>

                    <p className="footer-description">
                        This project uses local mock data and is not connected
                        to the backend API in this task.
                    </p>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <p>
                        © 2026 TechStore. Training project.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;