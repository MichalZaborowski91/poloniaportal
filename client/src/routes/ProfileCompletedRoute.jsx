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
      <Navigate to={routes.login(country)} state={{ from: location }} replace />
    );
  }

  //EMAIL NOT VERIFIED
  if (!user.emailVerified) {
    return (
      <Navigate
        to={routes.security(country)}
        state={{ from: location }}
        replace
      />
    );
  }

  //PROFILE NOT COMPLETED
  if (!user.profileCompleted) {
    return (
      <Navigate
        to={routes.account(country)}
        state={{ from: location }}
        replace
      />
    );
  }

  //ALL OK
  return children;
};
