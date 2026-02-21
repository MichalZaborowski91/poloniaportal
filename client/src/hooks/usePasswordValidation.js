import { useMemo } from "react";

export const usePasswordValidation = (password, confirmPassword) => {
  const checks = useMemo(
    () => ({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
    }),
    [password],
  );

  const strength = useMemo(() => {
    let score = 0;

    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (checks.uppercase) score += 1;
    if (checks.lowercase) score += 1;
    if (checks.number) score += 1;

    return score; // 0–5
  }, [password, checks]);

  const valid = useMemo(() => Object.values(checks).every(Boolean), [checks]);

  const match = useMemo(
    () => password === confirmPassword,
    [password, confirmPassword],
  );

  return {
    checks,
    strength,
    valid,
    match,
  };
};
