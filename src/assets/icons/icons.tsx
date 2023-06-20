//import icons from this folder
//also have twotone settings for icons
interface Icons {
  [key: string]: string;
}

const icons: Icons = {
  home: require("./home.svg").default,
  logout: require("./logout.svg").default,
};

export default icons;
