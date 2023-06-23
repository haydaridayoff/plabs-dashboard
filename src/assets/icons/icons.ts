//import icons from this folder
//also have twotone settings for icons

import Dict from "../../model/Utils/Dict";

const icons = {
  home : { gray: require("./home.svg").default, white: require("./home-white.svg").default },
  logout: { gray: require("./logout.svg").default},
  service: { gray: require("./service.svg").default, white: require("./service-white.svg").default },
  project: { gray: require("./project.svg").default, white: require("./project-white.svg").default },
  about: { gray: require("./about.svg").default, white: require("./about-white.svg").default },
  work: { gray: require("./work.svg").default, white: require("./work-white.svg").default },
  career: {gray: require("./career.svg").default, white: require("./career-white.svg").default },
  contact: {gray: require("./contact.svg").default, white: require("./contact-white.svg").default },
  ecosystem: {gray: require("./ecosystem.svg").default, white: require("./ecosystem-white.svg").default },
  burger: {gray: require("./burger.svg").default},
  navSeparator: {gray: require("./nav-separator.svg").default}
};

export default icons;
