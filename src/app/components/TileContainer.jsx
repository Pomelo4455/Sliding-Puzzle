import Tile from "./Tile";

const TileContainer = ({
  tiles,
  TILE_SIZE,
  TILE_MARGIN,
  gridSize,
  handleTileMouseDown,
}) => (
  <div
    className="puzzle-container"
    style={{
      "--tile-size": `${TILE_SIZE}px`,
      "--grid-size": gridSize,
      width: `calc(100% - 20px)`,
      maxWidth: `${gridSize * (TILE_SIZE + TILE_MARGIN * 2)}px`,
      height: `${gridSize * (TILE_SIZE + TILE_MARGIN * 2)}px`,
    }}
  >
    {tiles.map((tile, index) => (
      <Tile
        key={index}
        initialPosition={tile.initialPosition}
        actualPosition={tile.actualPosition}
        isHidden={tile.isHidden}
        onMouseDown={() =>
          handleTileMouseDown(tile.actualPosition[0], tile.actualPosition[1])
        }
      />
    ))}
  </div>
);

export default TileContainer;
