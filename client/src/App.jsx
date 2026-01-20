import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import "./App.css";
import { Login } from "./pages/Login/Login";
import { useEffect } from "react";
import { getUser } from "./utils/authStorage";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/auth/authActions";

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedUser = getUser();
    if (savedUser) {
      dispatch(setUser(savedUser));
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<h1>Home Page - Ogloszenia</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<h2>Register</h2>} />
        <Route path="*" element={<h2>Not Found</h2>} />
      </Route>
    </Routes>
  );
};
