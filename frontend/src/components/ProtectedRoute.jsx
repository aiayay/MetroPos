import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// Komponen untuk melindungi route admin
const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  // Jika user tidak login atau bukan admin, redirect ke halaman login
  if (!user || user.level !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

// Komponen untuk melindungi route kasir
const KasirRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  console.log("Current user in KasirRoute:", user); // Tambahkan logging

  // Jika user tidak login atau bukan kasir, redirect ke halaman login
  if (!user || user.level !== "kasir") {
    return <Navigate to="/" />;
  }

  return children;
};

export { AdminRoute, KasirRoute };   