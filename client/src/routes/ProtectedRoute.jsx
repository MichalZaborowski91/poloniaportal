import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useCountry } from "../app/useCountry";
import { routes } from "../app/routes";

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const country = useCountry();

  if (loading) return null;

  if (!user) {
    return (
      <Navigate to={routes.login(country)} replace state={{ from: location }} />
    );
  }

  return children;
};
