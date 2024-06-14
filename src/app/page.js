import NavBar from "./components/NavBar";
import SlidingPuzzle from "./components/SlidingPuzzle";

export default function Home() {
  return (
    <div className="w-full h-screen bg-[#fff6d3] dark:bg-[#211e20]">
      <NavBar />
      <SlidingPuzzle />
    </div>
  );
}
