"use client";

import ThemeSwitch from "./ThemeSwitch";

function NavBar() {
  return (
    <nav className="bg-transparent p-4 border-b-4 border-dashed border-b-[#7c3f58] dark:border-b-[#ffd191]">
      <div className="container mx-auto flex items-center relative">
        <div className="flex-1 flex justify-center">
          <div className="flex items-center font-thin justify-center space-x-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#7c3f58] dark:text-[#ffd191]">
              {"("}
            </h1>
            <h1 className="text-3xl md:text-4xl lg:text-5xl bg-[#7c3f58] text-[#fff6d3] p-1 sm:p-2 rounded-xl dark:bg-[#ffd191] dark:text-[#211e20]">
              Sliding Puzzle
            </h1>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#7c3f58] dark:text-[#ffd191]">
              {")"}
            </h1>
          </div>
        </div>
        <div className="absolute right-0">
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
