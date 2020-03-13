import React, { useState, useCallback, useRef } from 'react';
import produce from 'immer';

const numRows = 34;
const numCols = 72;

const operations = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const generateEmptyGrid = () => {
  const rows = [];

  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }

  return rows;
};

function App() {
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  });

  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);

  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid(g => {
      return produce(g, gridCopy => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;

            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;

              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });

    setTimeout(runSimulation, 25);
  }, []);

  const triggerStartStop = () => {
    setRunning(!running);
    if (!running) {
      runningRef.current = true;
      runSimulation();
    }
  };

  const clearGrid = () => {
    setGrid(generateEmptyGrid());
  };

  const randomizeGrid = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => (Math.random() > 0.5 ? 1 : 0)));
    }

    setGrid(rows);
  };

  const forceCellStateTrigger = (i, k) => {
    const newGrid = produce(grid, gridCopy => {
      gridCopy[i][k] = gridCopy[i][k] ? 0 : 1;
    });
    setGrid(newGrid);
  };

  const renderGrid = grid.map((rows, i) =>
    rows.map((col, k) => (
      <div
        key={`${i}-${k}`}
        onClick={() => forceCellStateTrigger(i, k)}
        style={{
          width: 20,
          height: 20,
          backgroundColor: grid[i][k] ? 'pink' : undefined,
          border: 'solid 1px black',
        }}
      />
    ))
  );

  return (
    <>
      <button onClick={triggerStartStop}>{running ? 'stop' : 'start'}</button>
      <button onClick={clearGrid}>clear</button>
      <button onClick={randomizeGrid}>random</button>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${numCols}, 20px)`,
        }}
      >
        {renderGrid}
      </div>
    </>
  );
}

export default App;
