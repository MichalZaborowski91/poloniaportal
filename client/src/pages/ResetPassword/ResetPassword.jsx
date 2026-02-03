import { useParams } from "react-router-dom";
import { useState } from "react";
import { resetPassword } from "../../api/auth";

export const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await resetPassword({ token, password });
    setSuccess(true);
  };

  if (success) {
    return <p>Hasło zostało zmienione. Możesz się zalogować.</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        placeholder="Nowe hasło"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Zmień hasło</button>
    </form>
  );
};
