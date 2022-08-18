import { SignUp } from "./components/SignUp";
import { LogIn } from "./components/LogIn";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { axiosClient } from "./api/axiosClient.js";
import { userAPI } from "./api/user.js";

export function App() {
  const { localData } = useLocalStorage();

  const handleSecret = async () => {
    const request = userAPI.index(localData);
    try {
    const response = await axiosClient.request(request);
    console.log(response);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-700 text-2xl text-white">
      <button className="p-4 border" onClick={handleSecret}>Secret button</button>
      <LogIn />
      {localData ? null : (
        <>
          <div className="italic m-4">or</div>
          <SignUp />
        </>
      )}
    </div>
  );
}
