import React from "react";
import TopbarLogo from "./TopbarLogo";
import TopbarNav from "./TopbarNav";

const Topbar: React.FC = (props) => {
  return (
    <header className="fixed flex w-full h-[72px] shadow">
      <TopbarLogo />
      <TopbarNav />
    </header>
  );
};

export default Topbar;
