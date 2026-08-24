import { Link } from "react-router";

function CategoryCard({ category }) {
    return (
        <Link
            to={`/products?category=${encodeURIComponent(category.name)}`}
            className="category-card"
        >
            <div className="category-card__icon" aria-hidden="true">
                {category.icon || "🛍️"}
            </div>

            <div className="category-card__content">
                <h3>{category.name}</h3>

                {category.description && (
                    <p>{category.description}</p>
                )}

                <span>
                    View Products →
                </span>
            </div>
        </Link>
    );
}

export default CategoryCard;