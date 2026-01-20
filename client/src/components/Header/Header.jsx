import { useDispatch, useSelector } from "react-redux";
import { logout, setUser } from "../../redux/auth/authActions";

export const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleFakeLogin = () => {
    dispatch(setUser({ id: 1, name: "Michael" }));
  };

  return (
    <header>
      <h1>Polonia Portal Logo</h1>
      {!user && (
        <div>
          <button type="button" onClick={handleFakeLogin}>
            Login
          </button>
          <button type="button">Register</button>
        </div>
      )}
      {user && (
        <div>
          <span>Witaj {user.name}</span>
          <button type="button" onClick={() => dispatch(logout())}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
};
