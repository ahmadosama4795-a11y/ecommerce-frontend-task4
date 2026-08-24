import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    const result = await login(
      formData.email,
      formData.password
    );

    setLoading(false);

    if (!result.success) {
      setError(result.message || "Login failed.");
      return;
    }

    const destination =
      location.state?.from?.pathname || "/";

    navigate(destination, { replace: true });
  };

  return (
    <main className="container page-section">
      <h1>Login</h1>

      <p>Sign in to your TechStore account.</p>

      {error && (
        <p role="alert">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label htmlFor="password">
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>

      <p>
        Don't have an account?{" "}
        <Link to="/register">
          Create Account
        </Link>
      </p>
    </main>
  );
}

export default LoginPage;