import GrammarInput from "./components/GrammarInput";
import SettingsAside from "./components/SettingsAside";

function App() {
  return (
    <div className="min-h-screen">
      {/*     Header*/}
      <header>adssad</header>

      <div className="flex flex-1">
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
