import NavBar from "./components/NavBar";
import SlidingPuzzle from "./components/SlidingPuzzle";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-[#fff6d3] dark:bg-blue-300">
      <NavBar />
      <SlidingPuzzle />
    </div>
  );
}
