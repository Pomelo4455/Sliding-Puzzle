"use client";

import ThemeSwitch from "./ThemeSwitch";

function NavBar() {
  return (
    <nav className="bg-transparent p-4 border-b-4 border-dashed border-b-[#7c3f58]">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center font-thin justify-center space-x-1">
          <h1 className="text-5xl text-[#7c3f58]">{"("}</h1>
          <h1 className="text-5xl bg-[#7c3f58] text-[#fff6d3] p-2 rounded-xl">
            Sliding Puzzle
          </h1>
          <h1 className="text-5xl text-[#7c3f58]">{")"}</h1>
        </div>
        <ThemeSwitch />
      </div>
    </nav>
  );
}

export default NavBar;
