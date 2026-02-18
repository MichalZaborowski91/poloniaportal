import { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { confirmEmailChange } from "../../api/auth";
import { useCountry } from "../../app/useCountry";
import { routes } from "../../app/routes";

export const ConfirmEmailChange = () => {
  const [status, setStatus] = useState("loading");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const country = useCountry();

  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) {
      return;
    }
    hasRun.current = true;

    const token = searchParams.get("token");

    const verify = async () => {
      if (!token) {
        setStatus("error");
        return;
      }

      try {
        await confirmEmailChange(token);
        setStatus("success");

        setTimeout(() => {
          navigate(routes.login(country), { replace: true });
        }, 2000);
      } catch (err) {
        setStatus("error");
        console.error(err);
      }
    };

    verify();
  }, [searchParams, navigate, country]);

  if (status === "loading") {
    return <h2>Potwierdzanie zmiany email...</h2>;
  }

  if (status === "success") {
    return (
      <h2>
        Email został zmieniony pomyślnie. Za chwilę zostaniesz przekierowany na
        stronę logowania.
      </h2>
    );
  }

  return <h2>Link jest nieprawidłowy lub wygasł.</h2>;
};
