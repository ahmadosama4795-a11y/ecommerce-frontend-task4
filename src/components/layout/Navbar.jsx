import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [search, setSearch] = useState("");

    const navigate = useNavigate();
    const { cartCount } = useCart();
    const { currentUser, logout } = useAuth();

    const handleSearch = (event) => {
        event.preventDefault();

        const value = search.trim();

        if (!value) {
            navigate("/products");
            return;
        }

        navigate(`/products?search=${encodeURIComponent(value)}`);
        setSearch("");
        setIsMenuOpen(false);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleLogout = () => {
        logout();
        closeMenu();
        navigate("/");
    };

    return (
        <header className="site-header">
            <nav className="navbar" aria-label="Main navigation">
                <div className="container navbar-inner">
                    <Link
                        to="/"
                        className="navbar-logo"
                        onClick={closeMenu}
                    >
                        TechStore
                    </Link>

                    <form
                        className="navbar-search"
                        onSubmit={handleSearch}
                        role="search"
                    >
                        <label htmlFor="navbar-search" className="sr-only">
                            Search products
                        </label>

                        <input
                            id="navbar-search"
                            type="search"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search products..."
                            className="navbar-search-input"
                        />

                        <button
                            type="submit"
                            className="btn btn-primary navbar-search-button"
                        >
                            Search
                        </button>
                    </form>

                    <button
                        type="button"
                        className="navbar-menu-button"
                        aria-label={
                            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
                        }
                        aria-expanded={isMenuOpen}
                        onClick={() => setIsMenuOpen((previous) => !previous)}
                    >
                        ☰
                    </button>

                    <div
                        className={`navbar-links ${isMenuOpen ? "navbar-links-open" : ""
                            }`}
                    >
                        <NavLink
                            to="/"
                            className="navbar-link"
                            onClick={closeMenu}
                        >
                            Home
                        </NavLink>

                        <NavLink
                            to="/products"
                            className="navbar-link"
                            onClick={closeMenu}
                        >
                            Products
                        </NavLink>

                        <NavLink
                            to="/cart"
                            className="navbar-link"
                            onClick={closeMenu}
                        >
                            Cart
                            {cartCount > 0 && (
                                <span className="cart-badge" aria-label={`${cartCount} items`}>
                                    {cartCount}
                                </span>
                            )}
                        </NavLink>

                        {currentUser ? (
                            <>
                                <NavLink
                                    to="/profile"
                                    className="navbar-link"
                                    onClick={closeMenu}
                                >
                                    Account
                                </NavLink>

                                {currentUser.role === "admin" && (
                                    <NavLink
                                        to="/admin"
                                        className="navbar-link"
                                        onClick={closeMenu}
                                    >
                                        Admin
                                    </NavLink>
                                )}

                                <button
                                    type="button"
                                    className="navbar-logout"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <NavLink
                                    to="/login"
                                    className="navbar-link"
                                    onClick={closeMenu}
                                >
                                    Login
                                </NavLink>

                                <NavLink
                                    to="/register"
                                    className="btn btn-secondary navbar-register"
                                    onClick={closeMenu}
                                >
                                    Create Account
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;