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
}) => {
  return (
    <>
      <label
        htmlFor="grammarType"
        className="block text-sm font-medium text-white"
      >
        {label}
      </label>
      <select
        className="w-full p-2 border-2 rounded-md outline-none mt-2"
        name={name}
      >
        {listOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

export { SelectOptions };
