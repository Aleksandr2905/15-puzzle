import { useState } from "react";
import { canMoveItem, correctArr, getEmptyXY, getRandomArr } from "./utils";
import classnames from "classnames";
import "./App.css";

function App() {
  const [state, setState] = useState(getRandomArr);

  const moveItem = (x: number, y: number, item: number) => {
    const [emptyX, emptyY] = getEmptyXY(state, 16);
    if (canMoveItem(emptyX, emptyY, x, y)) {
      setState(() => {
        const newState = new Array(...state);
        newState[y][x] = 16;
        newState[emptyY][emptyX] = item;
        return newState;
      });
    }
  };

  return (
    <>
      <div className="game">
        {state.map((line, y) =>
          line.map((item, x) => (
            <div
              className={classnames(
                "game-item",
                correctArr[y][x] === item && "success",
                item === 16 && "empty"
              )}
              style={{ top: y * 25 + "%", left: x * 25 + "%" }}
              onClick={() => moveItem(x, y, item)}
            >
              {item}
            </div>
          ))
        )}
      </div>
      <button className="reset-button" onClick={() => setState(getRandomArr())}>
        reset
      </button>
    </>
  );
}

export default App;
