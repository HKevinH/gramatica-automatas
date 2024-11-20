declare global {
  export interface Inputs {
    label: string;
    type: "text" | "number" | "textarea";
    placeholder: string;
    role: "terminals" | "noterminals" | "productions" | "input";
    category: number;
  }

  export interface SettingsForm {
    noterminals: string;
    terminals: string;
    productions: string;
    typeGrammar: string | number;
  }

  export interface Item {
    title: string;
    description: string;
    category: number;
  }

  export interface Section {
    title: string;
    items: Item[];
  }

  export interface ProductionRule {
    //  Interfaz para representar una regla de producción.
    id: number; // Identificador único de la regla de producción
    left: string; // No terminal en el lado izquierdo de la producción
    right: string[][]; // Lado derecho de la producción, puede ser una lista de terminales y no terminales
    description: string; // Descripción de la regla de producción
  }
}

export {};
