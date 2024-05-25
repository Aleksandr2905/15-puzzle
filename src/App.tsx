import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
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

  const triggerConfetti = () => {
    confetti({
      particleCount: 300,
      spread: 200,
      origin: { x: 0.5, y: 0.5 },
    });
  };

  const arraysEqual = (arr1: number[][], arr2: number[][]) => {
    for (let i = 0; i < arr1.length; i++) {
      for (let j = 0; j < arr1[i].length; j++) {
        if (arr1[i][j] !== arr2[i][j]) {
          return false;
        }
      }
    }
    return true;
  };

  useEffect(() => {
    if (arraysEqual(state, correctArr)) {
      triggerConfetti();
    }
  }, [state]);

  return (
    <>
      <div className="game">
        {state.map((line, y) =>
          line.map((item, x) => (
            <div
              key={`${y}-${x}`}
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
