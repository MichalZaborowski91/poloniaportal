import { useEffect, useState } from "react";
import styles from "../HeroInfo/HeroInfo.module.scss";
import { COUNTRIES_PL } from "../../app/countriesPL";
import {
  BsClock,
  BsSun,
  BsCloudSun,
  BsCloud,
  BsCloudRain,
  BsCloudSnow,
  BsCloudFog,
  BsCloudLightning,
} from "react-icons/bs";

export default function HeroInfo({ countryCode = "ie" }) {
  const [time, setTime] = useState("");
  const [weather, setWeather] = useState(null);

  const country = COUNTRIES_PL[countryCode];

  const getWeatherIcon = (code) => {
    if (code === 0) return <BsSun />;
    if (code <= 3) return <BsCloudSun />;
    if (code === 45 || code === 48) return <BsCloudFog />;
    if (code >= 51 && code <= 67) return <BsCloudRain />;
    if (code >= 71 && code <= 77) return <BsCloudSnow />;
    if (code >= 80 && code <= 82) return <BsCloudRain />;
    if (code >= 95) return <BsCloudLightning />;

    return <BsCloud />;
  };

  useEffect(() => {
    let interval;

    const updateTime = () => {
      const t = new Intl.DateTimeFormat("pl-PL", {
        timeZone: country.timezone,
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date());

      setTime(t);
    };

    updateTime();

    const now = new Date();
    const delay = 60000 - now.getSeconds() * 1000;

    const timeout = setTimeout(() => {
      updateTime();

      interval = setInterval(updateTime, 60000);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [country.timezone]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${country.lat}&longitude=${country.lon}&current_weather=true`,
        );

        const data = await res.json();
        setWeather(data.current_weather);
      } catch (err) {
        console.error("Weather error:", err);
      }
    };

    fetchWeather();

    const interval = setInterval(fetchWeather, 600000);

    return () => clearInterval(interval);
  }, [country.lat, country.lon]);

  if (!country) return null;

  return (
    <div className={styles.heroInfo}>
      <div className={styles.capital}>{country.capital}:</div>

      <div className={styles.meta}>
        <BsClock className={styles.clock} />
        <span>{time}</span>
        <span className={styles.weather}>
          {weather ? (
            <>
              {getWeatherIcon(weather.weathercode)}
              {Math.round(weather.temperature)}°C
            </>
          ) : (
            "…"
          )}
        </span>
      </div>
    </div>
  );
}
