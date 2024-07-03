"use client";

import React, { useState, useEffect } from "react";
import PuzzleControls from "./PuzzleControls";
import Timer from "./Timer";
import TileContainer from "./TileContainer";
import "../styles/SlidingPuzzle.css";

const SlidingPuzzle = () => {
  const [gridSize, setGridSize] = useState(3); // Default to Easy (3x3)
  const [tiles, setTiles] = useState([]);
  const [hiddenTile, setHiddenTile] = useState(null);
  const [selectingHiddenTile, setSelectingHiddenTile] = useState(true);
  const [gameWon, setGameWon] = useState(false);
  const [hasShuffled, setHasShuffled] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTiming, setIsTiming] = useState(false);
  const [moves, setMoves] = useState(0);
  const [playAgain, setPlayAgain] = useState(false);
  const [solvedByUser, setSolvedByUser] = useState(true); // New state
  const [highScore, setHighScore] = useState(null); // High score state
  const [tileSize, setTileSize] = useState(150);
  const [tileMargin, setTileMargin] = useState(2.5);

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
    setPlayAgain(false);
  }, [gridSize, playAgain]);

  useEffect(() => {
    let timerInterval;
    if (isTiming) {
      timerInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else if (!isTiming && timer !== 0) {
      clearInterval(timerInterval);
    }
    return () => clearInterval(timerInterval);
  }, [isTiming, timer]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setTileSize(100);
        setTileMargin(1.5);
        setGridSize(3); // Set to easy difficulty if on mobile
      } else {
        setTileSize(150);
        setTileMargin(2.5);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTileMouseDown = (row, col) => {
    if (gameWon) return; // Prevent tile movement if game is won

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
      if (!isTiming && hasShuffled) {
        setIsTiming(true);
      }

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

          checkWin(updatedTiles, true); // Pass true to indicate user solved
          return updatedTiles;
        });
        setHiddenTile({ actualPosition: [row, col] });
        setMoves((prevMoves) => prevMoves + 1);
      }
    }
  };

  const checkWin = (tiles, userSolved) => {
    const won = tiles.every(
      (tile) =>
        tile.actualPosition[0] === tile.initialPosition[0] &&
        tile.actualPosition[1] === tile.initialPosition[1]
    );
    if (hasShuffled) {
      setGameWon(won);
    }
    if (won) {
      setIsTiming(false);
      setSolvedByUser(userSolved); // Update solvedByUser

      // Update high score if user solved and it's a better time
      if (
        userSolved &&
        hasShuffled &&
        (highScore === null || timer < highScore)
      ) {
        setHighScore(timer);
      }
    }
  };

  const shuffleTiles = () => {
    setHasShuffled(true);
    setIsTiming(false);
    setTimer(0);
    setMoves(0);
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

  const solvePuzzle = () => {
    const solvedTiles = tiles.map((tile) => ({
      ...tile,
      actualPosition: [...tile.initialPosition],
    }));
    setTiles(solvedTiles);
    setHiddenTile({ actualPosition: [gridSize - 1, gridSize - 1] });
    setGameWon(true);
    setIsTiming(false);
    setSolvedByUser(false); // Indicate the puzzle was solved automatically
  };

  const formatHighScoreTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return minutes > 0
      ? `${minutes} minute${
          minutes > 1 ? "s" : ""
        } and ${remainingSeconds} second${remainingSeconds !== 1 ? "s" : ""}`
      : `${remainingSeconds} second${remainingSeconds !== 1 ? "s" : ""}`;
  };

  return (
    <div className="flex-col py-10 flex items-center justify-center h-fit w-full bg-[#fff6d3] dark:bg-[#211e20] dark:text-[#ffd191]">
      <PuzzleControls
        gridSize={gridSize}
        setGridSize={setGridSize}
        hiddenTile={hiddenTile}
        setSelectingHiddenTile={setSelectingHiddenTile}
        hasShuffled={hasShuffled}
        setHasShuffled={setHasShuffled}
        gameWon={gameWon}
        setGameWon={setGameWon}
        setHiddenTile={setHiddenTile}
        setTiles={setTiles}
        setIsTiming={setIsTiming}
        setTimer={setTimer}
        shuffleTiles={shuffleTiles}
        solvePuzzle={solvePuzzle} // Add this line
      />
      <TileContainer
        tiles={tiles}
        tileSize={tileSize}
        tileMargin={tileMargin}
        gridSize={gridSize}
        handleTileMouseDown={handleTileMouseDown}
      />
      {gameWon && hasShuffled && hiddenTile && (
        <div className="mt-4 p-2 bg-[#f9a875] text-[#fff6d3] dark:bg-[#ff924f] dark:text-[#211e20] rounded">
          Congratulations!!! You {solvedByUser ? "won" : '"won"'} in {moves}{" "}
          moves
          <button
            onClick={() => {
              setGridSize(gridSize);
              setSelectingHiddenTile(true);
              setHasShuffled(false);
              setGameWon(false);
              setHiddenTile(null);
              setTiles([]);
              setIsTiming(false);
              setTimer(0);
              setPlayAgain(true);
            }}
            className="ml-4 bg-[#7c3f58] text-[#fff6d3] dark:bg-[#66605c] dark:text-[#ffd191] px-4 py-2 rounded"
          >
            Play Again!!!
          </button>
        </div>
      )}
      {highScore !== null && (
        <div className="mt-4 p-2 bg-[#7c3f58] text-[#fff6d3] dark:bg-[#66605c] dark:text-[#ffd191] rounded">
          High Score: {formatHighScoreTime(highScore)}
        </div>
      )}

      <Timer timer={timer} />
    </div>
  );
};

export default SlidingPuzzle;
