type Props = {
  message: string;
};

const DialogConfirmation: React.FC<Props> = (props) => {
  return (
    <div className="w-full">
      <label className="font-jakarta font-normal text-lg mb-2 text-center">
        {props.message}
      </label>
    </div>
  );
};

export default DialogConfirmation;
