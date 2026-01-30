import { useAuth } from "../../hooks/useAuth";

export const VerifyEmailMessage = () => {
  const { user } = useAuth();

  return (
    <div style={{ marginBottom: "16px" }}>
      {user?.emailVerified === false ? (
        <>
          <p style={{ color: "orange", fontWeight: "bold" }}>
            ❌ Email not verified
          </p>
        </>
      ) : (
        <p style={{ color: "green", fontWeight: "bold" }}>✅ Email verified</p>
      )}
    </div>
  );
};
