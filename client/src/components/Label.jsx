export const Label = ({ label, value, type, handleChange }) => (
  <label className="flex flex-col">
    {label}
    <input
      type={type}
      className="text-black p-1"
      value={value}
      onChange={(e) => handleChange({ [label]: e.target.value })}
      required
    />
  </label>
);
