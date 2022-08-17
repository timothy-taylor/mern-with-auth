import { useState } from "react";
import { axiosClient } from "../api/axiosClient";
import { authAPI } from "../api/auth.js";
import { useLocalStorage } from "../hooks/useLocalStorage";

const LogOut = ({ handleLogout }) => (
  <button
    className="p-4 m-2 border"
    onClick={() => handleLogout()}
  >
    Sign Out
  </button>
);

const Label = ({ label, value, type, handleChange }) => (
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

const initialState = { username: "", password: "" };

export const LogIn = () => {
  const { localData, setLocalData, clearLocalData } = useLocalStorage();
  const [credentials, setCredentials] = useState(initialState);

  const handleChange = (newValue) =>
    setCredentials((prev) => ({ ...prev, ...newValue }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const request = authAPI.new(credentials);
    try {
      const result = await axiosClient.request(request);
      if (result.status === 200) {
        console.log(result.data);
        setCredentials(initialState);
        setLocalData(result.data.token);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (localData) return <LogOut handleLogout={clearLocalData} />;
  return (
    <form onSubmit={handleSubmit}>
      <h1 className="mb-4 font-serif text-3xl">Log In</h1>
      <Label
        label="username"
        type="text"
        value={credentials.username}
        handleChange={handleChange}
      />
      <Label
        label="password"
        type="password"
        value={credentials.password}
        handleChange={handleChange}
      />
      <button
        type="submit"
        className="p-4 mt-2 border hover:text-slate-700 hover:bg-white"
      >
        Sign In
      </button>
    </form>
  );
};
