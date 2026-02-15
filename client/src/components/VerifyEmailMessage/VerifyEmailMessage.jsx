import { useAuth } from "../../hooks/useAuth";

export const VerifyEmailMessage = () => {
  const { user } = useAuth();

  return (
    <div style={{ marginBottom: "16px", margin: "0" }}>
      {user?.emailVerified === false ? (
        <>
          <p style={{ color: "orange", fontWeight: "bold", margin: "0" }}>
            ❌ Email nie zweryfikowany
          </p>
        </>
      ) : (
        <p style={{ color: "green", fontWeight: "bold", margin: "0" }}>
          ✅ Email zweryfikowany
        </p>
      )}
    </div>
  );
};
