import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

function App() {
  const container = useRef({});

  useGSAP(
    () => {
      // gsap code here...
      gsap.from(".box", { opacity: 0, stagger: 0.1 });
    },
    { scope: container }
  );

  return (
    <>
      <div ref={container as React.RefObject<HTMLDivElement>} className="app">
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
      </div>
    </>
  );
}

export default App;
