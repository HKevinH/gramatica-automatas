//Hook para manejar el estado y operaciones relacionadas con la gramática (crear, derivar, verificar tipo, etc.).
import { useEffect, useState } from "react";
import Grammar, { ProductionRule } from "../models/Grammar";

const useGrammar = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [grammar, setGrammar] = useState<Grammar | null>(null); // Almacenamos la gramática creada
  const [derivedStrings, setDerivedStrings] = useState<string[]>([]); // Almacenamos las derivaciones
  const [isRegular, setIsRegular] = useState<boolean>(false); // Estado para indicar si es regular
  const [isContextFree, setIsContextFree] = useState<boolean>(false); // Estado para indicar si es libre de contexto

  // Función para manejar la configuración inicial de la gramática
  const callbackSettings = (data: SettingsForm) => {
    console.log("Configuración recibida:", data);
    setLoader(true);

    // Crear una nueva instancia de la gramática
    const newGrammar = new Grammar();

    (data.terminals as string).split(",").forEach((terminal) => {
      newGrammar.addTerminal(terminal.trim());
    });

    (data.noterminals as string).split(",").forEach((nonTerminal) => {
      newGrammar.addNonTerminal(nonTerminal.trim());
    });

    data.productions.split(";").forEach((production, index) => {
      const [left, right] = production.split("->");
      if (left && right) {
        const rightSides = right.split("|").map((r) => r.trim().split(""));
        const productionRule: ProductionRule = {
          id: index,
          left: left.trim(),
          right: rightSides,
          description: `Regla ${index + 1}: ${left.trim()} -> ${right}`,
        };
        newGrammar.addProductionRule(productionRule);
      }
    });

    setGrammar(newGrammar);

    setIsRegular(newGrammar.isRegular());
    setIsContextFree(newGrammar.isContextFree());

    console.log("Gramática creada:", newGrammar);
    console.log("Es regular:", newGrammar.isRegular());
    console.log("Es libre de contexto:", newGrammar.isContextFree());

    setLoader(false);
  };

  const deriveFromGrammar = (nonTerminal: string) => {
    if (grammar) {
      const derivations = grammar.deriveString(nonTerminal);
      setDerivedStrings(derivations);
    }
  };

  const verifyStringInGrammar = (
    str: string,
    initialNonTerminal: string = "S"
  ): boolean => {
    if (grammar) {
      return grammar.verifyString(str, initialNonTerminal);
    }
    return false;
  };

  useEffect(() => {
    if (loader) {
      setTimeout(() => {
        setLoader(false);
      }, 1000);
    }
  }, [loader]);

  return {
    loader,
    grammar,
    isRegular,
    isContextFree,
    derivedStrings,
    callbackSettings,
    deriveFromGrammar,
    verifyStringInGrammar,
  };
};

export default useGrammar;
