import Tile from "./Tile";

const TileContainer = ({
  tiles,
  tileSize,
  tileMargin,
  gridSize,
  handleTileMouseDown,
}) => (
  <div
    className="puzzle-container"
    style={{
      "--tile-size": `${tileSize}px`,
      "--grid-size": gridSize,
      width: `calc(100% - 20px)`,
      maxWidth: `${gridSize * (tileSize + tileMargin * 2)}px`,
      height: `${gridSize * (tileSize + tileMargin * 2)}px`,
    }}
  >
    {tiles.map((tile, index) => (
      <Tile
        key={index}
        initialPosition={tile.initialPosition}
        actualPosition={tile.actualPosition}
        isHidden={tile.isHidden}
        tileSize={tileSize}
        tileMargin={tileMargin}
        onMouseDown={() =>
          handleTileMouseDown(tile.actualPosition[0], tile.actualPosition[1])
        }
      />
    ))}
  </div>
);

export default TileContainer;
