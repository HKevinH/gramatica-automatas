import ParseTree from "./components/ParseTree";
import React from "react";
import SettingsAside from "./components/SettingsAside";
import AutomatonViewer from "./components/AutomatonViewer";
function App() {
  const [typeAutomaton, setTypeAutomaton] = React.useState<number>(0);

  return (
    <div className="min-h-screen flex items-center">
      {/*     Header*/}

      {/*   Aside */}
      <SettingsAside
        setTypeAutomaton={setTypeAutomaton}
        typeAutomaton={typeAutomaton}
      />

      <main className="w-[90%] h-auto flex flex-col">
        {/* <SettingsAside /> */}
        {typeAutomaton === 1 && <AutomatonViewer />}
        {typeAutomaton === 0 && <ParseTree />}
      </main>

      <footer>footer</footer>
    </div>
  );
}

export default App;
