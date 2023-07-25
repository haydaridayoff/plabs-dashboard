//import icons from this folder
//also have twotone settings for icons

import Dict from "../../model/Utils/Dict";

const icons = {
  home: {
    gray: require("./home.svg").default,
    white: require("./home-white.svg").default,
  },
  logout: { gray: require("./logout.svg").default },
  service: {
    gray: require("./service.svg").default,
    white: require("./service-white.svg").default,
  },
  project: {
    gray: require("./project.svg").default,
    white: require("./project-white.svg").default,
  },
  about: {
    gray: require("./about.svg").default,
    white: require("./about-white.svg").default,
  },
  work: {
    gray: require("./work.svg").default,
    white: require("./work-white.svg").default,
  },
  career: {
    gray: require("./career.svg").default,
    white: require("./career-white.svg").default,
  },
  contact: {
    gray: require("./contact.svg").default,
    white: require("./contact-white.svg").default,
  },
  ecosystem: {
    gray: require("./ecosystem.svg").default,
    white: require("./ecosystem-white.svg").default,
  },
  eye: {
    on: {
      gray: require("./eye-on-gray.svg").default,
      black: require("./eye-on-black.svg").default,
    },
    off: {
      gray: require("./eye-off-gray.svg").default,
      black: require("./eye-off-black.svg").default,
    },
  },
  add: { gray: require("./add-gray.svg").default },
  burger: { gray: require("./burger.svg").default },
  navSeparator: { gray: require("./nav-separator.svg").default },
  edit: {
    gray: require("./edit-gray.svg").default,
    blue: require("./edit-blue.svg").default,
  },
  cancelEdit: { orange: require("./cancel-edit.svg").default },
  loginBg: { gray: require("./login-bg.svg").default },
  delete: { blue: require("./delete-blue.svg").default },
  search: { gray: require("./search-gray.svg").default },
  info: { blue: require("./info-blue.svg").default },
};

export default icons;
