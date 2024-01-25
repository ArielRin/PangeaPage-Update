import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import {
  ThirdwebProvider,
  ConnectWallet,
  metamaskWallet,
  walletConnect,
  safeWallet,
  trustWallet,
} from "@thirdweb-dev/react";

import "./styles/globals.css";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "binance";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
  <ThirdwebProvider
    clientId={import.meta.env.VITE_TEMPLATE_CLIENT_ID}
    activeChain={activeChain}
    supportedWallets={[
      metamaskWallet({ recommended: true }),
      walletConnect({ recommended: true }),
      safeWallet({
        personalWallets: [
          metamaskWallet({ recommended: true }),
          walletConnect({ recommended: true }),
          trustWallet({ recommended: true }),
        ],
      }),
      trustWallet({ recommended: true }),
    ]}
  >
    <ConnectWallet
      theme={"dark"}
      switchToActiveChain={true}
      modalSize={"wide"}
      welcomeScreen={{
        img: {
          src: "https://raw.githubusercontent.com/ArielRin/PangeaPage-Update/master/Images/pangearnd.png",
          width: 150,
          height: 150,
        },
        title: "Continue to Pangea ",
      }}
      modalTitleIconUrl={
        "https://raw.githubusercontent.com/ArielRin/PangeaPage-Update/master/Images/pangeaaLogo.png"
      }
    />
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);
