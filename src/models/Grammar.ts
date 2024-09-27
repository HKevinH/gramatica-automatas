// Clase principal para representar y manipular gramáticas.

interface ProductionRule {
  //  Interfaz para representar una regla de producción.
  id: number; // Identificador único de la regla de producción
  left: string; // No terminal en el lado izquierdo de la producción
  right: string[]; // Lado derecho de la producción, puede ser una lista de terminales y no terminales
  description: string; // Descripción de la regla de producción
}

// Ejemplo de una producción:
// S -> aA | bB
// { left: "S", right: [["a", "A"], ["b", "B"]] }

class Grammar {
  //  Constructor de la clase.

  nonTerminals: Set<string>;
  terminals: Set<string>;
  productionRules: Set<ProductionRule>;
  typeGrammar: number; // 0 = Regular, 1 = Libre de Contexto, 2 = Sensible al Contexto, 3 = Irrestricta

  constructor() {
    //  Inicializa la gramática con un conjunto vacío de no terminales.
    this.nonTerminals = new Set();
    //  Inicializa la gramática con un conjunto vacío de terminales.
    this.terminals = new Set();
    //  Inicializa la gramática con un conjunto vacío de reglas de producción.
    this.productionRules = new Set();
    //  Inicializa la gramática como Regular por defecto.
    this.typeGrammar = 0;
  }
  //  Función para agregar un no terminal a la gramática.
  addNonTerminal(nonTerminal: string) {
    this.nonTerminals.add(nonTerminal);
  }
  //  Función para agregar un terminal a la gramática.
  addTerminal(terminal: string) {
    this.terminals.add(terminal);
  }
  // Función para agregar una regla de producción a la gramática.
  // Recibe un objeto de tipo ProductionRule.
  addProductionRule(productionRule: ProductionRule) {
    this.productionRules.add(productionRule);
  }

  // Función para verificar si la gramática es regular.
  // Comprueba que todas las reglas de producción cumplan con la forma A -> aB o A -> a.
  /**
   *
   * @returns El método isRegular está diseñado para determinar si un conjunto de reglas de producción en una gramática es regular. En el contexto de la teoría de lenguajes formales,
   * una gramática regular es aquella en la que cada regla de producción cumple con formas específicas.
   * Este método itera a través de cada regla de producción en el array productionRules, que presumiblemente es
   * una propiedad de la clase que contiene este método.

   * Para cada regla, el método itera a través del lado derecho de la regla, que representa las producciones. Luego,
   * verifica dos condiciones para cada producción: si la longitud de la producción es mayor que 2, o si la longitud es exactamente 2
   * pero el segundo elemento no es un símbolo no terminal (como se indica por el conjunto nonTerminals). Si se cumple alguna de estas condiciones,
   * el método devuelve false, indicando que la gramática no es regular.
   * Esto se debe a que las reglas de producción de una gramática regular deben tener la forma A -> aB o A -> a,
   * donde A y B son símbolos no terminales y a es un símbolo terminal.
   * Si ninguna de las producciones viola estas condiciones, el método devuelve true, confirmando que todas las reglas de producción cumplen con los requisitos de una gramática regular.
   * El comentario en español, "Regla no cumple con la forma A -> aB o A -> a," explica brevemente la razón detrás de devolver false.
   */

  isRegular(): boolean {
    for (const rule of this.productionRules) {
      for (const production of rule.right) {
        if (
          production.length > 2 ||
          (production.length === 2 && !this.nonTerminals.has(production[1]))
        ) {
          return false; // Regla no cumple con la forma A -> aB o A -> a
        }
      }
    }
    return true;
  }

  // Función para verificar si la gramática es libre de contexto.
  /**
   *
   * @returns El método isContextFree está diseñado para determinar si un conjunto de reglas de producción en una gramática es libre de contexto. En el contexto de la teoría de lenguajes formales,
   * una gramática libre de contexto es aquella en la que cada regla de producción cumple con una forma específica.
   * Este método itera a través de cada regla de producción en el array productionRules, que presumiblemente es una propiedad de la clase que contiene este método.
   * Para cada regla, el método verifica dos condiciones: si la longitud del lado izquierdo de la regla es diferente de 1, o si el lado izquierdo de la regla no es un símbolo no terminal
   * (como se indica por el conjunto nonTerminals).
   */

  isContextFree(): boolean {
    for (const rule of this.productionRules) {
      if (rule.left.length !== 1 || !this.nonTerminals.has(rule.left)) {
        return false; // Regla no cumple con la forma A -> α
      }
    }
    return true;
  }
  //  Función para verificar si una cadena es generada por la gramática.
  verifyString(initialNode: string, str: string): boolean {
    const derivedStrings = this.deriveString(initialNode); // Suponiendo que "S" es el no terminal inicial
    return derivedStrings.includes(str);
  }
  //  Función para derivar una cadena a partir de un no terminal inicial.
  deriveString(initialNonTerminal: string): string[] {
    let derivedStrings: string[] = [initialNonTerminal];

    // Implementar derivación aplicando reglas de producción
    // Se debería utilizar una estrategia de expansión hasta que se genere una cadena terminal
    let finished = false;
    while (!finished) {
      finished = true;
      const newDerivedStrings: string[] = [];

      for (const str of derivedStrings) {
        let expanded = false;
        for (const rule of this.productionRules) {
          if (str.includes(rule.left)) {
            expanded = true;
            finished = false;
            for (const production of rule.right) {
              newDerivedStrings.push(
                str.replace(
                  rule.left,
                  Array.isArray(production) ? production.join("") : production
                )
              );
            }
          }
        }
        if (!expanded) newDerivedStrings.push(str);
      }

      derivedStrings = newDerivedStrings;
    }

    return derivedStrings.filter((str) =>
      Array.from(str).every((char) => this.terminals.has(char))
    );
  }
}

export default Grammar;
