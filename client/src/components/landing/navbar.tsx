"use client"

import { useState } from 'react';
import { connect, disconnect, useStarknetkitConnectModal } from 'starknetkit';
import { InjectedConnector } from 'starknetkit/injected';
import WalletModal from "../modal/walletConnectModal";


export function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null);

  const connectors = [
    new InjectedConnector({ options: { id: 'argentX', name: 'Argent X' } }),
    new InjectedConnector({ options: { id: 'braavos', name: 'Braavos' } }),
    // Cartridge requires additional setup
    new InjectedConnector({ options: { id: 'cartridge', name: 'Cartridge' } }),
    // RhinoFi and Kass connectors (custom connectors may be needed)
    new InjectedConnector({ options: { id: 'rhinoFi', name: 'RhinoFi' } }),
    new InjectedConnector({ options: { id: 'kass', name: 'Kass' } }),
  ];

  const handleConnectWallet = async (walletId: string) => {
    setIsModalOpen(false);

    try {
      // Connect to the wallet using the connectors array and preselect the wallet
      const connection = await connect({
        connectors, // Pass the connectors array
        dappName: "Aqua Stark",
        modalTheme: "dark",
        modalMode: "alwaysAsk", // Ensure the modal is shown if needed (we'll handle this with our custom modal)
        preselectedId: walletId, // Preselect the wallet based on the ID from the modal
      });

      if (connection && connection.isConnected) {
        setConnectedAddress(connection.selectedAddress);
        console.log("Connected to wallet:", connection.selectedAddress);
      } else {
        console.error("Failed to connect to wallet");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };


  const handleDisconnectWallet = async () => {
    await disconnect();
    setConnectedAddress(null);
  };
  return (
    <nav className="relative z-10 flex justify-between items-center p-4">
      <div className="flex items-center">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Aqua_Stark-removebg-preview-ubKSrqYo7jzOH5qXqxEw4CyRHXIjfq.png"
          alt="Aqua Stark Logo"
          width={180}
          height={80}
          className="drop-shadow-lg"
        />
      </div>
      {/* <div className="flex items-center">
        <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 text-lg rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 border-2 border-purple-400 border-b-4 border-r-4">
          <Wallet className="mr-2 h-6 w-6" />
          Connect Wallet
        </Button>
      </div> */}

<div>
      {connectedAddress ? (
        <div className="flex items-center gap-2">
          <span className="text-white text-sm">
            {`${connectedAddress.slice(0, 6)}...${connectedAddress.slice(-4)}`}
          </span>
          <button
            onClick={handleDisconnectWallet}
            className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition-colors"
        >
          Connect Wallet
        </button>
      )}

      <WalletModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectWallet={handleConnectWallet}
      />
    </div>
    </nav>
  )
}
