# Keplr Rainbow Connector for RainbowKit

A lightweight wrapper that integrates the [Keplr](https://www.keplr.app/) wallet into your dApp's RainbowKit wallet selection. This allows Keplr to appear alongside other wallets in the "Recommended" section or any custom wallet group you define. When users don't have Keplr installed, it guides them to the installation page.

This package exports a single helper `keplrWallet`, which plugs into RainbowKit’s `connectorsForWallets` the same way as any built-in wallet adapter.


## Installation

```bash
# npm
npm install @keplr-wallet/rainbow-connector

# yarn
yarn add @keplr-wallet/rainbow-connector

# pnpm
pnpm add @keplr-wallet/rainbow-connector
```

`@rainbow-me/rainbowkit` (v2) and `wagmi` (v2) are listed as peer-dependencies, so make sure they are installed in the host project.


## Quick Start

Below is the minimal setup that replicates the code used in the [**`examples/with-vite`**](https://github.com/chainapsis/keplr-rainbow-connector/tree/main/examples/with-vite) demo.

```ts
// wagmi.ts
import { createConfig, http } from "wagmi";
import { mainnet } from "wagmi/chains";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";

import { rainbowWallet } from "@rainbow-me/rainbowkit/wallets";
import { keplrWallet } from "@keplr-wallet/rainbow-connector";

const projectId = "<YOUR_WALLETCONNECT_PROJECT_ID>";
const appName = "My Awesome dApp";

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [keplrWallet, /* ...other wallets */],
    },
  ],
  { appName, projectId }
);

export const config = createConfig({
  chains: [mainnet],
  connectors,
  transports: { [mainnet.id]: http() },
});
```

```tsx
// App.tsx
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { config } from "./wagmi";

export default function App() {
  return (
    <WagmiProvider config={config}>
      <RainbowKitProvider>
        <ConnectButton />
      </RainbowKitProvider>
    </WagmiProvider>
  );
}
```
