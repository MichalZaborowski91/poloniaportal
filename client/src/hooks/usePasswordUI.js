import { useState, useEffect } from "react";
import { usePasswordValidation } from "./usePasswordValidation";

export const usePasswordUI = (password, confirmPassword) => {
  const [mismatch, setMismatch] = useState(false);
  const [matchOk, setMatchOk] = useState(false);

  const { checks, strength, valid, match } = usePasswordValidation(
    password,
    confirmPassword,
  );

  const touched = password.length > 0;

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!confirmPassword) {
        setMismatch(false);
        setMatchOk(false);
        return;
      }

      if (match) {
        setMismatch(false);
        setMatchOk(true);
      } else {
        setMismatch(true);
        setMatchOk(false);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [confirmPassword, match]);

  return {
    touched,
    mismatch,
    matchOk,
    checks,
    strength,
    valid,
    match,
  };
};
