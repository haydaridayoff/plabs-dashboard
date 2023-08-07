import icons from "../../../assets/icons/icons";

type Props = {
  children: React.ReactNode;
  title?: string;
  closeDialog?: () => void;
};

const DialogBase: React.FC<Props> = (props) => {
  const { children, title, closeDialog } = props;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h3 className="font-bold text-base text-left">{title}</h3>
        <button type="button" className="w-4 h-4" onClick={closeDialog}>
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
