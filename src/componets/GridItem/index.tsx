import { gridItem } from "../../types/gridItemsType";
import "./styles.css";
import b7 from "../../svgs/b7.svg";
import { items } from "../../data";

type Props = {
  item: gridItem;
  onClick: () => void;
};

export const GridItem = ({ item, onClick }: Props) => {
  return (
    <div className="Container4" onClick={onClick}>
      {item.permanentShown === false && item.shown === false && (
        <div className="Icon">
          <img src={b7} alt="Logo" width={40} />
        </div>
      )}
      {(item.permanentShown || item.shown) && item.item !== null && (
        <div className="Icon4">
          <img src={items[item.item].icon} alt="Carta" width={50} />
        </div>
      )}
    </div>
  );
};
