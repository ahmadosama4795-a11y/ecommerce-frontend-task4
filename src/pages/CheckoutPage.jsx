import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { orders as seedOrders } from "../data/orders";
import Alert from "../components/common/Alert";

function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart(); const { currentUser } = useAuth(); const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: currentUser?.fullName || "", email: currentUser?.email || "", phone: currentUser?.phone || "", address: "", city: "", postalCode: "", paymentMethod: "" });
  const [error, setError] = useState(""); const [success, setSuccess] = useState("");
  const change = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const submit = (event) => { event.preventDefault(); setError("");
    if (!cartItems.length) return setError("Your cart is empty.");
    if (["fullName", "email", "phone", "address", "city", "paymentMethod"].some((field) => !form[field].trim())) return setError("Please complete delivery information and select a payment method.");
    const order = { id: `ORD-${Date.now().toString().slice(-7)}`, userId: currentUser.id, customer: form, items: cartItems.map((item) => ({ productId:item.id, name:item.name, quantity:item.quantity, price:item.price })), total:Number(cartTotal), status:"Pending", createdAt:new Date().toISOString() };
    let saved=[]; try { saved=JSON.parse(localStorage.getItem("ecommerce_orders")) || []; } catch { saved=[]; }
    localStorage.setItem("ecommerce_orders", JSON.stringify([...seedOrders, ...saved.filter((item) => !seedOrders.some((seed) => seed.id === item.id)), order]));
    clearCart(); setSuccess(`Order ${order.id} has been created successfully.`); window.setTimeout(() => navigate("/profile"), 1200);
  };
  if (!cartItems.length && !success) return <main className="container page-section"><h1>Checkout</h1><p>Your cart is empty.</p><Link to="/products">Continue Shopping</Link></main>;
  return <main className="container page-section"><h1>Checkout</h1>{success ? <Alert type="success">{success}</Alert> : <div className="checkout-layout"><form className="form-card" onSubmit={submit} noValidate><h2>Delivery Information</h2>{error && <Alert type="error">{error}</Alert>}
    <label>Full Name *<input name="fullName" value={form.fullName} onChange={change}/></label><label>Email *<input type="email" name="email" value={form.email} onChange={change}/></label><label>Phone *<input name="phone" value={form.phone} onChange={change}/></label><label>Address *<input name="address" value={form.address} onChange={change}/></label><label>City *<input name="city" value={form.city} onChange={change}/></label><label>Postal Code<input name="postalCode" value={form.postalCode} onChange={change}/></label><label>Payment Method *<select name="paymentMethod" value={form.paymentMethod} onChange={change}><option value="">Choose a mock payment method</option><option>Cash on Delivery</option><option>Demo Card</option></select></label><button className="btn btn--primary">Place Order</button></form>
    <aside><h2>Order Summary</h2>{cartItems.map((item) => <p key={item.id}>{item.name} × {item.quantity} — ${Number(item.price * item.quantity).toFixed(2)}</p>)}<hr/><strong>Total: ${Number(cartTotal).toFixed(2)}</strong></aside></div>}</main>;
}
export default CheckoutPage;
