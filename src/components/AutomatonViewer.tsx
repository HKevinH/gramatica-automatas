// components/AutomatonViewer.tsx

import React, { useRef, useEffect, useState } from "react";
import { instance } from "@viz-js/viz"; // Asegúrate de que 'instance' está correctamente importado
import { useStore } from "../store/store";

const AutomatonViewer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { data: automatonDot } = useStore((state) => state);
  const [loader, setIsloader] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("entre", containerRef.current);
    setIsloader(true);
    if (containerRef.current && automatonDot) {
      console.log("Referencia al contenedor:", containerRef.current);
      console.log("DOT generado:", automatonDot);

      console.log("entre");
      setError(null);
      containerRef.current.innerHTML = "";

      instance()
        .then((viz) => {
          return viz.renderSVGElement(automatonDot);
        })
        .then((svg) => {
          if (containerRef.current) {
            containerRef.current.appendChild(svg);
          }
        })
        .catch((error) => {
          console.error("Error al renderizar el SVG:", error);
          setError("Error al renderizar el autómata.");
        });
    } else {
      console.log("containerRef.current o dot es null/undefined");
    }
    setIsloader(false);
  }, [containerRef.current, automatonDot]);

  return (
    <div>
      <h1 className="text-white">Autómata Finito</h1>
      {loader && <p className="text-white">Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div ref={containerRef} className="h-1/2 w-1/2 bg-white"></div>
    </div>
  );
};

export default AutomatonViewer;
