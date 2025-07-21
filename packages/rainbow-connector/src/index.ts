import type { Wallet } from "@rainbow-me/rainbowkit";
import { getInjectedKeplr, createKeplrConnector } from "./utils";
import KeplrWalletLogo from "./assets/keplrWallet.svg";

export const keplrWallet = (): Wallet => {
  const keplr = getInjectedKeplr();

  return {
    id: "keplr",
    name: "Keplr",
    rdns: "app.keplr",
    iconUrl: KeplrWalletLogo,
    iconBackground: "#000000",
    installed: !!keplr,
    downloadUrls: {
      android:
        "https://play.google.com/store/apps/details?id=com.chainapsis.keplr",
      ios: "https://apps.apple.com/us/app/id1567851089",
      mobile: "https://www.keplr.app/get",
      qrCode: "https://www.keplr.app/get",
      chrome:
        "https://chromewebstore.google.com/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap",
      firefox: "https://addons.mozilla.org/en-US/firefox/addon/keplr/",
      edge: "https://microsoftedge.microsoft.com/addons/detail/keplr/ocodgmmffbkkeecmadcijjhkmeohinei",
    },
    mobile: undefined,
    qrCode: undefined,
    createConnector: createKeplrConnector(),
  };
};
