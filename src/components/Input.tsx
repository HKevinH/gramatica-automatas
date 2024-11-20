interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: "text" | "number" | "password" | "textarea";
  label: string;
  placeholder: string;
}

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  // onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  type: "textarea";
  label: string;
  placeholder: string;
}

const Textarea = (props: TextareaProps) => {
  return <textarea {...props} />;
};

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
        className="block text-sm font-medium text-white font-mono"
      >
        {label}
      </label>
      {type != "textarea" ? (
        <input
          {...props}
          //onChange={onChange}
          type={type}
          placeholder={placeholder}
          className="mt-2 w-full p-2 border-2 rounded-md outline-none font-mono"
        />
      ) : (
        <Textarea
          type="textarea"
          label={label}
          {...props}
          onChange={onChange}
          placeholder={placeholder}
          className="mt-2 w-full p-2 border-2 rounded-md outline-none font-mono"
        />
      )}
    </>
  );
};

export { Input };
