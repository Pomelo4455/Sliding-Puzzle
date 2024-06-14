"use client";

import React from "react";
import puzzleImage from "../../../public/puzzleImage.jpg";

const TILE_SIZE = 150; // Adjust the size of each tile
const TILE_MARGIN = 5;

const Tile = ({ initialPosition, actualPosition, isHidden, onMouseDown }) => {
  return (
    <div
      className={`tile ${
        isHidden
          ? "border-2 border-dashed border-[#7c3f58] dark:border-[#ffd191]"
          : ""
      }`}
      style={{
        width: TILE_SIZE,
        height: TILE_SIZE,
        backgroundImage: isHidden ? "none" : `url(${puzzleImage.src})`,
        backgroundPosition: `${-initialPosition[1] * TILE_SIZE}px ${
          -initialPosition[0] * TILE_SIZE
        }px`,
        backgroundSize: `calc(var(--grid-size) * ${TILE_SIZE}px) calc(var(--grid-size) * ${TILE_SIZE}px)`,
        cursor: isHidden ? "default" : "pointer",
        backgroundColor: isHidden ? "transparent" : "initial",
        transform: `translate(${
          actualPosition[1] * (TILE_SIZE + TILE_MARGIN * 2)
        }px, ${actualPosition[0] * (TILE_SIZE + TILE_MARGIN * 2)}px)`,
      }}
      onMouseDown={onMouseDown}
    ></div>
  );
};

export default Tile;
