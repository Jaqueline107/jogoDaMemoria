import "./styles.css";

type Props = {
  Label: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
};
export const Button = ({ Label, onClick }: Props) => {
  return (
    <div className="Container3" onClick={onClick}>
      <div className="IconArea">
        <div className="Label">{Label}</div>
      </div>
    </div>
  );
};
