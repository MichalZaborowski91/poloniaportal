import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Header = () => {
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {};

  return (
    <header>
      <h1>Polonia Portal Logo</h1>
      {!user && (
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      )}
      {user && (
        <div>
          <span>Witaj {user.name}</span>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
};
