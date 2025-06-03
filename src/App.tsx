import ReactDOM from "react-dom/client";
import Hero from "./components/Hero";
import "./index.css";

const App = () => (
  <main className="relative min-h-screen w-screen overflow-x-hidden">
    <Hero />
  </main>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);
