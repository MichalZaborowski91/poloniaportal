import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

//VERIFY EMAIL
export const sendVerifyEmail = async ({ to, verifyLink }) => {
  return resend.emails.send({
    from: process.env.EMAIL_FROM,
    to,
    subject: "Potwierdź swój adres email",
    html: `
      <h2>Witaj</h2>
      <p>Dziękujemy za rejestrację.</p>
      <p>Kliknij w link poniżej, aby aktywować konto:</p>
      <p>
        <a href="${verifyLink}">
          Aktywuj konto
        </a>
      </p>
      <p>Link jest ważny 24 godziny.</p>
    `,
  });
};

//FORGOT PASSWORD
export const sendResetEmail = async ({ to, resetLink }) => {
  return resend.emails.send({
    from: process.env.EMAIL_FROM,
    to,
    subject: "Reset hasła",
    html: `
      <h2>Reset hasła</h2>
      <p>Kliknij poniżej:</p>
      <a href="${resetLink}">Resetuj hasło</a>
      <p>Link jest ważny 1 godzinę</p>
    `,
  });
};

//CHANGE EMAIL
export const sendEmailChangeVerification = async ({ to, changeLink }) => {
  return resend.emails.send({
    from: process.env.EMAIL_FROM,
    to,
    subject: "Potwierdź zmianę adresu email",
    html: `
      <h2>Zmiana adresu email</h2>
      <p>Otrzymaliśmy prośbę o zmianę adresu email dla Twojego konta.</p>
      <p>Kliknij poniżej, aby potwierdzić zmianę:</p>
      <p>
        <a href="${changeLink}">
          Potwierdź zmianę email
        </a>
      </p>
      <p>Jeśli to nie Ty, zignoruj tę wiadomość.</p>
      <p>Link jest ważny 1 godzinę.</p>
    `,
  });
};
