import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useCountry } from "../app/useCountry";
import { routes } from "../app/routes";

export const PublicOnlyRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const country = useCountry();
  const location = useLocation();

  // ⏳ czekamy aż auth się załaduje
  if (loading) {
    return null; // albo loader
  }

  // 🔐 zalogowany → wywalamy z publicznych stron
  if (user) {
    return (
      <Navigate to={routes.home(country)} replace state={{ from: location }} />
    );
  }

  return children;
};
