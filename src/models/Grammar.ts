// Clase principal para representar y manipular gramáticas.

interface ProductionRule {
  //  Interfaz para representar una regla de producción.
  leftSide: string;
  rightSide: string;
}

class Grammar {
  //  Constructor de la clase.

  nonTerminals: Set<string>;
  terminals: Set<string>;
  productionRules: Set<ProductionRule>;

  constructor() {
    //  Inicializa la gramática con un conjunto vacío de no terminales.
    this.nonTerminals = new Set();
    //  Inicializa la gramática con un conjunto vacío de terminales.
    this.terminals = new Set();
    //  Inicializa la gramática con un conjunto vacío de reglas de producción.
    this.productionRules = new Set();
  }
  //  Función para agregar un no terminal a la gramática.
  addNonTerminal(nonTerminal: string) {
    this.nonTerminals.add(nonTerminal);
  }
  //  Función para agregar un terminal a la gramática.
  addTerminal(terminal: string) {
    this.terminals.add(terminal);
  }
  //  Función para agregar una regla de producción a la gramática.
  addProductionRule(productionRule: ProductionRule) {
    this.productionRules.add(productionRule);
  }
  //  Función para verificar si una cadena es generada por la gramática.
  verifyString(str: string) {
    console.log("verifyString", str);
    //  Implementación de la verificación.
    return false;
  }
  //  Función para derivar una cadena a partir de un no terminal inicial.
  deriveString(initialNonTerminal: string) {
    console.log("deriveString", initialNonTerminal);
    //  Implementación de la derivación.
    return "";
  }
  //  Función para verificar si la gramática es regular.
  isRegular() {
    //  Implementación de la verificación.
    return false;
  }
}

export default Grammar;
