import { useLocation, useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  return (
    <div>
      <h2>Login</h2>

      <p>(Login UI będzie podpięty pod backend w kolejnym kroku)</p>

      <button type="button" onClick={() => navigate(from)}>
        Back
      </button>
    </div>
  );
};
