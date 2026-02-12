import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword, validateResetToken } from "../../api/auth";
import { routes } from "../../app/routes";
import { useCountry } from "../../app/useCountry";

export const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [tokenValid, setTokenValid] = useState(null);

  const { token } = useParams();
  const navigate = useNavigate();
  const country = useCountry();

  const passwordsMatch = password === confirm;
  const canSubmit = password.length >= 6 && passwordsMatch && !loading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) {
      return;
    }

    setError(null);
    setLoading(true);

    try {
      await resetPassword({ token, password });
      setSuccess(true);

      // po 3 sek do login
      setTimeout(() => {
        navigate(routes.login(country), { replace: true });
      }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      const valid = await validateResetToken(token);
      setTokenValid(valid);
    };

    checkToken();
  }, [token]);

  if (tokenValid === null) {
    return <p>Sprawdzanie linku...</p>;
  }

  if (!tokenValid) {
    return (
      <div style={{ padding: 40 }}>
        <h2>Link wygasł lub jest nieprawidłowy</h2>
        <p>Poproś o nowy link do resetu hasła.</p>
      </div>
    );
  }
  if (success) {
    return (
      <div style={{ padding: 40 }}>
        <h2>Hasło zostało zmienione</h2>
        <p>Za chwilę zostaniesz przekierowany do logowania.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Ustaw nowe hasło</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="password"
            placeholder="Nowe hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Powtórz hasło"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </div>

        {!passwordsMatch && confirm.length > 0 && (
          <p style={{ color: "red" }}>Hasła nie są takie same</p>
        )}

        <button type="submit" disabled={!canSubmit}>
          {loading ? "Zapisywanie..." : "Zmień hasło"}
        </button>
      </form>
    </div>
  );
};
