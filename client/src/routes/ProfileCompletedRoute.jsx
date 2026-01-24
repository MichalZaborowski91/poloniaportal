import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProfileCompletedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!user.profileCompleted) {
    return (
      <Navigate to="/complete-profile" replace state={{ from: location }} />
    );
  }

  return children;
};
