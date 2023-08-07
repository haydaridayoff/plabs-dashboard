import DialogButtonInput from "./DialogButtonInput";

type Props = {
  children: React.ReactNode;
  submitText?: string;
  submitHandler: (event: React.FormEvent<HTMLFormElement>) => void;
  onCancel?: () => void;
  isSubmitDisabled: boolean;
};

const DialogFormInput: React.FC<Props> = (props) => {
  const { submitHandler, onCancel, isSubmitDisabled, submitText, children } =
    props;
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
