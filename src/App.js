import React from 'react';
import Grid from 'components/Grid';

const numRows = 34;
const numCols = 72;
const cellSize = 10;

function App() {
  return (
    <>
      <Grid numRows={numRows} numCols={numCols} cellSize={cellSize} />
    </>
  );
}

export default App;
