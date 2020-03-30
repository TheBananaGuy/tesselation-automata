/**
 * Array of arrays with relative indexes for neighbor cells to interact.
 *
 * Each array contains Y and X indexes, respectivelly.
 */
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

export default operations;
