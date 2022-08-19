import { useState } from "react";
import { axiosClient } from "../api/axiosClient";
import { httpStatus } from "../api/httpStatus";
import { authAPI } from "../api/auth";
import { Label } from "./Label";
import { FormHeader } from "./FormHeader";
import { Button } from "./Button";

const initialState = { username: "", password: "" };

export const LogIn = ({ token, setToken, clearLocalData }) => {
  const [credentials, setCredentials] = useState(initialState);

  const handleChange = (newValue) =>
    setCredentials((prev) => ({ ...prev, ...newValue }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = authAPI.new(credentials);
    try {
      const response = await axiosClient.request(requestBody);
      if (response.status === httpStatus.CREATED) {
        console.log(response.data);
        setToken(response.data.token);
        setCredentials(initialState);
      }
    } catch (err) {
      console.error(err);
    }
  };

  //
  // a truthy token means the user is logged in
  if (token) return <Button text="Sign Out" handleClick={clearLocalData} />;
  return (
    <form onSubmit={handleSubmit}>
      <FormHeader text="Log In" />
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
        className="p-4 mt-4 border hover:text-slate-700 hover:bg-white"
      >
        Sign In
      </button>
    </form>
  );
};
