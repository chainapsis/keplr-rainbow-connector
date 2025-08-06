import { createConnector } from "wagmi";
import { injected } from "wagmi/connectors";
import type {
  CreateConnector,
  WalletDetailsParams,
} from "@rainbow-me/rainbowkit/dist/wallets/Wallet";

export function getInjectedKeplr() {
  if (typeof window === "undefined") return;
  return window.keplr;
}

// https://github.com/rainbow-me/rainbowkit/blob/32c67201570efb959446485d18bbc106589f9909/packages/rainbowkit/src/wallets/getInjectedConnector.ts#L82
function createInjectedConnector(provider?: any): CreateConnector {
  return (walletDetails: WalletDetailsParams) => {
    // Create the injected configuration object conditionally based on the provider.
    const injectedConfig = provider
      ? {
          target: () => ({
            id: walletDetails.rkDetails.id,
            name: walletDetails.rkDetails.name,
            provider,
          }),
        }
      : {};

    return createConnector((config: any) => ({
      // Spread the injectedConfig object, which may be empty or contain the target function
      ...injected(injectedConfig)(config),
      ...walletDetails,
    }));
  };
}

export function createKeplrConnector() {
  const ethereumProvider = getInjectedKeplr()?.ethereum;
  return createInjectedConnector(ethereumProvider);
}
