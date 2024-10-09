import AutomatonViewer from "./components/AutomatonViewer";
import SettingsAside from "./components/SettingsAside";
function App() {
  return (
    <div className="min-h-screen flex items-center">
      {/*     Header*/}

      {/*   Aside */}
      <SettingsAside />

      <main className="w-[90%] h-auto flex flex-col">
        {/* <SettingsAside /> */}
        <AutomatonViewer />
      </main>

      <footer>footer</footer>
    </div>
  );
}

export default App;
