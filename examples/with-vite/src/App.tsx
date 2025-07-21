import { ConnectButton } from "@rainbow-me/rainbowkit";
import { getKeplrFromWindow } from "./utils";
import { useState, useEffect } from "react";

function App() {
  const [isKeplrInjected, setIsKeplrInjected] = useState(false);

  useEffect(() => {
    (async () => {
      const keplr = await getKeplrFromWindow();
      setIsKeplrInjected(!!keplr);
    })();
  }, []);

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
      {isKeplrInjected ? "Keplr Injected" : "Keplr Not Injected"}
      <ConnectButton />
    </div>
  );
}

export default App;
