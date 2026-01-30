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
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

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
      const response = await login({ email, password, rememberMe });
      await refreshUser();
      if (response.needsProfileOnboarding) {
        navigate(routes.onboarding(country), { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    } catch (error) {
      if (error.message === "Account deleted") {
        setError("To konto zostało usunięte");
      } else {
        setError("Invalid email or password");
      }
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

        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />

          <span
            onClick={() => setShowPassword((prev) => !prev)}
            style={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>
        <div style={{ marginTop: 8 }}>
          <label style={{ cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />{" "}
            Zapamiętaj mnie
          </label>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};
