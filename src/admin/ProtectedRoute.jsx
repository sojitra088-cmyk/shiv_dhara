import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { supabase } from "../supabase";
import PageLoader from "../components/PageLoader";

export default function ProtectedRoute() {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        setSession(null);
      } else {
        setSession(data?.session || null);
      }
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session || null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (session === undefined) {
    return <PageLoader />;
  }

  if (!session) return <Navigate to="/admin" replace />;

  return <Outlet />;
}
