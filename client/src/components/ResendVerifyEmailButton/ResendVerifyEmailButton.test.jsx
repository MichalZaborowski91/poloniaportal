import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { ResendVerifyEmailButton } from "./ResendVerifyEmailButton";

vi.mock("../../hooks/useAuth", () => ({
  useAuth: vi.fn(),
}));

vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";

describe("ResendVerifyEmailButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // eslint-disable-next-line no-undef
    global.fetch = vi.fn();
  });

  test("renders button when email is not verified", () => {
    useAuth.mockReturnValue({
      user: { emailVerified: false },
    });

    render(<ResendVerifyEmailButton />);

    expect(
      screen.getByRole("button", {
        name: /wyślij link weryfikacyjny/i,
      }),
    ).toBeInTheDocument();
  });

  test("does not render button when email is verified", () => {
    useAuth.mockReturnValue({
      user: { emailVerified: true },
    });

    render(<ResendVerifyEmailButton />);

    expect(
      screen.queryByRole("button", {
        name: /wyślij link weryfikacyjny/i,
      }),
    ).not.toBeInTheDocument();
  });

  test("calls API and shows success toast", async () => {
    useAuth.mockReturnValue({
      user: { emailVerified: false },
    });

    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });

    render(<ResendVerifyEmailButton />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /wyślij link weryfikacyjny/i,
      }),
    );

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:5000/api/auth/resend-verify",
        expect.objectContaining({
          method: "POST",
          credentials: "include",
        }),
      );
    });

    expect(toast.success).toHaveBeenCalledWith("Verification email sent");
  });

  test("shows error toast when API fails", async () => {
    useAuth.mockReturnValue({
      user: { emailVerified: false },
    });

    fetch.mockResolvedValue({
      ok: false,
      json: async () => ({
        message: "Error sending email",
      }),
    });

    render(<ResendVerifyEmailButton />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /wyślij link weryfikacyjny/i,
      }),
    );

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Error sending email");
    });
  });
});
