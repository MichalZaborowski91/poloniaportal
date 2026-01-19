import { Route, Routes } from "react-router-dom";
import "./App.css";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>Polonia Portal</h1>} />
      <Route path="/login" element={<h2>Login</h2>} />
      <Route path="/register" element={<h2>Register</h2>} />
      <Route path="*" element={<h2>Not Found</h2>} />
    </Routes>
  );
};
