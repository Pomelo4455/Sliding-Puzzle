"use client";

import { FiSun, FiMoon } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { CSSTransition } from "react-transition-group";
import "../styles/ThemeSwitch.css";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const [inProp, setInProp] = useState(true);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <></>;

  const handleThemeChange = () => {
    setInProp(false);
    setTimeout(() => {
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
      setInProp(true);
    }, 50);
  };

  return (
    <CSSTransition in={inProp} timeout={300} classNames="fade">
      {resolvedTheme === "dark" ? (
        <FiSun
          className="cursor-pointer bg-[#7c3f58] p-2 rounded-full text-[#fff6d3]"
          onClick={handleThemeChange}
          size={50}
        />
      ) : (
        <FiMoon
          className="cursor-pointer bg-[#7c3f58] p-2 rounded-full text-[#fff6d3]"
          onClick={handleThemeChange}
          size={50}
        />
      )}
    </CSSTransition>
  );
}
