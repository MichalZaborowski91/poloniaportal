import { useState } from "react";
import { updateMyProfile } from "../../api/user";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";

export const CompleteProfile = () => {
  const [displayName, setDisplayName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [accountType, setAccountType] = useState("individual");
  const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { refreshUser } = useAuth();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const profileData = {
        displayName,
        firstName,
        lastName,
        accountType,
        companyName: accountType === "business" ? companyName : "",
      };

      await updateMyProfile(profileData);
      toast.success("Twoje dane zostały zapisane");
      await refreshUser();
      //Onboarding flow
      navigate(from, { replace: true });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Complete your profile</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Display name (public) *"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="First name (optional)"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Last name (optional)"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div>
          <label>
            <input
              type="radio"
              checked={accountType === "individual"}
              onChange={() => setAccountType("individual")}
            />
            Individual
          </label>

          <label>
            <input
              type="radio"
              checked={accountType === "business"}
              onChange={() => setAccountType("business")}
            />
            Business
          </label>
        </div>

        {accountType === "business" && (
          <div>
            <input
              type="text"
              placeholder="Company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
        )}

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Save profile</button>
      </form>
    </div>
  );
};
