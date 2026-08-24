import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import Alert from "../components/common/Alert";

function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const change = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const submit = async (event) => {
    event.preventDefault(); setError("");
    if (!form.fullName.trim() || !form.email.trim() || !form.password) return setError("Please complete all required fields.");
    if (form.password.length < 8) return setError("Password must be at least 8 characters.");
    if (form.password !== form.confirmPassword) return setError("Passwords do not match.");
    setLoading(true); const result = await register(form); setLoading(false);
    if (!result.success) return setError(result.message);
    navigate("/login", { state: { registered: true } });
  };
  return <main className="container page-section auth-page"><h1>Create Account</h1><p>Create your TechStore customer account.</p>{error && <Alert type="error">{error}</Alert>}
    <form className="form-card" onSubmit={submit} noValidate>
      <label>Full Name *<input name="fullName" value={form.fullName} onChange={change} required /></label>
      <label>Email *<input name="email" type="email" value={form.email} onChange={change} required /></label>
      <label>Phone<input name="phone" type="tel" value={form.phone} onChange={change} /></label>
      <label>Password *<span className="password-row"><input name="password" type={showPassword ? "text" : "password"} value={form.password} onChange={change} required /><button type="button" onClick={() => setShowPassword((value) => !value)}>{showPassword ? "Hide" : "Show"}</button></span></label>
      <label>Confirm Password *<input name="confirmPassword" type={showPassword ? "text" : "password"} value={form.confirmPassword} onChange={change} required /></label>
      <button className="btn btn--primary" disabled={loading}>{loading ? "Creating account..." : "Create Account"}</button>
    </form><p>Already have an account? <Link to="/login">Login</Link></p></main>;
}
export default RegisterPage;
