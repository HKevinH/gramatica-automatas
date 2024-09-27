//  Componente para que el usuario ingrese la gramática (no terminales, terminales y reglas de producción).

import React from "react";

// Agregar Los Simbolos que debe agregar

interface GrammarInputProps extends HTMLInputElement {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const GrammarInput: React.FC<GrammarInputProps> = () => {
  return (
    <div className="w-full">
      <input type="text" />
    </div>
  );
};

export default GrammarInput;
// Compare this snippet from src/components/GrammarTypeChecker.tsx:
