import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import ProductCard from "../components/products/ProductCard";
import CategoryCard from "../components/products/CategoryCard";
import Alert from "../components/common/Alert";
import { useCatalog } from "../context/CatalogContext";

function HomePage() {
  const navigate = useNavigate();
  const { products, categories } = useCatalog();
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const featuredProducts = useMemo(
    () => products.filter((product) => product.isActive).slice(0, 8),
    []
  );

  const latestProducts = useMemo(
    () =>
      products
        .filter((product) => product.isActive)
        .slice()
        .reverse()
        .slice(0, 8),
    []
  );

  const handleSearch = (event) => {
    event.preventDefault();

    const query = search.trim();

    if (!query) {
      navigate("/products");
      return;
    }

    navigate(`/products?search=${encodeURIComponent(query)}`);
  };

  const handleAdded = (text) => {
    setMessage(text);

    window.setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <main>
      {message && (
        <div className="container">
          <Alert type="success" message={message} />
        </div>
      )}

      <section className="hero">
        <div className="container hero__content">
          <div className="hero__text">
            <span className="hero__eyebrow">
              Modern Technology Store
            </span>

            <h1>
              Upgrade Your Tech With
              <span> TechStore</span>
            </h1>

            <p>
              Discover quality electronics and modern
              technology products at great prices.
            </p>

            <div className="hero__actions">
              <Link
                to="/products"
                className="btn btn--primary"
              >
                Shop Products
              </Link>

              <Link
                to="/register"
                className="btn btn--secondary"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="home-search">
        <div className="container">
          <form
            className="home-search__form"
            onSubmit={handleSearch}
          >
            <label htmlFor="home-search">
              Search for products
            </label>

            <div className="home-search__controls">
              <input
                id="home-search"
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search products..."
              />

              <button
                type="submit"
                className="btn btn--primary"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="home-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="section-heading__eyebrow">
                Explore
              </span>

              <h2>Shop by Category</h2>
            </div>

            <Link to="/products">
              View All Products →
            </Link>
          </div>

          <div className="category-grid">
            {categories.slice(0, 8).map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="promo-banner">
        <div className="container promo-banner__content">
          <div>
            <span>Special Offer</span>

            <h2>
              Find the technology you need.
            </h2>

            <p>
              Browse our latest collection of
              electronics and accessories.
            </p>
          </div>

          <Link
            to="/products"
            className="btn btn--primary"
          >
            Explore Now
          </Link>
        </div>
      </section>

      <section className="home-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="section-heading__eyebrow">
                Featured
              </span>

              <h2>Featured Products</h2>
            </div>

            <Link to="/products">
              View All →
            </Link>
          </div>

          <div className="product-grid">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdded={handleAdded}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="home-section home-section--muted">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="section-heading__eyebrow">
                New Arrivals
              </span>

              <h2>Latest Products</h2>
            </div>

            <Link to="/products">
              Browse Store →
            </Link>
          </div>

          <div className="product-grid">
            {latestProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdded={handleAdded}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
