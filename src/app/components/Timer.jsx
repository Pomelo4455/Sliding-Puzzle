import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const Timer = ({ timer }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="flex justify-center text-4xl items-center mt-4 p-2 text-[#7c3f58] dark:text-[#ffd191]">
      <img
        src={
          !mounted ? "" : theme === "dark" ? "clockDark.png" : "clockLight.png"
        }
        alt="clock"
        className="w-10 h-10"
      />
      : {formatTime(timer)}
    </div>
  );
};

export default Timer;
