import Logo from "./assets/devmemory_logo.png";
import "./index.css";
import { InfoItem } from "./componets/InfoItem/index";
import { Button } from "./componets/button";
import { useEffect, useState } from "react";
import { gridItem } from "./types/gridItemsType";
import { items } from "./data";
import { GridItem } from "./componets/GridItem";
import { formatTimeElapsed } from "./helpers/formatTimeElapsed";

const App = () => {
  const [play, setplay] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [shownCount, setShownCount] = useState<number>(0);
  const [gridItem, setGridItem] = useState<gridItem[]>([]);
  useEffect(() => resetAndCreatGrid(), []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (play) setTimeElapsed(timeElapsed + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [play, timeElapsed]);

  //verifica as cartas
  useEffect(() => {
    if (shownCount === 2) {
      let opened = gridItem.filter((item) => item.shown === true);
      if (opened.length === 2) {
        if (opened[0].item === opened[1].item) {
          let tmpGird = [...gridItem];
          for (let i in tmpGird) {
            if (tmpGird[i].shown) {
              tmpGird[i].permanentShown = true;
              tmpGird[i].shown = false;
            }
          }
          setGridItem(tmpGird);
          setShownCount(0);
        } else {
          setTimeout(() => {
            let tmpGird = [...gridItem];
            for (let i in tmpGird) {
              tmpGird[i].shown = false;
            }
            setGridItem(tmpGird);
            setShownCount(0);
          }, 1000);
        }
        setMoveCount((moveCount) => moveCount + 1);
      }
    }
  }, [shownCount, gridItem]);

  //verifica se o jogo acabou
  useEffect(() => {
    if (
      moveCount > 0 &&
      gridItem.every((item) => item.permanentShown === true)
    ) {
      setplay(false);
    }
  }, [moveCount, gridItem]);

  const handleItemClick = (index: number) => {
    if (play && index !== null && shownCount < 2) {
      let tmpGird = [...gridItem];

      if (
        tmpGird[index].permanentShown === false &&
        tmpGird[index].shown === false
      ) {
        tmpGird[index].shown = true;
        setShownCount(shownCount + 1);
      }

      setGridItem(gridItem);
    }
  };
  const resetAndCreatGrid = () => {
    //passo 1 - resetar o jogo
    setTimeElapsed(0);
    setMoveCount(0);
    setShownCount(0);
    setGridItem([]);

    //passo 2 - criar o grid

    //2.1 - criar um grid vazio
    let tmpGrid: gridItem[] = [];
    for (let i = 0; i < items.length * 2; i++) {
      tmpGrid.push({
        item: null,
        shown: false,
        permanentShown: false,
      });
    }
    //2.2 preencher o grid
    for (let w = 0; w < 2; w++) {
      for (let i = 0; i < items.length; i++) {
        let pos = -1;
        while (pos < 0 || tmpGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length * 2));
        }
        tmpGrid[pos].item = i;
      }
    }
    // 2.2 jogar no state
    setGridItem(tmpGrid);
    //passo 3 - começar o jogo
    setplay(true);
  };
  return (
    <div className="Container">
      <div className="Info">
        <div className="LogoLink">
          <a href="">
            {" "}
            <img src={Logo} alt="logo" width={200} />
          </a>
        </div>
        <div className="InfoArea">
          <InfoItem label="Tempo" value={formatTimeElapsed(timeElapsed)} />
          <InfoItem label="Movimentos" value={moveCount.toString()} />
        </div>
        <Button Label="Reiniciar" onClick={resetAndCreatGrid} />
      </div>
      <div className="GridArea">
        <div className="Grid">
          {gridItem.map((item, index) => (
            <GridItem
              key={index}
              item={item}
              onClick={() => handleItemClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
