// Componente para mostrar las configuraciones de la gramática

import React from "react";
import { Input } from "./Input";
import useGrammar from "../hooks/useGrammar";
import Loader from "./Loader";
import { SelectOptions } from "./Select";

const SettingsAside: React.FC = () => {
  const { callbackSettings, loader } = useGrammar();

  const inputs: Inputs[] = [
    {
      type: "text",
      label: "Terminales",
      placeholder: "Ejemplo: a,b,c",
      role: "terminals",
    },
    {
      type: "text",
      label: "No terminales",
      placeholder: "Ejemplo: S,A,B",
      role: "noterminals",
    },
    {
      type: "text",
      label: "Producciones",
      placeholder: "Ejemplo: S->aA",
      role: "productions",
    },
  ];

  const filterElements = (
    elements: HTMLFormControlsCollection,
    nodeName: string
  ) => {
    const inputs = Array.from(elements).filter(
      (element): element is HTMLInputElement => element.nodeName === nodeName
    );

    return inputs;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { elements } = event.currentTarget;

    const inputs = Array.from(elements).filter(
      (element): element is HTMLInputElement =>
        element.nodeName === "INPUT" || element.nodeName === "SELECT"
    );

    const values: SettingsForm = inputs.reduce((acc, input) => {
      const { name, value } = input as HTMLInputElement | HTMLSelectElement;
      return {
        ...acc,
        [name]: value,
      };
    }, {} as SettingsForm);

    callbackSettings(values);
  };

  return (
    <>
      {loader && <Loader />}
      <aside className="relative w-auto h-full p-8 border-4 animate-border-gradient rounded-xl">
        <h2 className="text-xl font-bold text-white">Configuraciones</h2>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="mt-4">
            <SelectOptions
              label={"Tipo de gramática"}
              name="typeGrammar"
              listOptions={[
                { value: 0, label: "Gramática Regular" },
                { value: 1, label: "Gramática Libre de Contexto" },
                { value: 2, label: "Gramática Sensible al Contexto" },
                { value: 3, label: "Gramática Irrestricta" },
              ]}
            />
          </div>
          {inputs.map((input, index) => (
            <div key={index} className="mt-4">
              <Input
                type={input.type}
                label={input.label}
                name={input.role}
                placeholder={input.placeholder}
              />
            </div>
          ))}

          <div className="mt-4">
            <button className="w-full relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
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
