import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { ResetPassword } from "./ResetPassword";
import * as authApi from "../../api/auth";

//MOCK API
vi.mock("../../api/auth");

//useCountry
vi.mock("../../app/useCountry", () => ({
  useCountry: () => "pl",
}));

vi.mock("../../components/PasswordStrength/PasswordStrength", () => ({
  PasswordStrength: () => <div>PasswordStrength</div>,
}));

//ROUTER
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ token: "test-token" }),
  };
});

const renderPage = () =>
  render(
    <BrowserRouter>
      <ResetPassword />
    </BrowserRouter>,
  );

describe("ResetPassword", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("shows loading while validating token", async () => {
    authApi.validateResetToken.mockResolvedValue(true);

    renderPage();

    expect(screen.getByText(/trwa sprawdzanie linku/i)).toBeInTheDocument();
  });

  test("shows error when token invalid", async () => {
    authApi.validateResetToken.mockResolvedValue(false);

    renderPage();

    await waitFor(() => {
      expect(
        screen.getByText(/link wygasł lub jest nieprawidłowy/i),
      ).toBeInTheDocument();
    });
  });

  test("submits new password successfully", async () => {
    authApi.validateResetToken.mockResolvedValue(true);
    authApi.resetPassword.mockResolvedValue({});

    renderPage();

    const passwordInput = await screen.findByPlaceholderText(/nowe hasło/i);
    const confirmInput = screen.getByPlaceholderText(/potwierdź hasło/i);
    const button = screen.getByRole("button", { name: /zmień hasło/i });

    fireEvent.change(passwordInput, {
      target: { value: "Password1" },
    });

    fireEvent.change(confirmInput, {
      target: { value: "Password1" },
    });

    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });

    fireEvent.click(button);

    await waitFor(() => {
      expect(authApi.resetPassword).toHaveBeenCalledWith({
        token: "test-token",
        password: "Password1",
      });
    });

    await waitFor(() => {
      expect(screen.getByText(/hasło zostało zmienione/i)).toBeInTheDocument();
    });
  });

  test("shows API error", async () => {
    authApi.validateResetToken.mockResolvedValue(true);
    authApi.resetPassword.mockRejectedValue({
      message: "Błąd resetu",
    });

    renderPage();

    const passwordInput = await screen.findByPlaceholderText(/nowe hasło/i);
    const confirmInput = screen.getByPlaceholderText(/potwierdź hasło/i);
    const button = screen.getByRole("button", { name: /zmień hasło/i });

    fireEvent.change(passwordInput, {
      target: { value: "Password1" },
    });

    fireEvent.change(confirmInput, {
      target: { value: "Password1" },
    });

    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/błąd resetu/i)).toBeInTheDocument();
    });
  });
});
