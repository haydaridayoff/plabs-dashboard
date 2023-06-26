import React from "react";

interface Props {
  children?: React.ReactNode;
  className?: string;
  isLast?: boolean;
  title: string;
}

const Section: React.FC<Props> = (props) => {
  let sectionStyle = "";

  return (
    <section className={`${props.className}`}>
      <h2>{props.title}</h2>
      {props.children}
    </section>
  );
};

export default Section;
