import { Link } from "react-router";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import ConfirmDialog from "../components/common/ConfirmDialog";
import EmptyState from "../components/common/EmptyState";

function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [target, setTarget] = useState(null);
  const [clearing, setClearing] = useState(false);
  if (!cartItems.length) return <main className="container page-section"><h1>Your Cart</h1><EmptyState title="Your cart is empty" message="Add a product to get started." action={<Link className="btn btn--primary" to="/products">Continue Shopping</Link>} /></main>;
  return <main className="container page-section"><div className="section-heading"><div><h1>Your Cart</h1><p>{cartItems.length} product{cartItems.length !== 1 ? "s" : ""} ready for checkout.</p></div><button className="btn btn--danger" onClick={() => setClearing(true)}>Clear Cart</button></div><div className="cart-layout"><section>{cartItems.map((item) => <CartItem key={item.id} item={item} onRemove={setTarget} />)}</section><CartSummary /></div>
    <ConfirmDialog isOpen={Boolean(target)} onClose={() => setTarget(null)} onConfirm={() => { removeFromCart(target.id); setTarget(null); }} title="Remove item?" message={target ? `Remove ${target.name} from your cart?` : ""} confirmText="Remove" />
    <ConfirmDialog isOpen={clearing} onClose={() => setClearing(false)} onConfirm={() => { clearCart(); setClearing(false); }} title="Clear cart?" message="This will remove all items from your cart." confirmText="Clear Cart" />
  </main>;
}
export default CartPage;
