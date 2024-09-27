// components/AutomatonViewer.tsx

import React, { useRef, useEffect, useState } from "react";
import { instance } from "@viz-js/viz"; // Asegúrate de que 'instance' está correctamente importado
import useGrammar from "../hooks/useGrammar";

const AutomatonViewer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { automatonDot } = useGrammar(); // Asegúrate de que useGrammar devuelve 'dot'
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (containerRef.current && automatonDot) {
      console.log("Referencia al contenedor:", containerRef.current);
      console.log("DOT generado:", automatonDot);

      setLoading(true);
      setError(null);
      containerRef.current.innerHTML = ""; // Limpiar el contenedor

      // Utilizar 'instance' para obtener la instancia de Viz.js y renderizar el SVG
      instance()
        .then((viz) => {
          return viz.renderSVGElement(automatonDot);
        })
        .then((svg) => {
          if (containerRef.current) {
            containerRef.current.appendChild(svg);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error al renderizar el SVG:", error);
          setError("Error al renderizar el autómata.");
          setLoading(false);
        });
    } else {
      console.log("containerRef.current o dot es null/undefined");
    }
  }, [automatonDot]);

  return (
    <div>
      <h3>Autómata Finito</h3>
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "auto",
          border: "1px solid #ccc",
          marginTop: "20px",
        }}
      ></div>
    </div>
  );
};

export default AutomatonViewer;
