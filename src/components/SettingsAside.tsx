// Componente para mostrar las configuraciones de la gramática

import React from "react";
import { Input } from "./Input";
import useGrammar from "../hooks/useGrammar";
import Loader from "./Loader";
import { SelectOptions } from "./Select";

interface SettingsAsideProps {
  setTypeAutomaton: React.Dispatch<React.SetStateAction<number>>;
  typeAutomaton: number;
}

const SettingsAside: React.FC<SettingsAsideProps> = ({
  setTypeAutomaton,
  typeAutomaton,
}) => {
  const [typeGrammar, setTypeGrammar] = React.useState<number>(0);
  const { callbackSettings, loader } = useGrammar();

  const inputs: Inputs[] = [
    {
      type: "text",
      label: "Terminales",
      placeholder: "Ejemplo: a,b,c",
      category: 1,
      role: "terminals",
    },
    {
      type: "text",
      label: "No terminales",
      placeholder: "Ejemplo: S,A,B",
      role: "noterminals",
      category: 1,
    },
    {
      type: "text",
      label: "Producciones",
      placeholder: "Ejemplo: S->aA",
      role: "productions",
      category: 1,
    },
    {
      type: "textarea",
      label: "Entrada arbol de parseo",
      placeholder: "Ejemplo: a+a*a",
      role: "input",
      category: 0,
    },
  ];

  const sections: Section[] = [
    {
      title: "Ayuda",
      items: [
        {
          title: "Gramática Regular",
          description:
            "Es una gramática que solo tiene producciones de la forma A -> aB o A -> a, donde A y B son no terminales y a es un terminal.",
          category: 1,
        },
        {
          title: "Gramática Libre de Contexto",
          description:
            "Es una gramática que solo tiene producciones de la forma A -> α, donde A es un no terminal y α es una cadena de no terminales y terminales.",
          category: 1,
        },
        // {
        //   title: "Gramática Sensible al Contexto",
        //   description:
        //     "Es una gramática que solo tiene producciones de la forma αAβ -> αγβ, donde A es un no terminal y α, β y γ son cadenas de no terminales y terminales.",

        // },
        // {
        //   title: "Gramática Irrestricta",
        //   description:
        //     "Es una gramática que puede tener cualquier tipo de producción.",
        // },

        {
          title: "Arbol de parseo",
          category: 0,
          description: "Muestra el árbol de parseo.",
        },
      ],
    },
  ];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values: SettingsForm = {
      terminals: formData.get("terminals") as string,
      noterminals: formData.get("noterminals") as string,
      productions: formData.get("productions") as string,
      typeGrammar: formData.get("typeGrammar") as string,
    };

    console.log("Configuración recibida:", values);
    callbackSettings(values, typeGrammar);
  };

  return (
    <>
      {loader && <Loader />}
      <aside className="relative w-3/6 p-8 border-4 animate-border-gradient rounded-xl">
        <h2 className="text-xl font-bold text-white font-mono">
          Configuraciones
        </h2>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div>
            <SelectOptions
              label={"Tipo de gramática"}
              name="typeGrammar"
              onChange={(event) => setTypeAutomaton(Number(event.target.value))}
              listOptions={[
                { value: 0, label: "Arbol de parseo" },
                { value: 1, label: "Automata de pila" },
                { value: 2, label: "Automata de pila determinista" },
                { value: 3, label: "Automata de pila no determinista" },
                { value: 4, label: "Automata de pila con transiciones vacias" },
                {
                  value: 5,
                  label:
                    "Autom	ata de pila con transiciones vacias determinista",
                },
                {
                  value: 6,
                  label:
                    "Automata de pila con transiciones vacias no determinista",
                },
                {
                  value: 7,
                  label: "Automata de pila con transiciones vacias y epsilon",
                },
                {
                  value: 8,
                  label:
                    "Automata de pila con transiciones vacias y epsilon determinista",
                },
                {
                  value: 9,
                  label:
                    "Automata de pila con transiciones vacias y epsilon no determinista",
                },
                {
                  value: 10,
                  label:
                    "Automata de pila con transiciones vacias y epsilon y transiciones por pila",
                },
              ]}
            />
          </div>
          {typeAutomaton != 0 && (
            <div className="mt-4">
              <SelectOptions
                label={"Tipo de gramática"}
                name="typeGrammar"
                onChange={(event) => setTypeGrammar(Number(event.target.value))}
                listOptions={[
                  { value: 0, label: "Gramática Regular" },
                  { value: 1, label: "Gramática Libre de Contexto" },
                  // { value: 2, label: "Gramática Sensible al Contexto" },
                  // { value: 3, label: "Gramática Irrestricta" },
                ]}
              />
            </div>
          )}
          {inputs
            .filter((inp) => inp.category === typeAutomaton)
            .map((input, index) => (
              <div key={index} className="mt-4">
                <Input
                  type={input.type}
                  label={input.label}
                  name={input.role}
                  placeholder={input.placeholder}
                />
              </div>
            ))}
          <div className="divide-y divide-blue-200 bg-white"></div>

          {sections.map((section, index) => (
            <div key={index} className="mt-4">
              <h3 className="text-lg font-bold text-white font-mono">
                {section.title}
              </h3>
              <ul className="mt-2">
                {section.items
                  .filter((sec) => sec.category === typeAutomaton)
                  .map((item, index) => (
                    <li key={index} className="mt-2">
                      <h4 className="text-white font-mono">{item.title}</h4>
                      <p className="text-gray-300 font-mono">
                        {item.description}
                      </p>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
          <div className="mt-4">
            <button className="font-mono w-full relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
              <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Comprobar
              </span>
            </button>
          </div>
        </form>
      </aside>
    </>
  );
};

export default SettingsAside;
