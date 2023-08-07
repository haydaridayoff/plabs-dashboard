type Props = {
  onCancel?: () => void;
  submitHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  submitText?: string;
  isSubmitDisabled?: boolean;
  submitType?: "submit" | "button";
};

const DialogButtonInput: React.FC<Props> = (props) => {
  const { onCancel, submitHandler, isSubmitDisabled, submitType, submitText } =
    props;
  return (
    <div className="flex gap-4 w-full justify-evenly">
      <button
        onClick={onCancel}
        className="w-full border border-[#666666] rounded-md px-4 py-2 shadow-sm text-[#666666]"
        type="button"
      >
        Cancel
      </button>
      <button
        className="w-full border border-transparent bg-[#0AB663] rounded-md px-4 py-2 shadow-sm text-white"
        type={submitType ? submitType : "submit"}
        disabled={isSubmitDisabled}
        onClick={(e) => (submitHandler ? submitHandler(e) : () => {})}
      >
        {submitText ? submitText : "Save"}
      </button>
    </div>
  );
};

export default DialogButtonInput;
