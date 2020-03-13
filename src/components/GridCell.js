import React from 'react';
import PropTypes from 'prop-types';
import './GridCell.scss';

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
