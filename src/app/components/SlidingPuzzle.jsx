"use client";

import React, { useState, useEffect } from "react";
import Tile from "./Tile";
import "../styles/SlidingPuzzle.css";

const TILE_SIZE = 150; // Adjust the size of each tile
const GRID_SIZE = 4;
const TILE_MARGIN = 5;

const SlidingPuzzle = () => {
  const [tiles, setTiles] = useState([]);
  const [hiddenTile, setHiddenTile] = useState(null);
  const [selectingHiddenTile, setSelectingHiddenTile] = useState(true);
  const [gameWon, setGameWon] = useState(false);
  const [hasShuffled, setHasShuffled] = useState(false);

  useEffect(() => {
    const initialTiles = [];
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        initialTiles.push({
          initialPosition: [row, col],
          actualPosition: [row, col],
          isHidden: false,
        });
      }
    }
    setTiles(initialTiles);
  }, []);

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
      actualPosition: [Math.floor(index / GRID_SIZE), index % GRID_SIZE],
    }));

    const hiddenTilePosition = updatedTiles.find(
      (tile) => tile.isHidden
    ).actualPosition;
    setTiles(updatedTiles);
    setHiddenTile({ actualPosition: hiddenTilePosition });
    setGameWon(false);
  };

  return (
    <div className="flex-col py-10 flex items-center justify-center h-fit w-full">
      <div className="flex w-full text-2xl justify-evenly mb-10">
        {[
          { step: "Remove a tile", action: null },
          { step: "Shuffle the board", action: shuffleTiles },
          { step: "Solve!!!", action: null },
        ].map((stepObj, index) => (
          <div className="flex justify-center items-center" key={index}>
            <div className="p-1 mr-2 w-8 h-8 flex justify-center items-center rounded-full bg-[#7c3f58] text-[#fff6d3]">
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
            <div className="text-[#7c3f58]">
              {stepObj.step.split(" ").map((word, idx) =>
                word === "Shuffle" ? (
                  <button
                    key={idx}
                    className="bg-[#7c3f58] text-[#fff6d3] px-2 py-1 rounded cursor-pointer shake-hover"
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
      <div
        className="puzzle-container"
        style={{
          "--tile-size": `${TILE_SIZE}px`,
          "--grid-size": GRID_SIZE,
          width: `${GRID_SIZE * (TILE_SIZE + TILE_MARGIN * 2)}px`,
          height: `${GRID_SIZE * (TILE_SIZE + TILE_MARGIN * 2)}px`,
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
        <div className="mt-4 p-2 bg-[#f9a875] text-[#fff6d3] rounded">
          You Win!
        </div>
      )}
    </div>
  );
};

export default SlidingPuzzle;
