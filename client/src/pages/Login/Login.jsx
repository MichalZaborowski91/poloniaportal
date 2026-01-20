import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/auth/authActions";
import { Navigate, useNavigate } from "react-router-dom";
import { saveUser } from "../../utils/authStorage";

export const Login = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleFakeLogin = () => {
    const user = { id: 1, name: "Michal" };
    dispatch(setUser(user));
    saveUser(user);
    navigate("/", { replace: true });
  };
  return (
    <div>
      <h2>Login</h2>
      <button type="button" onClick={handleFakeLogin}>
        Login
      </button>
    </div>
  );
};
