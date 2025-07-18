import { createConnector } from "wagmi";
import { injected } from "wagmi/connectors";
import {
  CreateConnector,
  WalletDetailsParams,
} from "@rainbow-me/rainbowkit/dist/wallets/Wallet";

export function hasInjectedKeplr() {
  if (typeof window === "undefined") {
    return false;
  }

  if (window.keplr) {
    return !!window.keplr;
  }

  if (document.readyState === "complete") {
    return !!window.keplr;
  }
}

import {
  detect,
  BrowserInfo,
  BotInfo,
  NodeInfo,
  SearchBotDeviceInfo,
  ReactNativeInfo,
} from "detect-browser";

function detectEnv(
  userAgent?: string
):
  | BrowserInfo
  | BotInfo
  | NodeInfo
  | SearchBotDeviceInfo
  | ReactNativeInfo
  | null {
  return detect(userAgent);
}

function detectOS() {
  const env = detectEnv();
  return env && env.os ? env.os : undefined;
}

export function isAndroid(): boolean {
  const os = detectOS();
  return os ? os.toLowerCase().includes("android") : false;
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

    return createConnector((config) => ({
      // Spread the injectedConfig object, which may be empty or contain the target function
      ...injected(injectedConfig)(config),
      ...walletDetails,
    }));
  };
}

export const keplrConnector = createInjectedConnector(
  typeof window !== "undefined" ? window.keplr : undefined
);
