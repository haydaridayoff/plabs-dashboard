import icons from "../../assets/icons/icons";
import images from "../../assets/images/images";

const TopbarLogo: React.FC = (props) => {
  console.log(images.logoHitam183);
  return (
    <div className="flex items-center justify-evenly outline outline-1 outline-gray-200 w-[230px] h-[72px]">
      <img className="w-36 h-auto" src={images.logoHitam183} alt="Logo" />
      <button className="w-6 h-6">
        <img className="w-full h-full" src={icons.burger} alt="Menu" />
      </button>
    </div>
  );
};

export default TopbarLogo;
