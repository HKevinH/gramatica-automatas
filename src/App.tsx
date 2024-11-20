import ParseTree from "./components/ParseTree";
import React, { useRef } from "react";
import SettingsAside from "./components/SettingsAside";
import AutomatonViewer from "./components/AutomatonViewer";
import { useTree } from "./hooks/useTree";
function App() {
  const [typeAutomaton, setTypeAutomaton] = React.useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { IsJson, setIsJson, handleBuildTree } = useTree();
  const callbackOnClick = (input: string) => {
    console.log(input);
    handleBuildTree(containerRef, input);
  };
  return (
    <div className="min-h-screen flex items-center">
      {/*     Header*/}

      {/*   Aside */}
      <SettingsAside
        setTypeAutomaton={setTypeAutomaton}
        typeAutomaton={typeAutomaton}
        IsJson={IsJson}
        setIsJson={setIsJson}
        callbackOnClick={callbackOnClick}
      />

      <main className="w-[90%] h-auto flex flex-col">
        {/* <SettingsAside /> */}
        {typeAutomaton === 1 && <AutomatonViewer />}
        {typeAutomaton === 0 && <ParseTree containerRef={containerRef} />}
      </main>

      <footer>footer</footer>
    </div>
  );
}

export default App;
