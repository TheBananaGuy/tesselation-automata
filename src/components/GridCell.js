import React from 'react';
import PropTypes from 'prop-types';
import './GridCell.scss';

/**
 * Single cell component for the Game of Life simulation
 * @param {string} key Unique identifier of the cell
 * @param {bool} alive Current state of the cell
 * @param {string} onClick What haappens with the cell on a click
 */
const GridCell = props => {
  const { key, alive, onClick } = props;
  return (
    <div
      key={key}
      className={`grid__cell ${!!alive && 'grid__cell--alive'}`}
      onClick={onClick}
    />
  );
};

GridCell.propTypes = {
  key: PropTypes.string,
  alive: PropTypes.bool,
  onClick: PropTypes.func,
};

export default GridCell;
