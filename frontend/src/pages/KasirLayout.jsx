import React from "react";
import KasirNavbar from "../components/KasirNavbar";
import KasirSidebar from "../components/KasirSidebar";
import KasirNavbarBawah from "../components/KasirNavbarBawah";

const KasirLayout = ({ children }) => {
  return (
    <React.Fragment>
      <KasirNavbar />
      <div className="columns mt-6" style={{ minHeight: "100vh" }}>
        <div className="column is-2">
          <KasirSidebar />
        </div>
        <div className="column">
          <KasirNavbarBawah />
          <main>{children}</main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default KasirLayout;
