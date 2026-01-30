import { Resend } from "resend";
console.log("EMAIL SERVICE LOADED");
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerifyEmail = async ({ to, verifyLink }) => {
  console.log("SEND VERIFY EMAIL CALLED");
  console.log("TO:", to);
  console.log("VERIFY LINK:", verifyLink);
  console.log("RESEND KEY EXISTS:", !!process.env.RESEND_API_KEY);
  return resend.emails.send({
    from: process.env.EMAIL_FROM,
    to,
    subject: "Potwierdź swój adres email",
    html: `
      <h2>Witaj 👋</h2>
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
