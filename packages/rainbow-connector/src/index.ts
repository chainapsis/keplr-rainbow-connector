import { getWalletConnectConnector } from "@rainbow-me/rainbowkit";
import type { Wallet } from "@rainbow-me/rainbowkit";
import type { DefaultWalletOptions } from "@rainbow-me/rainbowkit/dist/wallets/Wallet";
import { hasInjectedKeplr, keplrConnector, isAndroid } from "./utils";
import KeplrWalletLogo from "./assets/keplrWallet.svg";

export type KeplrWalletOptions = DefaultWalletOptions;

export const keplrWallet = ({
  projectId,
  walletConnectParameters,
}: KeplrWalletOptions): Wallet => {
  const isKeplrInjected = hasInjectedKeplr();
  const shouldUseWalletConnect = !isKeplrInjected;

  return {
    id: "keplr",
    name: "Keplr Wallet",
    rdns: "com.chainapsis.keplr",
    iconUrl: KeplrWalletLogo,
    iconBackground: "#000000",
    installed: !shouldUseWalletConnect ? isKeplrInjected : undefined,
    downloadUrls: {
      android:
        "https://play.google.com/store/apps/details?id=com.chainapsis.keplr",
      ios: "https://apps.apple.com/us/app/id1567851089",
      mobile: "https://www.keplr.app/get",
      qrCode: "https://www.keplr.app/",
    },
    mobile: shouldUseWalletConnect
      ? {
          getUri: (uri: string) => {
            return isAndroid()
              ? uri
              : `keplrwallet://wcV2?${encodeURIComponent(uri)}`;
          },
        }
      : undefined,
    qrCode: shouldUseWalletConnect
      ? {
          getUri: (uri: string) => uri,
          instructions: {
            learnMoreUrl: "https://www.keplr.app/",
            steps: [
              {
                description:
                  "wallet_connectors.keplr.qr_code.step1.description",
                step: "install",
                title: "wallet_connectors.keplr.qr_code.step1.title",
              },
              {
                description:
                  "wallet_connectors.keplr.qr_code.step2.description",
                step: "create",
                title: "wallet_connectors.keplr.qr_code.step2.title",
              },
              {
                description:
                  "wallet_connectors.keplr.qr_code.step3.description",
                step: "scan",
                title: "wallet_connectors.keplr.qr_code.step3.title",
              },
            ],
          },
        }
      : undefined,
    createConnector: shouldUseWalletConnect
      ? getWalletConnectConnector({
          projectId,
          walletConnectParameters,
        })
      : keplrConnector,
  };
};
