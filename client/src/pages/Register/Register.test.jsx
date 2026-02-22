import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { Register } from "./Register";
import * as authApi from "../../api/auth";

//MOCK API
vi.mock("../../api/auth");

const renderRegister = () => {
  return render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>,
  );
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("Register", () => {
  test("renders register form", () => {
    renderRegister();

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/^hasło$/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/potwierdź hasło/i)).toBeInTheDocument();
  });

  test("submits form with valid data", async () => {
    authApi.register.mockResolvedValue({});

    renderRegister();

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "test@test.com" },
    });

    fireEvent.change(screen.getByPlaceholderText(/^hasło$/i), {
      target: { value: "Password1" },
    });

    fireEvent.change(screen.getByPlaceholderText(/potwierdź hasło/i), {
      target: { value: "Password1" },
    });

    fireEvent.click(screen.getByRole("checkbox"));

    const submitButton = screen.getByRole("button", { name: /rejestruj/i });

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(authApi.register).toHaveBeenCalledTimes(1);
    });
  });

  test("shows error when API fails", async () => {
    authApi.register.mockRejectedValue({
      status: 409,
      data: { errorCode: "USER_ALREADY_EXISTS" },
    });

    renderRegister();

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "test@test.com" },
    });

    fireEvent.change(screen.getByPlaceholderText(/^hasło$/i), {
      target: { value: "Password1" },
    });

    fireEvent.change(screen.getByPlaceholderText(/potwierdź hasło/i), {
      target: { value: "Password1" },
    });

    fireEvent.click(screen.getByRole("checkbox"));

    const button = screen.getByRole("button", { name: /rejestruj/i });

    await waitFor(() => expect(button).not.toBeDisabled());

    fireEvent.click(button);

    await waitFor(() => {
      expect(
        screen.getByText(/użytkownik o tym adresie email już istnieje/i),
      ).toBeInTheDocument();
    });
  });
});
