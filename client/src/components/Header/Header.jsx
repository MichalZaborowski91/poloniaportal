import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/authActions";
import { Link } from "react-router-dom";
import { clearUser } from "../../utils/authStorage";
export const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    clearUser();
    dispatch(logout());
  };

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
