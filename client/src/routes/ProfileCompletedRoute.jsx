import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useCountry } from "../app/useCountry";
import { routes } from "../app/routes";

export const ProfileCompletedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const country = useCountry();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return (
      <Navigate to={routes.login(country)} replace state={{ from: location }} />
    );
  }

  if (!user.profileCompleted) {
    return (
      <Navigate
        to={routes.completeProfile(country)}
        replace
        state={{ from: location }}
      />
    );
  }

  return children;
};
