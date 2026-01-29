import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop({ setLoading }) {
  const { pathname } = useLocation();

  useEffect(() => {
    setLoading(true);

    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 600); // loader duration

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
