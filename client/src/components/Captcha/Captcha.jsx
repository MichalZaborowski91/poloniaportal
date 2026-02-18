import { forwardRef, useImperativeHandle, useRef } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import styles from "../Captcha/Captcha.module.scss";

export const Captcha = forwardRef(({ onVerify, onExpire }, ref) => {
  const innerRef = useRef(null);

  useImperativeHandle(ref, () => ({
    resetCaptcha: () => innerRef.current?.resetCaptcha(),
  }));

  return (
    <div className={styles.captcha}>
      <HCaptcha
        sitekey={import.meta.env.VITE_HCAPTCHA_SITE_KEY}
        onVerify={(token) => {
          onVerify(token);
        }}
        onExpire={() => {
          onExpire?.();
        }}
        ref={innerRef}
      />
    </div>
  );
});
