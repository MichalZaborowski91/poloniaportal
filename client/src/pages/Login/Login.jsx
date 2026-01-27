import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../../api/auth";
import { useAuth } from "../../hooks/useAuth";
import { useCountry } from "../../app/useCountry";
import { routes } from "../../app/routes";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const country = useCountry();

  const location = useLocation();
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const from = location.state?.from?.pathname || routes.home(country);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login({ email, password });
      await refreshUser();
      navigate(from, { replace: true });
    } catch (error) {
      setError("Invalid email or password");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};
