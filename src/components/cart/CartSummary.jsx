import { Link } from "react-router";
import { useCart } from "../../context/CartContext";

function CartSummary() {
    const { cartCount, cartTotal } = useCart();

    return (
        <aside className="cart-summary">
            <h2>Order Summary</h2>

            <div className="cart-summary__row">
                <span>Items</span>
                <span>{cartCount}</span>
            </div>

            <div className="cart-summary__row cart-summary__total">
                <strong>Total</strong>
                <strong>${Number(cartTotal).toFixed(2)}</strong>
            </div>

            <Link
                to="/checkout"
                className="btn btn--primary cart-summary__checkout"
                aria-disabled={cartCount === 0}
                onClick={(event) => {
                    if (cartCount === 0) {
                        event.preventDefault();
                    }
                }}
            >
                Proceed to Checkout
            </Link>
        </aside>
    );
}

export default CartSummary;