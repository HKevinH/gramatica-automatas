// models/Automaton.ts

interface Transition {
  from: string; // Estado de origen
  symbol: string; // Símbolo de transición
  to: string; // Estado de destino
}

class Automaton {
  states: Set<string>;
  alphabet: Set<string>;
  transitions: Transition[];
  startState: string;
  acceptStates: Set<string>;

  constructor() {
    this.states = new Set();
    this.alphabet = new Set();
    this.transitions = [];
    this.startState = "";
    this.acceptStates = new Set();
  }

  addState(state: string) {
    this.states.add(state);
  }

  addSymbol(symbol: string) {
    this.alphabet.add(symbol);
  }

  addTransition(from: string, symbol: string, to: string) {
    this.transitions.push({ from, symbol, to });
  }

  setStartState(state: string) {
    this.startState = state;
  }

  addAcceptState(state: string) {
    this.acceptStates.add(state);
  }

  // Método para visualizar el autómata (opcional)
  printAutomaton() {
    console.log("Estados:", Array.from(this.states));
    console.log("Alfabeto:", Array.from(this.alphabet));
    console.log("Transiciones:");
    this.transitions.forEach((t) => {
      console.log(`  ${t.from} --${t.symbol}--> ${t.to}`);
    });
    console.log("Estado Inicial:", this.startState);
    console.log("Estados de Aceptación:", Array.from(this.acceptStates));
  }

  toDOT(): string {
    let dot = "digraph FiniteAutomaton {\n";
    dot += "  rankdir=LR;\n";
    dot += '  size="8,5";\n';

    // Definir estados de aceptación con forma de doble círculo
    if (this.acceptStates.size > 0) {
      dot += `  node [shape = doublecircle]; ${Array.from(
        this.acceptStates
      ).join(" ")};\n`;
    }

    // Definir otros estados con forma de círculo
    dot += "  node [shape = circle];\n";

    // Definir estado inicial usando un nodo "start" de forma punto
    if (this.startState) {
      dot += '  node [shape = point, label=""] start;\n'; // Nodo "start" sin etiqueta
      dot += `  start -> ${this.startState};\n`; // Conectar desde "start" en lugar de ""
    }

    // Agregar transiciones
    this.transitions.forEach((t) => {
      // Asegurarse de que los nombres de los nodos están correctamente escapados si contienen caracteres especiales
      const from = this.escapeDOTIdentifier(t.from);
      const to = this.escapeDOTIdentifier(t.to);
      const label = this.escapeDOTLabel(t.symbol);
      dot += `  ${from} -> ${to} [ label = "${label}" ];\n`;
    });

    dot += "}\n";
    return dot;
  }
  /**
   * Detecta ciclos en el autómata utilizando un recorrido DFS.
   * @returns true si hay ciclos, false en caso contrario.
   */
  hasCycles(): boolean {
    const visited = new Set<string>();
    const stack = new Set<string>();

    const dfs = (state: string): boolean => {
      if (stack.has(state)) {
        return true;
      }
      if (visited.has(state)) {
        return false;
      }

      visited.add(state);
      stack.add(state);

      for (const transition of this.transitions) {
        if (transition.from === state) {
          if (dfs(transition.to)) {
            console.log("Ciclo detectado:", state, "->", transition.to);
            return true;
          }
        }
      }

      stack.delete(state);
      return false;
    };

    // Iniciar DFS desde el estado inicial
    console.log("Buscando ciclos...");
    return dfs(this.startState);
  }

  /**
   * Detecta si un estado de aceptación es alcanzable desde el estado inicial.
   * @returns Un array con las rutas hacia los estados de aceptación.
   */
  findPathsToAcceptStates(): string[][] {
    const paths: string[][] = [];
    const visited = new Set<string>();

    const dfs = (state: string, path: string[]) => {
      if (visited.has(state)) {
        return;
      }
      visited.add(state);
      path.push(state);

      if (this.acceptStates.has(state)) {
        paths.push([...path]);
      } else {
        for (const transition of this.transitions) {
          if (transition.from === state) {
            dfs(transition.to, path);
          }
        }
      }

      path.pop();
      visited.delete(state);
    };

    dfs(this.startState, []);
    return paths;
  }

  /**
   * Escapa identificadores de DOT si contienen caracteres especiales o espacios.
   * @param identifier Nombre del nodo.
   * @returns Nombre escapado si es necesario.
   */
  private escapeDOTIdentifier(identifier: string): string {
    // Si el identificador contiene caracteres especiales, lo encierra en comillas
    if (/[^a-zA-Z0-9_]/.test(identifier)) {
      return `"${identifier}"`;
    }
    return identifier;
  }

  /**
   * Escapa etiquetas de DOT para manejar comillas y otros caracteres especiales.
   * @param label Texto de la etiqueta.
   * @returns Etiqueta escapada.
   */
  private escapeDOTLabel(label: string): string {
    return label.replace(/"/g, '\\"');
  }
}

export default Automaton;
