import { useEffect, useState } from "react";
import GrammarInput from "./components/GrammarInput";
import SettingsAside from "./components/SettingsAside";
import useGrammar from "./hooks/useGrammar";
import Loader from "./components/Loader";

function App() {
  const { loader } = useGrammar();

  console.log(loader, "loader");
  return (
    <div className="min-h-screen">
      {/*     Header*/}

      <header>adssad</header>

      <div className={`flex flex-1 h-screen`}>
        {/*   Aside */}
        <SettingsAside />

        <main className="w-screen h-screen dark:bg-black">
          {/* <SettingsAside /> */}
        </main>
      </div>

      <footer>footer</footer>
    </div>
  );
}

export default App;
