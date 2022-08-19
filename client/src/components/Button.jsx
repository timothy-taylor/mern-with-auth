export const Button = ({ text, handleClick }) =>
  <button className="p-4 m-1 border hover:text-slate-700 hover:bg-white" onClick={handleClick}>
    {text}
  </button>
