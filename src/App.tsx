import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import TextPlugin from "gsap/TextPlugin";
import "./App.css";

// Register the plugins
gsap.registerPlugin(useGSAP, TextPlugin);

function App() {
  const container = useRef<HTMLDivElement>(null);
  const typewriterRef = useRef<HTMLParagraphElement>(null);
  const scrambleRef = useRef<HTMLParagraphElement>(null);
  const charAnimRef = useRef<HTMLDivElement>(null);
  const wordAnimRef = useRef<HTMLDivElement>(null);
  const lineAnimRef = useRef<HTMLDivElement>(null);
  const revealTextRef = useRef<HTMLDivElement>(null);
  const gradientTextRef = useRef<HTMLHeadingElement>(null);
  const countingNumberRef = useRef<HTMLSpanElement>(null);

  // State for the counter animation
  const [count, setCount] = useState(0);

  useGSAP(
    () => {
      // 1. Basic text content change
      gsap.to(".basic-text", {
        duration: 2,
        text: "Text changed with GSAP!",
        ease: "power1.inOut",
        delay: 0.5,
      });

      // 2. Typewriter effect
      const typewriterText =
        "This text is being typed out one character at a time...";
      gsap.to(typewriterRef.current, {
        duration: 3,
        text: typewriterText,
        ease: "none",
        delay: 2.5,
      });

      // 3. Text scramble effect
      const chars = "!<>-_\\/[]{}—=+*^?#________";
      const scrambleTimeline = gsap.timeline({
        delay: 6,
        onUpdate: function () {
          const progress = Math.round(this.progress() * 100);
          if (scrambleRef.current && progress < 100) {
            const originalText = "GSAP Text Scramble";
            const finalText = "Effect Complete!";
            const targetText = progress < 50 ? originalText : finalText;

            let result = "";
            for (let i = 0; i < targetText.length; i++) {
              if (i < progress / 3) {
                result += targetText[i];
              } else {
                result += chars[Math.floor(Math.random() * chars.length)];
              }
            }
            scrambleRef.current.textContent = result;
          }
        },
      });

      scrambleTimeline.to({}, { duration: 3 });

      // 4. Character-by-character animation using manual splits
      if (charAnimRef.current) {
        const chars = charAnimRef.current.querySelectorAll(".char");
        gsap.from(chars, {
          duration: 0.8,
          opacity: 0,
          y: 50,
          rotationX: -90,
          stagger: 0.05,
          delay: 9,
        });
      }

      // 5. Word-by-word animation using manual splits
      if (wordAnimRef.current) {
        const words = wordAnimRef.current.querySelectorAll(".word");
        gsap.from(words, {
          duration: 1.2,
          opacity: 0,
          scale: 0,
          y: 80,
          rotationX: 180,
          transformOrigin: "0% 50% -50",
          stagger: 0.2,
          delay: 11,
        });
      }

      // 6. Line-by-line animation using manual splits
      if (lineAnimRef.current) {
        const lines = lineAnimRef.current.querySelectorAll(".line");
        gsap.from(lines, {
          duration: 1.5,
          opacity: 0,
          y: 100,
          ease: "power4.out",
          stagger: 0.25,
          delay: 14,
        });
      }

      // 7. Text reveal with mask animation
      if (revealTextRef.current) {
        gsap.to(revealTextRef.current, {
          "--mask-position": "100%",
          duration: 2,
          delay: 16,
          ease: "power2.inOut",
        });
      }

      // 8. Gradient text animation
      if (gradientTextRef.current) {
        gsap.to(gradientTextRef.current, {
          "--gradient-position": "100%",
          duration: 3,
          delay: 18,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      // 9. Counting number animation
      gsap.to(
        {},
        {
          duration: 3,
          delay: 21,
          onUpdate: function () {
            const progress = this.progress();
            const targetNumber = 1234;
            const currentNumber = Math.round(progress * targetNumber);
            if (countingNumberRef.current) {
              countingNumberRef.current.textContent = currentNumber.toString();
            }
            setCount(currentNumber);
          },
        }
      );
    },
    { scope: container }
  );

  return (
    <div className="app" ref={container}>
      <h1>GSAP Text Animation Examples</h1>

      <div className="animation-section">
        <h2>1. Basic Text Change</h2>
        <h3 className="basic-text">This text will change...</h3>
      </div>

      <div className="animation-section">
        <h2>2. Typewriter Effect</h2>
        <p ref={typewriterRef}></p>
      </div>

      <div className="animation-section">
        <h2>3. Text Scramble Effect</h2>
        <p ref={scrambleRef} className="scramble-text">
          GSAP Text Scramble
        </p>
      </div>

      <div className="animation-section">
        <h2>4. Character Animation</h2>
        <div ref={charAnimRef} className="char-container">
          <span className="char">C</span>
          <span className="char">h</span>
          <span className="char">a</span>
          <span className="char">r</span>
          <span className="char">a</span>
          <span className="char">c</span>
          <span className="char">t</span>
          <span className="char">e</span>
          <span className="char">r</span>
          <span className="char"> </span>
          <span className="char">b</span>
          <span className="char">y</span>
          <span className="char"> </span>
          <span className="char">C</span>
          <span className="char">h</span>
          <span className="char">a</span>
          <span className="char">r</span>
          <span className="char">a</span>
          <span className="char">c</span>
          <span className="char">t</span>
          <span className="char">e</span>
          <span className="char">r</span>
        </div>
      </div>

      <div className="animation-section">
        <h2>5. Word Animation</h2>
        <div ref={wordAnimRef} className="word-container">
          <span className="word">Each</span>
          <span className="word">Word</span>
          <span className="word">Gets</span>
          <span className="word">Animated</span>
          <span className="word">Separately</span>
        </div>
      </div>

      <div className="animation-section">
        <h2>6. Line Animation</h2>
        <div ref={lineAnimRef} className="line-container">
          <div className="line">This is the first line of text.</div>
          <div className="line">Here is the second line of text.</div>
          <div className="line">And finally the third line of text.</div>
        </div>
      </div>

      <div className="animation-section">
        <h2>7. Text Reveal with Mask</h2>
        <div ref={revealTextRef} className="reveal-text">
          This text is revealed with a mask effect
        </div>
      </div>

      <div className="animation-section">
        <h2>8. Gradient Text Animation</h2>
        <h3 ref={gradientTextRef} className="gradient-text">
          Animated Gradient Text
        </h3>
      </div>

      <div className="animation-section">
        <h2>9. Counting Number Animation</h2>
        <div className="counter">
          <span ref={countingNumberRef} className="number">
            {count}
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
