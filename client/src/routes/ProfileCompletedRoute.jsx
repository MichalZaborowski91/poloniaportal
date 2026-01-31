import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useCountry } from "../app/useCountry";
import { routes } from "../app/routes";

export const ProfileCompletedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const country = useCountry();

  if (loading) {
    return <div>Loading...</div>;
  }

  //NOT LOGGED IN
  if (!user) {
    return (
      <Navigate to={routes.login(country)} replace state={{ from: location }} />
    );
  }

  //EMAIL NOT VERIFIED
  if (!user.emailVerified) {
    return (
      <Navigate
        to={routes.security(country)}
        replace
        state={{ from: location }}
      />
    );
  }

  //PROFILE NOT COMPLETED
  if (!user.profileCompleted) {
    return (
      <Navigate
        to={routes.account(country)}
        replace
        state={{ from: location }}
      />
    );
  }

  //ALL OK
  return children;
};
