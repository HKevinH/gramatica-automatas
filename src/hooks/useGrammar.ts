/* eslint-disable @typescript-eslint/no-explicit-any */
//Hook para manejar el estado y operaciones relacionadas con la gramática (crear, derivar, verificar tipo, etc.).
import { useEffect, useState } from "react";
import Grammar from "../models/Grammar";
import Automaton from "../models/Automaton";
import { useStore } from "../store/store";
const useGrammar = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const { setData, clearData, setDeritiveStrings } = useStore((state) => state);
  const [grammar, setGrammar] = useState<Grammar | null>(null);
  const [derivedStrings, setDerivedStrings] = useState<string[]>([]);
  const [isRegular, setIsRegular] = useState<boolean>(false);
  const [isContextFree, setIsContextFree] = useState<boolean>(false);
  const [automaton, setAutomaton] = useState<Automaton | null>(null);

  const validateSettings = (data: SettingsForm) => {
    const terminalPattern = /^[a-z](,[a-z])*$/.test(data.terminals.trim());
    const nonTerminalPattern = /^[A-Z](,[A-Z])*$/.test(data.noterminals.trim());
    const productionPattern =
      /^([A-Z]->([a-zA-Z]*)(\|([a-zA-Z]*))*)?(;([A-Z]->([a-zA-Z]*)(\|([a-zA-Z]*))*))*$/.test(
        data.productions.trim()
      );

    return terminalPattern && nonTerminalPattern && productionPattern;
  };

  const callbackSettings = (data: SettingsForm) => {
    clearData();
    if (!validateSettings(data)) {
      console.log("Configuración inválida", data);
      return;
    }
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
        //console.log("Producción añadida:", productionRule);
      } else {
        console.error(
          `Error en la producción en el índice ${index}: ${production}`
        );
      }
    });

    //Derivar todas las cadenas
    setGrammar(newGrammar);

    setIsRegular(newGrammar.isRegular());
    setIsContextFree(newGrammar.isContextFree());
    if (newGrammar.isRegular()) {
      const generatedAutomaton = newGrammar.toAutomaton();
      //console.log("Automata generado:", generatedAutomaton);
      setAutomaton(generatedAutomaton);
      if (generatedAutomaton) {
        const dot = generatedAutomaton.toDOT();
        setData(dot);
      }
    } else {
      setAutomaton(null);
      console.log("La gramática no es regular. No se genera un autómata.");
    }

    //console.log(newGrammar.deriveString("B"), "derive");
    let derivations: any[] = [];

    newGrammar?.nonTerminals?.forEach((nonTerminal) => {
      const derivationSteps = newGrammar.deriveString(nonTerminal);
      //console.log(`Derivaciones para ${nonTerminal}:`, derivationSteps);
      derivations = derivations.concat(
        derivationSteps.map((steps) => ({
          lengthShorts: nonTerminal,
          derivationSteps: steps,
        }))
      );
    });

    setDeritiveStrings(derivations as []);
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
    automaton,
  };
};

export default useGrammar;
