import { Link } from "react-router";
import { useCart } from "../../context/CartContext";

function ProductCard({ product, onAdded }) {
    const { addToCart } = useCart();

    const isOutOfStock = product.stockQuantity <= 0;
    const isLimitedStock =
        product.stockQuantity > 0 && product.stockQuantity <= 5;

    const handleAddToCart = () => {
        if (isOutOfStock) return;

        const result = addToCart(product, 1);

        if (result?.success && onAdded) {
            onAdded(result.message);
        }
    };

    return (
        <article className="product-card">
            <Link
                to={`/products/${product.id}`}
                className="product-card__image-link"
            >
                <img
                    src={product.image}
                    alt={`${product.name} product image`}
                    className="product-card__image"
                />
            </Link>

            <div className="product-card__content">
                <span className="product-card__category">
                    {product.category}
                </span>

                <h3 className="product-card__title">
                    <Link to={`/products/${product.id}`}>
                        {product.name}
                    </Link>
                </h3>

                <p className="product-card__description">
                    {product.description}
                </p>

                <div className="product-card__footer">
                    <strong className="product-card__price">
                        ${Number(product.price).toFixed(2)}
                    </strong>

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
                            In Stock
                        </span>
                    )}
                </div>

                <button
                    type="button"
                    className="btn btn--primary product-card__button"
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                >
                    {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                </button>
            </div>
        </article>
    );
}

export default ProductCard;