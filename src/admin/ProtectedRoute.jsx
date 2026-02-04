import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { supabase } from "../supabase";

export default function ProtectedRoute() {
  const [session, setSession] = useState(undefined); // undefined = checking

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // Still checking session
  if (session === undefined) return null;

  // Not logged in
  if (!session) return <Navigate to="/admin" replace />;

  // Logged in
  return <Outlet />;
}
