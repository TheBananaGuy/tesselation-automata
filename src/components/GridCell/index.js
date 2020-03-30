import React from 'react';
import PropTypes from 'prop-types';
import './GridCell.scss';

/**
 * Single cell component for the Game of Life simulation
 *
 * @param {string} key Unique identifier of the cell
 * @param {bool} alive Current state of the cell
 * @param {string} onClick What haappens with the cell on a click
 * @param {Number} cellSize single cell size
 */
const GridCell = props => {
  const { key, alive, onClick, cellSize } = props;

  return (
    <div
      key={key}
      id={`grid-cell-${key}`}
      className={`grid__cell ${!!alive && 'grid__cell--alive'}`}
      style={{
        height: cellSize,
        width: cellSize,
      }}
      onClick={onClick}
    />
  );
};

GridCell.propTypes = {
  key: PropTypes.string,
  alive: PropTypes.bool,
  onClick: PropTypes.func,
  cellSize: PropTypes.number,
};

export default GridCell;
