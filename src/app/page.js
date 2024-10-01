import Experinece from "./components/Experience";
import Nav from "./components/Nav";

export default function Home() {
  return (
    <main className=" w-full h-screen">
      <Nav className="absolute top-0 left-0 w-full z-10 "/>
      <Experinece />
      

    </main>
  );
}
