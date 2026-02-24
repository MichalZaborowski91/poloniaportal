import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCompanyBySlug } from "../../../api/company";
import { routes } from "../../../app/routes";
import { useCountry } from "../../../app/useCountry";

export const PublicCompany = () => {
  const { slug } = useParams();
  const [company, setCompany] = useState(null);

  const country = useCountry();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getCompanyBySlug(slug);
        setCompany(data);
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, [slug]);

  return (
    <div>
      <div
        style={{
          width: "150px",
          height: "150px",
          border: "1px solid #eee",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff",
        }}
      >
        <img
          src={company?.logo || "/images/company-placeholder.png"}
          alt={company?.name || "Company"}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
          }}
        />
      </div>

      <h1>{company?.name || "Loading..."}</h1>

      <p>{company?.description || ""}</p>

      <h3>Contact</h3>
      <p>Phone: {company?.phone || ""}</p>
      <p>Email: {company?.email || ""}</p>
      <p>
        Location: {company?.city || ""}, {company?.country || ""}
      </p>

      {company?.ownerId?.profile?.displayName && (
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Link
            to={routes.userPublic(
              country,
              company.ownerId.profile.displayNameNormalized,
            )}
          >
            <img
              src={company.ownerId.profile.avatar || "/avatar/avt.jpg"}
              alt={company.ownerId.profile.displayName}
              onError={(e) => {
                e.currentTarget.src = "/avatar/avt.jpg";
              }}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            {company.ownerId.profile.displayName}
          </Link>
        </div>
      )}
    </div>
  );
};
