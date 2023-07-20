import { useEffect } from "react";
import icons from "../../assets/icons/icons";

type Props = {
  title: string;
  children?: React.ReactNode;
  onConfirm: (event: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
};

const DialogForm: React.FC<Props> = (props) => {
  return (
    <>
      <div className="absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-50">
        <dialog
          open={true}
          className={`fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] p-6 w-[37.5rem] rounded-xl font-jakarta`}
        >
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <h3 className="font-bold text-base text-left">{props.title}</h3>
              <button
                type="button"
                className="w-4 h-4"
                onClick={props.onCancel}
              >
                <img
                  src={icons.cancelEdit.orange}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </button>
            </div>
            <form onSubmit={props.onConfirm}>
              {props.children}
              <div className="flex">
                <button type="button">Cancel</button>
                <button type="submit">Save</button>
              </div>
            </form>
          </div>
          {props.children}
        </dialog>
      </div>
    </>
  );
};

export default DialogForm;
