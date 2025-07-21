import { ConnectButton } from "@rainbow-me/rainbowkit";

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        padding: 12,
        gap: 12,
        alignItems: "center",
      }}
    >
      {Object.hasOwn(window, "keplr") ? "Keplr Injected" : "Keplr Not Injected"}
      <ConnectButton />
    </div>
  );
}

export default App;
