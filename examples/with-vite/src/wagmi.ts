import { createConfig, http } from "wagmi";
import { mainnet } from "wagmi/chains";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";

import { keplrWallet } from "../../../packages/rainbow-connector/build/index";

const projectId = "YOUR_WALLETCONNECT_PROJECT_ID"; // <-- your WC v2 id
const appName = "My Dapp";

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
