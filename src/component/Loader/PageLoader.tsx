import { useState } from "react";
import { BounceLoader } from "react-spinners";

type Props = {
  isShow: boolean;
};

const PageLoader: React.FC<Props> = (props) => {
  return (
    <>
      {props.isShow && (
        <div className="z-50 fixed flex items-center justify-center top-0 w-screen h-screen bg-black opacity-50">
          <BounceLoader color={"#fff"} loading={props.isShow} size={150} />
        </div>
      )}
    </>
  );
};

export default PageLoader;
