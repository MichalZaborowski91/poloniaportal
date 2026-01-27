import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { Profile } from "./pages/Profile/Profile";
import { CompleteProfile } from "./pages/CompleteProfile/CompleteProfile";
import { AddOffer } from "./pages/AddOffer/AddOffer";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { ProfileCompletedRoute } from "./routes/ProfileCompletedRoute";
import { DEFAULT_COUNTRY } from "./app/useCountry";
import { Hero } from "./components/Hero/Hero";

export const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={`/${DEFAULT_COUNTRY}`} replace />}
      />
      <Route path="/:country" element={<Layout />}>
        <Route index element={<Hero />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="complete-profile"
          element={
            <ProtectedRoute>
              <CompleteProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="add-offer"
          element={
            <ProfileCompletedRoute>
              <AddOffer />
            </ProfileCompletedRoute>
          }
        />

        <Route path="*" element={<h2>Not Found</h2>} />
      </Route>
    </Routes>
  );
};
