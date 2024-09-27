interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: "text" | "number";
  label: string;
  placeholder: string;
}
const Input: React.FC<InputProps> = ({
  type,
  onChange,
  label,
  placeholder,
  ...props
}) => {
  return (
    <>
      <label
        htmlFor="grammarType"
        className="block text-sm font-medium text-white"
      >
        {label}
      </label>
      <input
        {...props}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full p-2 border-2 rounded-md outline-none"
      />
    </>
  );
};

export { Input };
