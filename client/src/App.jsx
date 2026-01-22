import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import "./App.css";
import { Login } from "./pages/Login/Login";
import { ProtectedRoute } from "./routes/ProtectedRoute/ProtectedRoute";
import { Profile } from "./pages/Profile/Profile";

export const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<h1>Home Page - Ogloszenia</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<h2>Register</h2>} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<h2>Not Found</h2>} />
      </Route>
    </Routes>
  );
};
