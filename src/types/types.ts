declare global {
  export interface Inputs {
    label: string;
    type: "text" | "number";
    placeholder: string;
    role: "terminals" | "noterminals" | "productions";
  }

  export interface SettingsForm {
    noterminals: string[] | string;
    terminals: string[] | string;
    productions: string[] | string;
    typeGrammar: string | number;
  }

  export interface Item {
    title: string;
    description: string;
  }

  export interface Section {
    title: string;
    items: Item[];
  }
}

export {};
