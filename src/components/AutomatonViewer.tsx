// components/AutomatonViewer.tsx

import React, { useRef, useEffect, useState } from "react";
import { instance } from "@viz-js/viz";
import { useStore } from "../store/store";

const AutomatonViewer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { data: automatonDot, derivativeStrings } = useStore((state) => state);
  const [error, setError] = useState<string | null>(null);
  const [isRendered, setIsRendered] = useState(false);
  console.log("derivativeStrings", derivativeStrings[0]);
  useEffect(() => {
    if (containerRef.current && automatonDot) {
      setError(null);
      containerRef.current.innerHTML = "";

      instance()
        .then((viz) => {
          return viz.renderSVGElement(automatonDot);
        })
        .then((svg) => {
          if (containerRef.current) {
            svg.setAttribute("class", "w-full h-full");
            containerRef.current.appendChild(svg);
            setIsRendered(true);
          }
        })
        .catch((error) => {
          console.error("Error al renderizar el SVG:", error);
          setError("Error al renderizar el autómata.");
        });
    } else {
      console.log("containerRef.current o dot es null/undefined");
    }
  }, [containerRef.current, automatonDot]);

  return (
    <article className="p-5 flex justify-center items-center flex-col">
      <h1 className="text-white text-3xl font-mono">Autómata</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div
        className={`relative p-5 shadow-lg rounded-xl h-[500px] w-full transition-all duration-500 ease-in-out border-transparent ${
          isRendered ? "border-4 border-transparent animate-fadeIn" : ""
        }`}
      >
        <div id="automaton-gradient">
          <span className="flex p-5 flex-row items-center gap-2 justify-between">
            {derivativeStrings.length > 0 ? (
              <>
                <div className="flex-col flex w-1/2 justify-center text-center gap-4">
                  <h1 className="text-white text-2xl font-mono">
                    Tabla de cadenas derivadas
                  </h1>
                  <table className="table-auto border-collapse border border-gray-300 w-full text-white font-mono">
                    <thead>
                      <tr>
                        <th className="border border-gray-300 p-2">Cadena</th>
                        <th className="border border-gray-300 p-2">Derivada</th>
                      </tr>
                    </thead>
                    <tbody>
                      {derivativeStrings?.map((string) => (
                        <tr className="border border-gray-300 px-4 py-2">
                          <td className="border border-gray-300 px-4 py-2 text-center">
                            {string.lengthShorts}
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-center">
                            {string.derivationSteps}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="text-white font-mono">
                    * Las cadenas derivadas se muestran en orden de longitud
                    creciente.
                  </p>
                  <p className="text-white font-mono">
                    Es Regular : {derivativeStrings[0].isregular ? "Sí" : "No"}
                  </p>
                  <p className="text-white font-mono">
                    Es Libre de contexto:{" "}
                    {derivativeStrings[0].iscontextfree ? "Sí" : "No"}
                  </p>
                </div>
                <div ref={containerRef} className="w-1/2"></div>
              </>
            ) : (
              <div className="flex justify-center flex-col items-center w-full h-full gap-5">
                <p className="text-white font-mono">
                  No hay autómata para mostrar.
                </p>

                <svg
                  className="animate-spin h-10 w-10 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V4a10 10 0 00-1.93 2.4"
                  ></path>
                </svg>
              </div>
            )}
          </span>
        </div>
      </div>
    </article>
  );
};

export default AutomatonViewer;
