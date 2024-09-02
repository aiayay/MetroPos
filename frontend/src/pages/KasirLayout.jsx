import React from "react";
import KasirNavbar from "../components/KasirNavbar";
import KasirSidebar from "../components/KasirSidebar";

const KasirLayout = ({ children }) => {
  return (
    <React.Fragment>
      <KasirNavbar />
      <div className="columns mt-6" style={{ minHeight: "100vh" }}>
        <div className="column is-2">
          <KasirSidebar />
        </div>
        <div className="column has-background-light">
          <main>{children}</main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default KasirLayout;
