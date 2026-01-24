import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import "./App.css";
import { Login } from "./pages/Login/Login";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { Profile } from "./pages/Profile/Profile";
import { Register } from "./pages/Register/Register";
import { CompleteProfile } from "./pages/CompleteProfile/CompleteProfile";
import { ProfileCompletedRoute } from "./routes/ProfileCompletedRoute";
import { AddOffer } from "./pages/AddOffer/AddOffer";

export const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<h1>Home Page - Ogloszenia</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/complete-profile"
          element={
            <ProtectedRoute>
              <CompleteProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-offer"
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
