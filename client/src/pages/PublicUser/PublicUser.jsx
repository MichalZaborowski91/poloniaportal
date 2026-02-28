import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCountry } from "../../app/useCountry";
import { routes } from "../../app/routes";
import { getUserPublicProfile } from "../../api/user";

export const PublicUser = () => {
  const { displayName } = useParams();
  const country = useCountry();

  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getUserPublicProfile(displayName);
        setData(res);
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, [displayName]);
  if (!data) {
    return <p>Loading...</p>;
  }
  if (!data?.profile) {
    return <p>Loading...</p>;
  }

  const { profile, companies } = data;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      {/* HEADER */}
      <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
        <img
          src={profile.avatar || "/avatar/avt.jpg"}
          alt={profile.displayName}
          onError={(e) => {
            e.currentTarget.src = "/avatar/avt.jpg";
          }}
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            objectFit: "cover",
            display: "block",
          }}
        />
        <div>
          <h1>{profile.displayName}</h1>
          <div>Country: {profile.country?.toUpperCase()}</div>
          <div>Account: {profile.accountType}</div>
          <div>
            Member since: {new Date(profile.memberSince).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* OPTIONAL INFO */}
      <div style={{ marginTop: 20 }}>
        {profile.fullName && <p>Name: {profile.fullName}</p>}
        {profile.city && <p>City: {profile.city}</p>}
        {profile.bio && <p>{profile.bio}</p>}
      </div>
      {profile.email && (
        <p>
          Email: <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </p>
      )}
      {/* COMPANIES */}
      <div style={{ marginTop: 40 }}>
        <h2>Companies</h2>

        {companies.length === 0 && <p>No companies</p>}

        <div style={{ display: "grid", gap: 15 }}>
          {companies.map((company) => (
            <Link
              key={company._id}
              to={routes.companySlug(country, company.slug)}
              style={{
                display: "flex",
                gap: 10,
                border: "1px solid #eee",
                padding: 10,
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <img
                src={company.logo || "/images/company-placeholder.png"}
                alt={company.name}
                style={{
                  width: 60,
                  height: 60,
                  objectFit: "contain",
                }}
              />

              <div>
                <strong>{company.name}</strong>
                <div>
                  {company.city}, {company.country}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
