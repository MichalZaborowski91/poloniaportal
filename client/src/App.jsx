import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { Onboarding } from "./pages/Onboarding/Onboarding";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { ProfileCompletedRoute } from "./routes/ProfileCompletedRoute";
import { DEFAULT_COUNTRY } from "./app/useCountry";
import { AccountLayout } from "./pages/Account/AccountLayout/AccountLayout";
import { AccountProfile } from "./pages/Account/AccountProfile/AccountProfile";
import { AccountSecurity } from "./pages/Account/AccountSecurity/AccountSecurity";
import { ListingsPage } from "./pages/Listings/Listings";
import { Terms } from "./pages/Terms/Terms";
import { Privacy } from "./pages/Privacy/Privacy";
import { Copyrights } from "./pages/Copyrights/Copyrights";
import { PublicOnlyRoute } from "./routes/PublicOnlyRoutes";
import { ForgotPassword } from "./pages/ForgotPassword/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword/ResetPassword";
import { About } from "./pages/About/About";
import { ConfirmEmailChange } from "./pages/ConfirmEmailChange/ConfirmEmailChange";
import { CompaniesLayout } from "./pages/Companies/CompaniesLayout/CompaniesLayout";
import { CompaniesList } from "./pages/Companies/CompaniesList/CompaniesList";
import { AddCompany } from "./pages/Companies/AddCompany/AddCompany";
import { PublicCompany } from "./pages/Companies/PublicCompany/PublicCompany";
import { PublicUser } from "./pages/PublicUser/PublicUser";
import { EditCompany } from "./pages/Companies/EditCompany/EditCompany";
import { Pricing } from "./pages/Pricing/Pricing";
import { PublishCompany } from "./pages/Companies/PublishCompany/PublishCompany";
import { CompaniesDatabase } from "./pages/Companies/CompaniesDatabase/CompaniesDatabase";
import { HomePage } from "./pages/HomePage/HomePage";
import { AddOfferPage } from "./pages/AddOfferPage/AddOfferPage";

export const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={`/${DEFAULT_COUNTRY}`} replace />}
      />
      <Route path="/:country" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="listings" element={<ListingsPage />} />
        <Route path="companies" element={<CompaniesDatabase />} />
        <Route path="company/:slug" element={<PublicCompany />} />
        <Route path="user/:displayName" element={<PublicUser />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="about" element={<About />} />
        <Route path="reset-password/:token" element={<ResetPassword />} />
        <Route path="confirm-email-change" element={<ConfirmEmailChange />} />
        <Route path="pricing" element={<Pricing />} />
        <Route
          path="forgot-password"
          element={
            <PublicOnlyRoute>
              <ForgotPassword />
            </PublicOnlyRoute>
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
          path="account/companies"
          element={
            <ProtectedRoute>
              <CompaniesLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="publish/:id"
            element={
              <ProtectedRoute>
                <PublishCompany />
              </ProtectedRoute>
            }
          />
          <Route index element={<CompaniesList />} />
          <Route path="add" element={<AddCompany />} />
          <Route path="edit/:id" element={<EditCompany />} />
        </Route>
        <Route
          path="add-offer"
          element={
            <ProfileCompletedRoute>
              <AddOfferPage />
            </ProfileCompletedRoute>
          }
        />

        <Route path="*" element={<h2>Not Found</h2>} />
      </Route>
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/copyrights" element={<Copyrights />} />
    </Routes>
  );
};
