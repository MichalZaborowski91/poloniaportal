import { useAuth } from "../../hooks/useAuth";

export const VerifyEmailMessage = ({ showWhenVerified = false }) => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  if (user.emailVerified && !showWhenVerified) {
    return null;
  }

  return (
    <div>
      {user.emailVerified ? (
        <p style={{ color: "green", fontWeight: "bold", margin: 0 }}>
          ✅ Email zweryfikowany
        </p>
      ) : (
        <p style={{ color: "orange", fontWeight: "bold", margin: 0 }}>
          ❌ Email niezweryfikowany
        </p>
      )}
    </div>
  );
};
