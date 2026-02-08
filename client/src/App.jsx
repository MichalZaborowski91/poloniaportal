import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { Profile } from "./pages/Profile/Profile";
import { Onboarding } from "./pages/Onboarding/Onboarding";
import { AddOffer } from "./pages/AddOffer/AddOffer";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { ProfileCompletedRoute } from "./routes/ProfileCompletedRoute";
import { DEFAULT_COUNTRY } from "./app/useCountry";
import { Hero } from "./components/Hero/Hero";
import { AccountLayout } from "./pages/Account/AccountLayout/AccountLayout";
import { AccountProfile } from "./pages/Account/AccountProfile/AccountProfile";
import { AccountSecurity } from "./pages/Account/AccountSecurity/AccountSecurity";
import { ListingsPage } from "./pages/Listings/Listings";
import { Terms } from "./pages/Terms/Terms";
import { Privacy } from "./pages/Privacy/Privacy";
import { PublicOnlyRoute } from "./routes/PublicOnlyRoutes";
import { ForgotPassword } from "./pages/ForgotPassword/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword/ResetPassword";
import { About } from "./pages/About/About";

export const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={`/${DEFAULT_COUNTRY}`} replace />}
      />
      <Route path="/:country" element={<Layout />}>
        <Route index element={<Hero />} />
        <Route path="listings" element={<ListingsPage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="about" element={<About />} />
        <Route path="reset-password/:token" element={<ResetPassword />} />
        <Route
          path="forgot-password"
          element={
            <PublicOnlyRoute>
              <ForgotPassword />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="onboarding"
          element={
            <ProtectedRoute>
              <Onboarding />
            </ProtectedRoute>
          }
        />
        <Route
          path="account"
          element={
            <ProtectedRoute>
              <AccountLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AccountProfile />} />
          <Route path="security" element={<AccountSecurity />} />
        </Route>
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
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
    </Routes>
  );
};
