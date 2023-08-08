import DialogBase from "./Base/DialogBase";
import DialogButtonInput from "./Input/DialogButtonInput";

type Props = {
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
};

const DialogValidation: React.FC<Props> = (props) => {
  const { title, message, onConfirm, onCancel } = props;

  const submitHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    onConfirm();
  };

  return (
    <DialogBase title={title} closeDialog={onCancel}>
      <p>{message}</p>
      <DialogButtonInput
        onCancel={onCancel}
        onSubmit={submitHandler}
        submitType="button"
        submitText="OK"
      />
    </DialogBase>
  );
};

export default DialogValidation;
