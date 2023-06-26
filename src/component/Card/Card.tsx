interface Props {
  children?: React.ReactNode;
  className?: string;
}

const Card: React.FC<Props> = (props) => {
  return (
    <div className={`bg-white rounded-md shadow-md ${props.className}`}>
      {props.children}
    </div>
  );
};

export default Card;
