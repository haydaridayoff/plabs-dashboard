interface Props {
  children?: React.ReactNode;
  className?: string;
}

const Card: React.FC<Props> = (props) => {
  return (
    <div className={`bg-white p-6 rounded-md shadow-md ${props.className}`}>
      {props.children}
    </div>
  );
};

export default Card;
