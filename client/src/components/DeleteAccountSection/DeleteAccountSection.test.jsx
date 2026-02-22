import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { DeleteAccountSection } from "./DeleteAccountSection";
import * as authApi from "../../api/auth";

vi.mock("../../api/auth");

vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("../Captcha/Captcha", () => ({
  Captcha: ({ onVerify }) => (
    <button onClick={() => onVerify("captcha-token")}>MockCaptcha</button>
  ),
}));

const renderModal = () => {
  const onClose = vi.fn();
  const onDeleted = vi.fn();

  render(<DeleteAccountSection onClose={onClose} onDeleted={onDeleted} />);

  return { onClose, onDeleted };
};

describe("DeleteAccountSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders info step", () => {
    renderModal();

    expect(screen.getByText(/usunięcie konta/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /kontynuuj/i })).toBeDisabled();
  });

  test("goes to confirm step after checkbox", () => {
    renderModal();

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    const continueButton = screen.getByRole("button", {
      name: /kontynuuj/i,
    });

    expect(continueButton).not.toBeDisabled();

    fireEvent.click(continueButton);

    expect(screen.getByPlaceholderText(/aktualne hasło/i)).toBeInTheDocument();
  });

  test("closes modal on cancel", () => {
    const { onClose } = renderModal();

    fireEvent.click(screen.getByRole("button", { name: /anuluj/i }));

    expect(onClose).toHaveBeenCalled();
  });

  test("submits delete successfully", async () => {
    authApi.deleteAccount.mockResolvedValue({});

    const { onClose, onDeleted } = renderModal();

    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: /kontynuuj/i }));

    fireEvent.change(screen.getByPlaceholderText(/aktualne hasło/i), {
      target: { value: "Password1" },
    });

    fireEvent.click(screen.getByText("MockCaptcha"));

    const confirmButton = screen.getByRole("button", {
      name: /potwierdź/i,
    });

    await waitFor(() => {
      expect(confirmButton).not.toBeDisabled();
    });

    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(authApi.deleteAccount).toHaveBeenCalledWith({
        password: "Password1",
        captchaToken: "captcha-token",
      });
    });

    expect(onDeleted).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  test("shows error when password is invalid", async () => {
    authApi.deleteAccount.mockRejectedValue({
      code: "INVALID_PASSWORD",
    });

    renderModal();

    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: /kontynuuj/i }));

    fireEvent.change(screen.getByPlaceholderText(/aktualne hasło/i), {
      target: { value: "wrong" },
    });

    fireEvent.click(screen.getByText("MockCaptcha"));

    fireEvent.click(screen.getByRole("button", { name: /potwierdź/i }));

    await waitFor(() => {
      expect(screen.getByText(/niewłaściwe hasło/i)).toBeInTheDocument();
    });
  });
});
