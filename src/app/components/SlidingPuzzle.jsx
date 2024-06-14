"use client";

import React, { useState, useEffect } from "react";
import Tile from "./Tile";
import "../styles/SlidingPuzzle.css";

const TILE_SIZE = 150; // Adjust the size of each tile
const TILE_MARGIN = 5;

const SlidingPuzzle = () => {
  const [gridSize, setGridSize] = useState(3); // Default to Easy (3x3)
  const [tiles, setTiles] = useState([]);
  const [hiddenTile, setHiddenTile] = useState(null);
  const [selectingHiddenTile, setSelectingHiddenTile] = useState(true);
  const [gameWon, setGameWon] = useState(false);
  const [hasShuffled, setHasShuffled] = useState(false);

  useEffect(() => {
    const initialTiles = [];
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        initialTiles.push({
          initialPosition: [row, col],
          actualPosition: [row, col],
          isHidden: false,
        });
      }
    }
    setTiles(initialTiles);
  }, [gridSize]);

  const handleTileMouseDown = (row, col) => {
    if (selectingHiddenTile) {
      setTiles((prevTiles) =>
        prevTiles.map((tile) =>
          tile.initialPosition[0] === row && tile.initialPosition[1] === col
            ? { ...tile, isHidden: true }
            : tile
        )
      );
      setHiddenTile({ actualPosition: [row, col] });
      setSelectingHiddenTile(false);
    } else {
      const hiddenRow = hiddenTile.actualPosition[0];
      const hiddenCol = hiddenTile.actualPosition[1];

      const isAdjacent =
        (row === hiddenRow && Math.abs(col - hiddenCol) === 1) ||
        (col === hiddenCol && Math.abs(row - hiddenRow) === 1);

      if (isAdjacent) {
        setTiles((prevTiles) => {
          const updatedTiles = prevTiles.map((tile) => {
            if (
              tile.actualPosition[0] === row &&
              tile.actualPosition[1] === col
            ) {
              return { ...tile, actualPosition: [hiddenRow, hiddenCol] };
            }
            if (tile.isHidden) {
              return { ...tile, actualPosition: [row, col] };
            }
            return tile;
          });

          checkWin(updatedTiles);
          return updatedTiles;
        });
        setHiddenTile({ actualPosition: [row, col] });
      }
    }
  };

  const checkWin = (tiles) => {
    const won = tiles.every(
      (tile) =>
        tile.actualPosition[0] === tile.initialPosition[0] &&
        tile.actualPosition[1] === tile.initialPosition[1]
    );
    setGameWon(won);
  };

  const shuffleTiles = () => {
    setHasShuffled(true);
    const shuffledTiles = [...tiles];
    for (let i = shuffledTiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledTiles[i], shuffledTiles[j]] = [
        shuffledTiles[j],
        shuffledTiles[i],
      ];
    }

    const updatedTiles = shuffledTiles.map((tile, index) => ({
      ...tile,
      actualPosition: [Math.floor(index / gridSize), index % gridSize],
    }));

    const hiddenTilePosition = updatedTiles.find(
      (tile) => tile.isHidden
    ).actualPosition;
    setTiles(updatedTiles);
    setHiddenTile({ actualPosition: hiddenTilePosition });
    setGameWon(false);
  };

  return (
    <div className="flex-col py-10 flex items-center justify-center h-fit w-full dark:bg-[#211e20] dark:text-[#ffd191]">
      <div className="flex w-full text-2xl justify-evenly gap-2 mb-10 flex-wrap">
        {[
          { step: "Remove a tile", action: null },
          { step: "Shuffle the board", action: shuffleTiles },
          { step: "Solve!!!", action: null },
        ].map((stepObj, index) => (
          <div
            className={`flex justify-center items-center mb-4 sm:mb-0 transition-transform ${
              index === 0 && !hiddenTile
                ? "scale-150"
                : index === 1 && !hasShuffled && hiddenTile
                ? "scale-150"
                : index === 2 && hasShuffled && hiddenTile
                ? "scale-150"
                : ""
            }`}
            key={index}
          >
            <div className="p-1 mr-2 w-8 h-8 flex justify-center items-center rounded-full bg-[#7c3f58] text-[#fff6d3] dark:bg-[#ffd191] dark:text-[#211e20]">
              {index === 0
                ? hiddenTile
                  ? "✓"
                  : 1
                : index === 1
                ? hasShuffled
                  ? "✓"
                  : 2
                : index === 2
                ? gameWon
                  ? "✓"
                  : 3
                : ""}
            </div>
            <div className="text-[#7c3f58] dark:text-[#ffd191] text-center">
              {stepObj.step.split(" ").map((word, idx) =>
                word === "Shuffle" ? (
                  <button
                    key={idx}
                    className={`bg-[#7c3f58] text-[#fff6d3] dark:bg-[#ffd191] dark:text-[#211e20] px-2 py-1 rounded ${
                      hiddenTile ? "shake-hover cursor-pointer" : ""
                    }`}
                    onClick={(e) => {
                      stepObj.action && stepObj.action();
                    }}
                    disabled={!hiddenTile}
                  >
                    {word}
                  </button>
                ) : (
                  ` ${word} `
                )
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mb-10">
        {["Easy", "Medium", "Hard"].map((level, idx) => (
          <button
            key={idx}
            className={`mx-2 px-4 py-2 rounded ${
              gridSize === idx + 3
                ? "bg-[#f9a875] text-[#fff6d3] dark:bg-[#ff924f] dark:text-[#211e20]"
                : "bg-[#7c3f58] text-[#fff6d3] dark:bg-[#66605c] dark:text-[#ffd191]"
            }`}
            onClick={() => {
              setGridSize(idx + 3);
              setSelectingHiddenTile(true);
              setHasShuffled(false);
              setGameWon(false);
              setHiddenTile(null);
              setTiles([]);
            }}
            disabled={gridSize === idx + 3}
          >
            {level}
          </button>
        ))}
      </div>

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
              handleTileMouseDown(
                tile.actualPosition[0],
                tile.actualPosition[1]
              )
            }
          />
        ))}
      </div>
      {gameWon && hasShuffled && hiddenTile && (
        <div className="mt-4 p-2 bg-[#f9a875] text-[#fff6d3] dark:bg-[#ff924f] dark:text-[#211e20] rounded">
          You Win!
        </div>
      )}
    </div>
  );
};

export default SlidingPuzzle;
