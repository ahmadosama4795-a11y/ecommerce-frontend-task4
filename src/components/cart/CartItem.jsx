import { useCart } from "../../context/CartContext";

function CartItem({ item, onRemove }) {
    const { updateQuantity } = useCart();

    const handleDecrease = () => {
        if (item.quantity > 1) {
            updateQuantity(item.id, item.quantity - 1);
        }
    };

    const handleIncrease = () => {
        if (item.quantity < item.stockQuantity) {
            updateQuantity(item.id, item.quantity + 1);
        }
    };

    const subtotal = item.price * item.quantity;

    return (
        <article className="cart-item">
            <img
                src={item.image}
                alt={item.name}
                className="cart-item__image"
            />

            <div className="cart-item__info">
                <h3>{item.name}</h3>

                <p>${Number(item.price).toFixed(2)} each</p>

                <div className="cart-item__quantity">
                    <button
                        type="button"
                        onClick={handleDecrease}
                        disabled={item.quantity <= 1}
                        aria-label={`Decrease quantity of ${item.name}`}
                    >
                        −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                        type="button"
                        onClick={handleIncrease}
                        disabled={item.quantity >= item.stockQuantity}
                        aria-label={`Increase quantity of ${item.name}`}
                    >
                        +
                    </button>
                </div>

                {item.quantity >= item.stockQuantity && (
                    <small>
                        Maximum available quantity reached.
                    </small>
                )}
            </div>

            <div className="cart-item__actions">
                <strong>
                    ${Number(subtotal).toFixed(2)}
                </strong>

                <button
                    type="button"
                    className="btn btn--danger"
                    onClick={() => onRemove(item)}
                >
                    Remove
                </button>
            </div>
        </article>
    );
}

export default CartItem;
