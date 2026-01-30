import { useState } from "react";
import { register } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useCountry } from "../../app/useCountry";
import { routes } from "../../app/routes";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successRegister, setSuccessRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const country = useCountry();

  //VALIDATION
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
  };

  const passwordValid = Object.values(passwordChecks).every(Boolean);
  const passwordsMatch = password === confirmPassword;

  const canSubmit = emailValid && passwordValid && passwordsMatch && !loading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await register({ email, password });
      setSuccessRegister(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  //SUCCESS INFO
  if (successRegister) {
    return (
      <div>
        <h2>Rejestracja zakończona 🎉</h2>

        <p>
          Gratulacje! Rejestracja powiodła się.
          <br />
          Sprawdź email w celu aktywacji konta.
        </p>

        <button onClick={() => navigate(routes.login(country))}>
          Przejdź do logowania
        </button>
      </div>
    );
  }

  //REGISTER FORM
  return (
    <div>
      <h2>Register</h2>

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

        <div style={{ position: "relative" }}>
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <span
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            style={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            {showConfirmPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {confirmPassword && !passwordsMatch && (
          <p style={{ color: "red" }}>Hasła nie są takie same</p>
        )}

        <ul style={{ listStyle: "none", paddingLeft: 0, marginTop: 8 }}>
          <li style={{ color: passwordChecks.length ? "green" : "red" }}>
            • Minimum 8 znaków
          </li>
          <li style={{ color: passwordChecks.uppercase ? "green" : "red" }}>
            • Jedna duża litera
          </li>
          <li style={{ color: passwordChecks.lowercase ? "green" : "red" }}>
            • Jedna mała litera
          </li>
          <li style={{ color: passwordChecks.number ? "green" : "red" }}>
            • Jedna cyfra
          </li>
        </ul>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={!canSubmit}>
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>
    </div>
  );
};
