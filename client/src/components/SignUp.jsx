import { useState } from "react";
import { axiosClient } from "../api/axiosClient";
import { userAPI } from "../api/user";

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

export const SignUp = () => {
  const [credentials, setCredentials] = useState(initialState);

  const handleChange = (newValue) =>
    setCredentials((prev) => ({ ...prev, ...newValue }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const request = userAPI.new(credentials);
    try {
      const result = await axiosClient.request(request);
      console.log(result);
      if (result.status === 200) setCredentials(initialState);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1 className="mb-4 font-serif text-3xl">Sign Up</h1>
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
          Sign Up
        </button>
      </form>
    </>
  );
};
