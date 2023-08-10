import { useContext } from "react";
import DialogFormContext from "../DialogFormContext";
import DialogButtonInput from "./DialogButtonInput";

type Props = {
  children: React.ReactNode;
  submitText?: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onCancel?: () => void;
  isSubmitDisabled: boolean;
};

const DialogFormInput: React.FC<Props> = (props) => {
  const { onSubmit, onCancel, isSubmitDisabled, submitText, children } = props;
  const dialog = useContext(DialogFormContext);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    onSubmit(event);
    dialog.closeDialog();
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submitHandler(e);
      }}
    >
      {children}
      <DialogButtonInput
        onCancel={onCancel}
        isSubmitDisabled={isSubmitDisabled}
        submitText={submitText}
        submitType="submit"
      />
    </form>
  );
};

export default DialogFormInput;
