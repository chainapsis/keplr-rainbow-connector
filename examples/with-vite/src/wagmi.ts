import { createConfig, http } from "wagmi";
import { mainnet } from "wagmi/chains";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";

import { keplrWallet } from "@keplr-wallet/rainbow-connector";

const projectId = "f97a22553bb65534d447a7485927a623";
const appName = "Keplr Rainbow Connector Example With Vite";

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [keplrWallet],
    },
  ],
  { appName, projectId }
);

export const config = createConfig({
  chains: [mainnet],
  connectors,
  transports: { [mainnet.id]: http() },
});
