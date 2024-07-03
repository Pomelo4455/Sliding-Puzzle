"use client";

import React from "react";
import puzzleImage from "../../../public/puzzleImage.jpg";

const Tile = ({
  initialPosition,
  actualPosition,
  isHidden,
  tileSize,
  tileMargin,
  onMouseDown,
}) => {
  return (
    <div
      className={`tile ${
        isHidden
          ? "border-2 border-dashed border-[#7c3f58] dark:border-[#ffd191]"
          : ""
      }`}
      style={{
        width: tileSize,
        height: tileSize,
        backgroundImage: isHidden ? "none" : `url(${puzzleImage.src})`,
        backgroundPosition: `${-initialPosition[1] * tileSize}px ${
          -initialPosition[0] * tileSize
        }px`,
        backgroundSize: `calc(var(--grid-size) * ${tileSize}px) calc(var(--grid-size) * ${tileSize}px)`,
        cursor: isHidden ? "default" : "pointer",
        backgroundColor: isHidden ? "transparent" : "initial",
        transform: `translate(${
          actualPosition[1] * (tileSize + tileMargin * 2)
        }px, ${actualPosition[0] * (tileSize + tileMargin * 2)}px)`,
      }}
      onMouseDown={onMouseDown}
    ></div>
  );
};

export default Tile;
