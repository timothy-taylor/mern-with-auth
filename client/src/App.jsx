import { SignUp } from "./components/SignUp";
import { LogIn } from "./components/LogIn";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { axiosClient } from "./api/axiosClient.js";
import { userAPI } from "./api/user.js";

const SecretButton = ({ handleSecret }) => {
  return (
    <button className="p-4 m-4 border" onClick={handleSecret}>
      Secret button
    </button>
  );
};

export function App() {
  const { token, setToken, clearLocalData } = useLocalStorage();

  const handleSecret = async () => {
    const requestBody = userAPI.index(token);
    try {
      const response = await axiosClient.request(requestBody);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-700 text-2xl text-white">
      <LogIn {...{ token, setToken, clearLocalData }} />
      {token ? (
        <SecretButton {...{ handleSecret }} />
      ) : (
        <>
          <div className="italic m-4">or</div>
          <SignUp />
        </>
      )}
    </div>
  );
}
