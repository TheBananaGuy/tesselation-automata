# Conway's Game of Life

This project is purely for fun and practice.

## Disclaimer

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
This project was also based off [Ben Award's tutorial](https://www.youtube.com/watch?v=DvVt11mPuM0).

## About the Game of Life

Initial criteria:

- Two-dimensional orthogonal grid of cells
- Each cell is either **alive** or **dead**
- Each cell interacts with any adjacent cells (neighbors)

Basic rules for each interaction cycle:

1. Any live cell with two or three live neighbors survives
2. Any dead cell with three live neighbors becomes alive
3. Everything else stays dead

Learn more about the Game of Life [here](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life).

## Current goals

- Nicer visual design
  - Possibility to customize the colors
- Changeable ruleset
  - Min/max neighbors to survive
  - Min/max neighbors for rebirth
  - Rebirth limitations
- Customizable board
  - Board dimensions
  - Cell size
  - Speed

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Other scripts

All other basic scripts from **Create React App** (`npm run test`, `npm run eject`) are also included.
