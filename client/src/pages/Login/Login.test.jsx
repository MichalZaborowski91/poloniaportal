import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { Login } from "./Login";
import * as authApi from "../../api/auth";

//MOCK API
vi.mock("../../api/auth");

//useAuth
const refreshUserMock = vi.fn();
vi.mock("../../hooks/useAuth", () => ({
  useAuth: () => ({
    refreshUser: refreshUserMock,
  }),
}));

//useCountry
vi.mock("../../app/useCountry", () => ({
  useCountry: () => "pl",
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ state: null }),
  };
});

//TOAST
vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
  },
}));

vi.mock("../../components/Captcha/Captcha", () => ({
  Captcha: () => <div>captcha</div>,
}));

const renderLogin = () => {
  return render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>,
  );
};

describe("Login", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
  });

  test("renders login form", () => {
    renderLogin();

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/hasło/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("enables submit and calls API", async () => {
    authApi.login.mockResolvedValue({});

    renderLogin();

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/hasło/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    //INPUT DATA
    fireEvent.change(emailInput, {
      target: { value: "test@test.com" },
    });

    fireEvent.change(passwordInput, {
      target: { value: "Password1" },
    });

    //BUTTON SHOULD ENABLE
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(authApi.login).toHaveBeenCalledWith({
        email: "test@test.com",
        password: "Password1",
        rememberMe: false,
        captchaToken: undefined,
      });
    });

    //REFRESH USER AFTER LOGIN
    expect(refreshUserMock).toHaveBeenCalled();
  });

  test("shows error when login fails", async () => {
    authApi.login.mockRejectedValue({
      status: 401,
    });

    renderLogin();

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "test@test.com" },
    });

    fireEvent.change(screen.getByPlaceholderText(/hasło/i), {
      target: { value: "WrongPass" },
    });

    const button = screen.getByRole("button", { name: /login/i });

    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });

    fireEvent.click(button);

    await waitFor(() => {
      expect(
        screen.getByText(/nieprawidłowy email lub hasło/i),
      ).toBeInTheDocument();
    });
  });
});
