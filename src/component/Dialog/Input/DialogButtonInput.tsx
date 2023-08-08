import { useContext } from "react";
import DialogFormContext from "../DialogFormContext";

type Props = {
  onCancel?: () => void;
  onSubmit?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  submitText?: string;
  isSubmitDisabled?: boolean;
  submitType?: "submit" | "button";
};

const DialogButtonInput: React.FC<Props> = (props) => {
  const { onCancel, onSubmit, isSubmitDisabled, submitType, submitText } =
    props;
  const dialog = useContext(DialogFormContext);
  const onCloseHandler = () => {
    onCancel && onCancel();
    dialog.closeDialog();
  };
  const submitHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    onSubmit && onSubmit(event);
    dialog.closeDialog();
  };

  return (
    <div className="flex gap-4 w-full justify-evenly">
      <button
        onClick={onCloseHandler}
        className="w-full border border-[#666666] rounded-md px-4 py-2 shadow-sm text-[#666666]"
        type="button"
      >
        Cancel
      </button>
      <button
        className={`w-full border border-transparent rounded-md px-4 py-2 shadow-sm bg-[#0AB663] text-white ${
          isSubmitDisabled && " bg-gray-400 cursor-not-allowed"
        }}`}
        type={submitType ? submitType : "submit"}
        disabled={isSubmitDisabled}
        onClick={submitType !== "submit" ? (e) => submitHandler(e) : undefined}
      >
        {submitText ? submitText : "Save"}
      </button>
    </div>
  );
};

export default DialogButtonInput;
