import React, { useEffect, useState } from "react";

const PuzzleControls = ({
  gridSize,
  setGridSize,
  hiddenTile,
  setSelectingHiddenTile,
  hasShuffled,
  setHasShuffled,
  gameWon,
  setGameWon,
  setHiddenTile,
  setTiles,
  setIsTiming,
  setTimer,
  shuffleTiles,
  solvePuzzle, // Add this prop
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col w-full text-2xl justify-evenly gap-2 mb-10 flex-wrap">
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
              setIsTiming(false);
              setTimer(0);
            }}
            disabled={gridSize === idx + 3 || (isMobile && idx !== 0)}
          >
            {level}
          </button>
        ))}
      </div>
      <div className="flex w-full justify-around items-center">
        {[
          { step: "Remove a tile", action: null },
          { step: "Shuffle the board", action: shuffleTiles },
          { step: "Solve!!!", action: solvePuzzle },
        ].map((stepObj, index) => (
          <div
            className={`flex justify-center items-center mb-4 sm:mb-0 transition-transform ${
              index === 0 && !hiddenTile
                ? "md:scale-125 lg:scale-150"
                : index === 1 && !hasShuffled && hiddenTile
                ? "md:scale-125 lg:scale-150"
                : index === 2 && hasShuffled && hiddenTile
                ? "md:scale-125 lg:scale-150"
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
                      hiddenTile && !gameWon ? "shake-hover cursor-pointer" : ""
                    }`}
                    onClick={(e) => {
                      stepObj.action && stepObj.action();
                    }}
                    disabled={!hiddenTile || gameWon}
                  >
                    {word}
                  </button>
                ) : word === "Solve!!!" ? (
                  <div key={idx} className="flex flex-col">
                    <div
                      className="text-[#7c3f58] dark:text-[#ffd191]"
                      onClick={(e) => {
                        stepObj.action && stepObj.action();
                      }}
                      disabled={!hiddenTile || gameWon}
                    >
                      {word}
                    </div>
                    <button
                      className={`text-xs bg-[#7c3f58] text-[#fff6d3] dark:bg-[#ffd191] dark:text-[#211e20] px-2 py-1 rounded ${
                        hiddenTile && !gameWon
                          ? "shake-hover cursor-pointer"
                          : ""
                      }`}
                      onClick={(e) => {
                        stepObj.action && stepObj.action();
                      }}
                      disabled={!hiddenTile || gameWon}
                    >
                      Or let us do it for you
                    </button>
                  </div>
                ) : (
                  ` ${word} `
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PuzzleControls;
