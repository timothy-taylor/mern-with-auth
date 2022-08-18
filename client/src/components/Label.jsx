export const Label = ({ label, value, type, handleChange }) => (
  <label className="flex flex-col">
    {label}
    <input
      type={type}
      className="text-black"
      value={value}
      onChange={(e) => handleChange({ [label]: e.target.value })}
      required
    />
  </label>
);
