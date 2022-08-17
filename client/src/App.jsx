import { SignUp } from "./components/SignUp";
import { LogIn } from "./components/LogIn";
import { useLocalStorage } from "./hooks/useLocalStorage";

export function App() {
  const { localData } = useLocalStorage();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-700 text-2xl text-white">
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
