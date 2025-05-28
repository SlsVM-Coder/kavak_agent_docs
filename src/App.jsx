import { useState, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { useLenis } from "./hooks/useLenis";

import Architecture from "./content/Arquitecture";
import Prompts from "./content/Prompts";
import Installation from "./content/Installation";
import Roadmap from "./content/Roadmap";
import ThankYou from "./content/ThankYou";

const pages = [
  { title: "Arquitectura", Component: Architecture },
  { title: "Prompts & Tools", Component: Prompts },
  { title: "Instalación", Component: Installation },
  { title: "Roadmap", Component: Roadmap },
  { title: "Thank You", Component: ThankYou },
];

export default function App() {
  useLenis();
  const [idx, setIdx] = useState(0);
  const container = useRef(null);

  // Fade-in animation on page change
  useLayoutEffect(() => {
    gsap.fromTo(
      container.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 }
    );
  }, [idx]);

  const { Component, title } = pages[idx];

  return (
    <div className="app-wrapper">
      {/* Header */}
      <h1 className="app-header">Kavak Agent Bot — Documentación</h1>

      {/* Page Content */}
      <div ref={container} className="page-container">
        <h2 className="page-title">{title}</h2>
        <Component />
      </div>

      {/* Navigation */}
      <div className="nav-buttons">
        <button
          className="nav-button"
          onClick={() => setIdx((i) => Math.max(0, i - 1))}
          disabled={idx === 0}
        >
          ← Anterior
        </button>

        <span className="nav-counter">
          {idx + 1} / {pages.length}
        </span>

        <button
          className="nav-button"
          onClick={() => setIdx((i) => Math.min(pages.length - 1, i + 1))}
          disabled={idx === pages.length - 1}
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}
