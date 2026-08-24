import { useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { useCatalog } from "../context/CatalogContext";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/products/ProductCard";
import EmptyState from "../components/common/EmptyState";

function ProductDetailsPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { products } = useCatalog();

  const product = products.find((item) => item.id === Number(id));

  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  const similarProducts = useMemo(() => {
    if (!product) return [];

    return products
      .filter(
        (item) =>
          item.category === product.category &&
          item.id !== product.id
      )
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <main className="container page-section">
        <EmptyState
          title="Product not found"
          message="The product you are looking for does not exist."
        />

        <div className="text-center">
          <Link to="/products" className="btn btn--primary">
            Back to Products
          </Link>
        </div>
      </main>
    );
  }

  const isOutOfStock = product.stockQuantity <= 0;
  const isLimitedStock =
    product.stockQuantity > 0 && product.stockQuantity <= 5;

  const handleQuantityChange = (event) => {
    const value = Number(event.target.value);

    if (value < 1) {
      setQuantity(1);
      return;
    }

    if (value > product.stockQuantity) {
      setQuantity(product.stockQuantity);
      return;
    }

    setQuantity(value);
  };

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const increaseQuantity = () => {
    setQuantity((current) =>
      Math.min(product.stockQuantity, current + 1)
    );
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return;

    if (quantity > product.stockQuantity) {
      setMessage("You cannot add more than the available stock.");
      return;
    }

    const result = addToCart(product, quantity);

    if (result?.success) {
      setMessage(result.message || "Product added to cart successfully.");
    } else {
      setMessage(result?.message || "Unable to add the product to cart.");
    }
  };

  return (
    <main className="container page-section">
      <div className="page-header">
        <Link to="/products" className="back-link">
          ← Back to Products
        </Link>
      </div>

      <section className="product-details">
        <div className="product-details__image-wrapper">
          <img
            src={product.image || "/images/product.svg"}
            alt={product.name}
            className="product-details__image"
          />
        </div>

        <div className="product-details__content">
          <span className="product-card__category">
            {product.category}
          </span>

          <h1>{product.name}</h1>

          <p className="product-details__description">
            {product.description}
          </p>

          <strong className="product-details__price">
            ${Number(product.price).toFixed(2)}
          </strong>

          <div className="product-details__stock">
            {isOutOfStock ? (
              <span className="stock-status stock-status--out">
                Out of Stock
              </span>
            ) : isLimitedStock ? (
              <span className="stock-status stock-status--limited">
                Only {product.stockQuantity} left
              </span>
            ) : (
              <span className="stock-status stock-status--available">
                In Stock ({product.stockQuantity} available)
              </span>
            )}
          </div>

          {!isOutOfStock && (
            <div className="product-details__purchase">
              <div className="quantity-control">
                <label htmlFor="product-quantity">
                  Quantity
                </label>

                <div className="quantity-control__buttons">
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>

                  <input
                    id="product-quantity"
                    type="number"
                    min="1"
                    max={product.stockQuantity}
                    value={quantity}
                    onChange={handleQuantityChange}
                  />

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    disabled={quantity >= product.stockQuantity}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                type="button"
                className="btn btn--primary"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
              >
                Add {quantity} to Cart
              </button>
            </div>
          )}

          {message && (
            <div className="alert alert--success" role="alert">
              {message}
            </div>
          )}
        </div>
      </section>

      {similarProducts.length > 0 && (
        <section className="page-section">
          <div className="page-header">
            <h2>Similar Products</h2>
            <p>More products from the {product.category} category.</p>
          </div>

          <div className="product-grid">
            {similarProducts.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default ProductDetailsPage;
