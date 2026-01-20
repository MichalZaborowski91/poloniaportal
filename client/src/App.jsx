import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import "./App.css";

export const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<h1>Home Page - Ogloszenia</h1>} />
        <Route path="/login" element={<h2>Login</h2>} />
        <Route path="/register" element={<h2>Register</h2>} />
        <Route path="*" element={<h2>Not Found</h2>} />
      </Route>
    </Routes>
  );
};
