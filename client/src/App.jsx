import { SignUp } from "./components/SignUp";
import { LogIn } from "./components/LogIn";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { axiosClient } from "./api/axiosClient.js";
import { userAPI } from "./api/user.js";
import { Button } from "./components/Button";

export const App = () => {
  const { token, setToken, clearLocalData } = useLocalStorage();

  //
  // calls a protected API route
  // as an example
  const handleSecrets = async () => {
    const requestBody = userAPI.index(token);
    try {
      const response = await axiosClient.request(requestBody);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const conditionallyRenderSignUp = () => {
    if (token) return <Button text="Secret Button" handleClick={handleSecrets} />;
    return (
      <>
        <div className="italic m-8 text-slate-300 text-sm">or</div>
        <SignUp />
      </>
    );
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-slate-700 text-2xl text-white">
      <LogIn {...{ token, setToken, clearLocalData }} />
      {conditionallyRenderSignUp()}
    </main>
  );
};
