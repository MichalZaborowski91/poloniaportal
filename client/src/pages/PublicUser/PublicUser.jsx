import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCountry } from "../../app/useCountry";
import { routes } from "../../app/routes";
import { getUserPublicProfile } from "../../api/user";
import styles from "../PublicUser/PublicUser.module.scss";
import { COUNTRIES_PL } from "../../app/countriesPL";

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
    <div className={styles.publicUser}>
      <aside className={styles.publicUser__aside}>
        <img
          src={profile.avatar || "/avatar/avt.jpg"}
          alt={profile.displayName}
          onError={(e) => {
            e.currentTarget.src = "/avatar/avt.jpg";
          }}
          className={styles.publicUser__avatar}
        />
        <div className={styles.publicUser__adCard}>Reklama</div>
      </aside>
      <main className={styles.publicUser__main}>
        <h2 className={styles.publicUser__displayName}>
          {profile.displayName}
        </h2>

        <div className={styles.publicUser__info}>
          {profile.fullName && <p>Nazwa: {profile.fullName}</p>}
          {profile.country && COUNTRIES_PL[profile.country] && (
            <p>
              Kraj: {COUNTRIES_PL[profile.country].name}{" "}
              <img
                src={COUNTRIES_PL[profile.country].flag}
                alt={COUNTRIES_PL[profile.country].name}
                className={styles.publicUser__flag}
              />
            </p>
          )}
          {profile.city && <p>Miasto: {profile.city}</p>}
          {profile.bio && <p>Bio: {profile.bio}</p>}
          <p>Typ konta: {profile.accountType}</p>
          <p>
            Użytkownik od:{" "}
            {new Date(profile.memberSince).toLocaleDateString("pl-PL")}
          </p>
          {profile.email && (
            <p>
              Email: <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </p>
          )}
        </div>
        {companies.length > 0 && (
          <div>
            <h2 className={styles.publicUser__myCompanies}>Moje firmy</h2>
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
        )}
      </main>
    </div>
  );
};
