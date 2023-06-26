import React from "react";
import TopbarNav from "./TopbarNav";

const Topbar: React.FC = (props) => {
  let topbarStyle = "flex w-full h-20 shadow";

  return (
    <header className={topbarStyle}>
      <TopbarNav />
    </header>
  );
};

export default Topbar;
