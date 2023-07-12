import React, { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Content from "../component/Content/Content";

const About = () => {
  // OLD CODE
  // let { search } = useLocation();
  // let query = new URLSearchParams(search);

  let [query, setQuery] = useSearchParams();
  const navigator = useNavigate();
  let tab = query.get("tabStatus");

  useEffect(() => {
    if (!tab) {
      navigator("/about?tabStatus=about");
    }
  }, [tab]);

  console.log(tab);
  return (
    <>
      <Content>
        <Link to="/about?tabStatus=about">About</Link>
        <Link to="/about?tabStatus=ecosystem">Ecosystem</Link>
        <Link to="/about?tabStatus=partner">Partner</Link>
        <Link to="/about?tabStatus=people">People</Link>
      </Content>
    </>
  );
};

export default About;
