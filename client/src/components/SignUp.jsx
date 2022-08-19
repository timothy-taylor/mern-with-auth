import { useState, useEffect } from "react";
import { axiosClient } from "../api/axiosClient";
import { httpStatus } from "../api/httpStatus";
import { userAPI } from "../api/user";
import { Label } from "./Label";
import { FormHeader } from "./FormHeader";

const defaultCredentials = { username: "", password: "", confirmPassword: "" };

export const SignUp = () => {
  const [credentials, setCredentials] = useState(defaultCredentials);
  const [passwordError, setPasswordError] = useState(null);

  const handleChange = (newValue) =>
    setCredentials((prev) => ({ ...prev, ...newValue }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = userAPI.new(credentials);
    try {
      const response = await axiosClient.request(requestBody);
      if (response.status === httpStatus.CREATED) setCredentials(defaultCredentials);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    credentials.password !== credentials.confirmPassword
      ? setPasswordError("passwords must match")
      : setPasswordError(null);
  }, [credentials.confirmPassword, credentials.password]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormHeader text="Create Account" />
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
        <Label
          label="confirmPassword"
          type="password"
          value={credentials.confirmPassword}
          handleChange={handleChange}
        />
        <div className="mt-2 italic text-center text-xs text-red-500">
          {passwordError}
        </div>
        <button
          type="submit"
          className={`p-4 mt-2 border ${
            passwordError
              ? "text-slate-500 border-slate-500"
              : "hover:text-slate-700 hover:bg-white"
          }`}
          disabled={!!passwordError}
        >
          Sign Up
        </button>
      </form>
    </>
  );
};
