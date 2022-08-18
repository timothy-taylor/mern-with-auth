import { useState } from "react";
import { axiosClient } from "../api/axiosClient";
import { authAPI } from "../api/auth.js";
import { Label } from "./Label";

const LogOut = ({ handleLogout }) => (
  <button className="p-4 m-2 border" onClick={() => handleLogout()}>
    Sign Out
  </button>
);

const initialState = { username: "", password: "" };

export const LogIn = ({ token, setToken, clearLocalData }) => {
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
        setToken(result.data.token);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (token) return <LogOut handleLogout={clearLocalData} />;
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
