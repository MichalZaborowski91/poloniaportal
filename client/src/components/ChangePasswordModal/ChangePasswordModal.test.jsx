import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { ChangePasswordModal } from "./ChangePasswordModal";
import * as authApi from "../../api/auth";

//API
vi.mock("../../api/auth");

//ROUTER / APP
vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

vi.mock("../../app/useCountry", () => ({
  useCountry: () => "pl",
}));

vi.mock("../../hooks/useAuth", () => ({
  useAuth: () => ({
    refreshUser: vi.fn(),
  }),
}));

vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
  },
}));

vi.mock("../Captcha/Captcha", () => ({
  Captcha: ({ onVerify }) => (
    <button onClick={() => onVerify("captcha-token")}>MockCaptcha</button>
  ),
}));

vi.mock("../PasswordStrength/PasswordStrength", () => ({
  PasswordStrength: () => <div>PasswordStrength</div>,
}));

const renderModal = (props = {}) => {
  const onClose = vi.fn();

  render(<ChangePasswordModal onClose={onClose} {...props} />);

  return { onClose };
};

describe("ChangePasswordModal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders modal with inputs", () => {
    renderModal();

    expect(screen.getByPlaceholderText(/aktualne hasło/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/nowe hasło/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/potwierdź hasło/i)).toBeInTheDocument();
  });

  test("closes modal on cancel", () => {
    const { onClose } = renderModal();

    fireEvent.click(screen.getByRole("button", { name: /anuluj/i }));

    expect(onClose).toHaveBeenCalled();
  });

  test("submits form successfully", async () => {
    authApi.changePassword.mockResolvedValue({});
    authApi.logout.mockResolvedValue({});

    renderModal();

    fireEvent.change(screen.getByPlaceholderText(/aktualne hasło/i), {
      target: { value: "OldPassword1" },
    });

    fireEvent.change(screen.getByPlaceholderText(/nowe hasło/i), {
      target: { value: "NewPassword1" },
    });

    fireEvent.change(screen.getByPlaceholderText(/potwierdź hasło/i), {
      target: { value: "NewPassword1" },
    });

    fireEvent.click(screen.getByText("MockCaptcha"));

    const submitButton = screen.getByRole("button", {
      name: /zmień hasło/i,
    });

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(authApi.changePassword).toHaveBeenCalledWith({
        currentPassword: "OldPassword1",
        newPassword: "NewPassword1",
        captchaToken: "captcha-token",
      });
    });

    expect(
      await screen.findByText(/hasło zostało zmienione/i),
    ).toBeInTheDocument();
  });

  test("shows error when current password is invalid", async () => {
    authApi.changePassword.mockRejectedValue({
      code: "INVALID_CURRENT_PASSWORD",
    });

    renderModal();

    fireEvent.change(screen.getByPlaceholderText(/aktualne hasło/i), {
      target: { value: "WrongPassword" },
    });

    fireEvent.change(screen.getByPlaceholderText(/nowe hasło/i), {
      target: { value: "NewPassword1" },
    });

    fireEvent.change(screen.getByPlaceholderText(/potwierdź hasło/i), {
      target: { value: "NewPassword1" },
    });

    fireEvent.click(screen.getByText("MockCaptcha"));

    fireEvent.click(screen.getByRole("button", { name: /zmień hasło/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/nieprawidłowe aktualne hasło/i),
      ).toBeInTheDocument();
    });
  });
});
