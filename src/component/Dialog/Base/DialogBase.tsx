import { useContext } from "react";
import icons from "../../../assets/icons/icons";
import DialogFormContext from "../DialogFormContext";

type Props = {
  children: React.ReactNode;
  title?: string;
  closeDialog?: () => void;
};

const DialogBase: React.FC<Props> = (props) => {
  const { children, title, closeDialog } = props;
  const dialog = useContext(DialogFormContext);
  const onCloseHandler = () => {
    closeDialog && closeDialog();
    dialog.closeDialog();
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h3 className="font-bold text-base text-left">{title}</h3>
        <button type="button" className="w-4 h-4" onClick={onCloseHandler}>
          <img
            src={icons.cancelEdit.orange}
            className="w-full h-full object-cover"
            alt="Close Dialog"
          />
        </button>
      </div>
      {children}
    </div>
  );
};

export default DialogBase;
