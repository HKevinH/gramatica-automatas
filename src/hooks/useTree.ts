import React from "react";
import { Tree } from "../models/Tree";
import { useStore } from "../store/store";

export const useTree = () => {
  const [IsJson, setIsJson] = React.useState<boolean>(false);
  const { tree, setTree } = useStore((state) => state);
  const [error, setError] = React.useState<string | null>(null);

  const handleBuildTree = (containerRef, input) => {
    try {
      setError(null);
      let newTree: Tree;

      if (IsJson) {
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

  return {
    IsJson,
    handleBuildTree,
    error,
    tree,
    setIsJson,
  };
};
