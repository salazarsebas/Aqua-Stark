import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AquariumManagerPage from "@/pages/aquarium/manager/page";
import App from "./App"; 

import "./styles/globals.css";
import Market from "./pages/market/page";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/aquarium/manager" element={<AquariumManagerPage />} />
        <Route path="/market" element={<Market />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


/*
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";

// Dojo related imports
import { init } from "@dojoengine/sdk";
import { DojoSdkProvider } from "@dojoengine/sdk/react";
import { SchemaType } from "./typescript/models.gen.ts";
import { setupWorld } from "./typescript/contracts.gen.ts";

import "./index.css";
import { dojoConfig } from "../dojoConfig.ts";
import StarknetProvider from "./starknet-provider.tsx";
*/
/**
 * Initializes and bootstraps the Dojo application.
 * Sets up the SDK, burner manager, and renders the root component.
 *
 * throws {Error} If initialization fails
 */
/*
async function main() {
    const sdk = await init<SchemaType>({
        client: {
            rpcUrl: dojoConfig.rpcUrl,
            toriiUrl: dojoConfig.toriiUrl,
            relayUrl: dojoConfig.relayUrl,
            worldAddress: dojoConfig.manifest.world.address,
        },
        domain: {
            name: "WORLD_NAME",
            version: "1.0",
            chainId: "KATANA",
            revision: "1",
        },
    });

    createRoot(document.getElementById("root")!).render(
        <StrictMode>
            <DojoSdkProvider
                sdk={sdk}
                dojoConfig={dojoConfig}
                clientFn={setupWorld}
            >
                <StarknetProvider>
                    <App />
                </StarknetProvider>
            </DojoSdkProvider>
        </StrictMode>
    );
}

main().catch((error) => {
    console.error("Failed to initialize the application:", error);
});
*/