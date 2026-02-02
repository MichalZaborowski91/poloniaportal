import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";

export const ResendVerifyEmailButton = () => {
  const { user } = useAuth();

  const handleResendVerify = async () => {
    try {
      //WHEN WEB DEPLOY CHANGE URL - IMPORTANT
      const res = await fetch("http://localhost:5000/api/auth/resend-verify", {
        method: "POST",
        credentials: "include", //COOKIES
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to send verification email");
      }

      toast.success("Verification email sent");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      {user?.emailVerified === false ? (
        <>
          <button type="button" onClick={handleResendVerify}>
            Resend verification email
          </button>
        </>
      ) : (
        ""
      )}
    </div>
  );
};
