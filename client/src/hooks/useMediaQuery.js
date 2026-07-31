import { useEffect, useState } from "react";

export const useMediaQuery = (query) => {
  const getMatches = () => window.matchMedia(query).matches;

  const [matches, setMatches] = useState(getMatches);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const handleChange = (event) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
};
