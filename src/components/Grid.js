import React, { useState, useCallback, useRef } from 'react';
import produce from 'immer';
import operations from 'constants/operations';
import generateEmptyGrid from 'utils/generateEmptyGrid';
import GridCell from 'components/GridCell';
import PropTypes from 'prop-types';

/**
 * Grid for simulating Conway's Game of Life
 *
 * @param {Number} numRows amount of grid cells on Y axis
 * @param {Number} numCols amount of grid cells on X axis
 * @param {Number} cellSize single cell size
 */
const Grid = props => {
  const { numRows, numCols, cellSize } = props;

  const emptyGrid = generateEmptyGrid({ length: numCols, height: numRows });

  const [grid, setGrid] = useState(() => {
    return emptyGrid;
  });

  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);

  runningRef.current = running;

  /**
   * Change the grid according to the Game of Life ruleset
   *
   * Essentialy simulates grid cell interaction / lifecycle
   */
  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid(g => {
      return produce(g, gridCopy => {
        for (let y = 0; y < numRows; y++) {
          for (let x = 0; x < numCols; x++) {
            let neighbors = 0;

            operations.forEach(([opY, opX]) => {
              const newY = y + opY;
              const newX = x + opX;

              if (newY >= 0 && newY < numRows && newX >= 0 && newX < numCols) {
                neighbors += g[newY][newX];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[y][x] = 0;
            } else if (g[y][x] === 0 && neighbors === 3) {
              gridCopy[y][x] = 1;
            }
          }
        }
      });
    });

    setTimeout(runSimulation, 25);
  }, [numCols, numRows]);

  /**
   * Start or stop the simulation
   */
  const triggerStartStop = () => {
    setRunning(!running);
    if (!running) {
      runningRef.current = true;
      runSimulation();
    }
  };

  /**
   * Empty the grid / kill all cells
   *
   * Stops the simulation
   */
  const clearGrid = () => {
    setGrid(emptyGrid);
    running && triggerStartStop();
  };

  /**
   * Generate a new grid randomly populated with live cells
   */
  const randomizeGrid = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(
        Array.from(Array(numCols), () => (Math.random() > 0.5 ? 1 : 0))
      );
    }

    setGrid(rows);
  };

  /**
   * Force a cell to be dead or alive
   * @param {Number} y Y axis coordinate
   * @param {Number} x X axis coordinate
   */
  const forceCellStateTrigger = (y, x) => {
    const newGrid = produce(grid, gridCopy => {
      gridCopy[y][x] = gridCopy[y][x] ? 0 : 1;
    });
    setGrid(newGrid);
  };

  /**
   * Render the grid according to the grid state at hand
   */
  const renderGrid = grid.map((row, y) =>
    row.map((col, x) => (
      <GridCell
        key={`${x}-${y}`}
        alive={grid[y][x]}
        onClick={() => forceCellStateTrigger(y, x)}
        cellSize={cellSize}
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
          gridTemplateColumns: `repeat(${numCols}, ${cellSize}px)`,
        }}
      >
        {renderGrid}
      </div>
    </>
  );
};

Grid.propTypes = {
  numRows: PropTypes.number,
  numCols: PropTypes.number,
  cellSize: PropTypes.number,
};

export default Grid;
