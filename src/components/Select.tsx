import React from "react";

interface SelectOptionProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  listOptions: {
    value: string | number;
    label: string;
  }[];
  label: string;
  name: string;
}

const SelectOptions: React.FC<SelectOptionProps> = ({
  listOptions,
  label,
  name,
  onChange,
}) => {
  return (
    <>
      <label
        htmlFor="grammarType"
        className="block text-sm font-medium text-white font-mono"
      >
        {label}
      </label>
      <select
        className="w-full p-2 border-2 rounded-md outline-none mt-2 font-mono"
        name={name}
        onChange={onChange}
      >
        {listOptions.map((option) => (
          <option key={option.value} value={option.value} className="font-mono">
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

export { SelectOptions };
