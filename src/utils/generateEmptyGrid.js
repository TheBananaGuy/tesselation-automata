/**
 * Generate a two-dimensional orthogonal grid of cells.
 * All cells created are dead
 *
 * @param {int} length grid length (X axis)
 * @param {int} height grid height (Y axis)
 */
const generateEmptyGrid = ({ length, height }) => {
  const rows = [];

  for (let i = 0; i < height; i++) {
    rows.push(Array.from(Array(length), () => 0));
  }

  return rows;
};

export default generateEmptyGrid;
