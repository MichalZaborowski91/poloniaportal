import { renderHook, act } from "@testing-library/react";
import { usePasswordUI } from "./usePasswordUI";
import { describe, test, expect, vi, beforeEach } from "vitest";

describe("usePasswordUI", () => {
  beforeEach(() => {
    vi.useFakeTimers(); //IMPORTANT TIMEOUT 1000ms
  });

  // eslint-disable-next-line no-undef
  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  test("touched is false when password is empty", () => {
    const { result } = renderHook(() => usePasswordUI("", ""));

    expect(result.current.touched).toBe(false);
  });

  test("touched is true when password has value", () => {
    const { result } = renderHook(() => usePasswordUI("Test1234", ""));

    expect(result.current.touched).toBe(true);
  });

  test("sets matchOk after 1s when passwords match", () => {
    const { result, rerender } = renderHook(({ p, c }) => usePasswordUI(p, c), {
      initialProps: { p: "Password1", c: "" },
    });

    rerender({ p: "Password1", c: "Password1" });

    expect(result.current.matchOk).toBe(false);
    expect(result.current.mismatch).toBe(false);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.matchOk).toBe(true);
    expect(result.current.mismatch).toBe(false);
  });

  test("sets mismatch after 1s when passwords do not match", () => {
    const { result, rerender } = renderHook(({ p, c }) => usePasswordUI(p, c), {
      initialProps: { p: "Password1", c: "" },
    });

    rerender({ p: "Password1", c: "Password2" });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.mismatch).toBe(true);
    expect(result.current.matchOk).toBe(false);
  });

  test("validation flags work correctly", () => {
    const { result } = renderHook(() =>
      usePasswordUI("Password1", "Password1"),
    );

    expect(result.current.valid).toBe(true);
    expect(result.current.match).toBe(true);
    expect(result.current.strength).toBeGreaterThan(0);
  });
});
