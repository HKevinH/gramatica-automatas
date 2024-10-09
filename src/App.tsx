import AutomatonViewer from "./components/AutomatonViewer";
import SettingsAside from "./components/SettingsAside";
function App() {
  return (
    <div className="min-h-screen">
      {/*     Header*/}

      <header>adssad</header>

      <div className={`flex flex-1 h-screen`}>
        {/*   Aside */}
        <SettingsAside />

        <main className="w-screen h-screen dark:bg-black">
          {/* <SettingsAside /> */}
          <AutomatonViewer />
        </main>
      </div>

      <footer>footer</footer>
    </div>
  );
}

export default App;
