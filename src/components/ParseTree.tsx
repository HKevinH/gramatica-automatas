import React, { useRef, useState } from "react";
import { Tree } from "../models/Tree";

const ParseTreeViewer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState<string>("(a(b)c)");
  const [isJson, setIsJson] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [tree, setTree] = useState<Tree | null>(null);

  const handleBuildTree = () => {
    try {
      setError(null);
      let newTree: Tree;

      if (isJson) {
        const parsedInput = JSON.parse(input);
        newTree = Tree.fromJSON(parsedInput);
      } else {
        newTree = Tree.fromString(input);
      }

      setTree(newTree);

      if (containerRef.current) {
        newTree.render("tree-container");
      }
    } catch (err) {
      setError("Error procesando la entrada. Por favor verifica la sintaxis.");
      console.error("Error al construir el árbol:", err);
    }
  };

  return (
    <article className="p-5 flex justify-center items-center flex-col">
      <h1 className="text-white text-3xl font-mono">Árbol de Parseo</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div
        className={`relative p-5 shadow-lg rounded-xl h-[500px] w-full transition-all duration-500 ease-in-out border-transparent ${
          tree ? "border-4 border-transparent animate-fadeIn" : ""
        }`}
      >
        <div id="automaton-gradient">
          <span className="flex p-5 flex-row items-center gap-2 justify-between">
            {tree ? (
              <>
                <div className="flex-col flex w-1/2 justify-center text-center gap-4">
                  <h1 className="text-white text-2xl font-mono">
                    Detalles del Árbol
                  </h1>
                  <div className="overflow-x-auto max-w-full">
                    <table className="table-auto border-collapse border border-gray-300 w-full text-white font-mono">
                      <thead>
                        <tr>
                          <th className="border border-gray-300 p-2">Nodo</th>
                          <th className="border border-gray-300 p-2">
                            Número de Hijos
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {tree.root.children?.map((node, index) => (
                          <tr key={index} className="border border-gray-300">
                            <td className="border border-gray-300 px-4 py-2 text-center">
                              {node.name}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                              {node.children?.length || 0}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-white font-mono">
                    Total de Nodos: {tree.root.children?.length || 0}
                  </p>
                </div>
                <div
                  ref={containerRef}
                  id="tree-container"
                  className="w-1/2"
                ></div>
              </>
            ) : (
              <div className="flex justify-center flex-col items-center w-full h-full gap-5">
                <p className="text-white font-mono">
                  No hay árbol de parseo para mostrar.
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
      <div className="flex flex-col items-center gap-4 w-full">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            isJson ? "Ingresa un JSON válido" : "Ingresa una cadena (a(b)c)"
          }
          rows={4}
          cols={50}
          className="border border-gray-300 rounded-md p-2"
        />
        <label className="text-white font-mono">
          <input
            type="checkbox"
            checked={isJson}
            onChange={(e) => setIsJson(e.target.checked)}
            className="mr-2"
          />
          Entrada en formato JSON
        </label>
        <button
          onClick={handleBuildTree}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Construir Árbol
        </button>
      </div>
    </article>
  );
};

export default ParseTreeViewer;
