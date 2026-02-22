import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { ChangeEmailModal } from "./ChangeEmailModal";
import * as authApi from "../../api/auth";

vi.mock("../../api/auth");

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

const renderModal = () => {
  const onClose = vi.fn();
  render(<ChangeEmailModal onClose={onClose} />);
  return { onClose };
};

describe("ChangeEmailModal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders modal inputs", () => {
    renderModal();

    expect(screen.getByPlaceholderText(/aktualne hasło/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/nowy email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/potwierdź email/i)).toBeInTheDocument();
  });

  test("closes modal on cancel", () => {
    const { onClose } = renderModal();

    fireEvent.click(screen.getByRole("button", { name: /anuluj/i }));

    expect(onClose).toHaveBeenCalled();
  });

  test("submits form successfully", async () => {
    authApi.requestEmailChange.mockResolvedValue({});

    renderModal();

    fireEvent.change(screen.getByPlaceholderText(/aktualne hasło/i), {
      target: { value: "Password1" },
    });

    fireEvent.change(screen.getByPlaceholderText(/nowy email/i), {
      target: { value: "new@test.com" },
    });

    fireEvent.change(screen.getByPlaceholderText(/potwierdź email/i), {
      target: { value: "new@test.com" },
    });

    fireEvent.click(screen.getByText("MockCaptcha"));

    const submitButton = screen.getByRole("button", {
      name: /zmień email/i,
    });

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(authApi.requestEmailChange).toHaveBeenCalledWith({
        currentPassword: "Password1",
        newEmail: "new@test.com",
        country: "pl",
        captchaToken: "captcha-token",
      });
    });

    expect(
      await screen.findByText(/link potwierdzający został wysłany/i),
    ).toBeInTheDocument();
  });

  test("shows error when emails do not match", async () => {
    renderModal();

    fireEvent.change(screen.getByPlaceholderText(/aktualne hasło/i), {
      target: { value: "Password1" },
    });

    fireEvent.change(screen.getByPlaceholderText(/nowy email/i), {
      target: { value: "a@test.com" },
    });

    fireEvent.change(screen.getByPlaceholderText(/potwierdź email/i), {
      target: { value: "b@test.com" },
    });

    fireEvent.click(screen.getByText("MockCaptcha"));

    fireEvent.click(screen.getByRole("button", { name: /zmień email/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/adresy email nie są takie same/i),
      ).toBeInTheDocument();
    });
  });

  test("shows error when API returns INVALID_PASSWORD", async () => {
    authApi.requestEmailChange.mockRejectedValue({
      code: "INVALID_PASSWORD",
    });

    renderModal();

    fireEvent.change(screen.getByPlaceholderText(/aktualne hasło/i), {
      target: { value: "WrongPassword" },
    });

    fireEvent.change(screen.getByPlaceholderText(/nowy email/i), {
      target: { value: "new@test.com" },
    });

    fireEvent.change(screen.getByPlaceholderText(/potwierdź email/i), {
      target: { value: "new@test.com" },
    });

    fireEvent.click(screen.getByText("MockCaptcha"));

    fireEvent.click(screen.getByRole("button", { name: /zmień email/i }));

    await waitFor(() => {
      expect(screen.getByText(/nieprawidłowe hasło/i)).toBeInTheDocument();
    });
  });
});
