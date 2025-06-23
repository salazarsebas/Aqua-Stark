"use client";

import {
  Connector,
  useAccount,
  useConnect,
  useDisconnect,
} from "@starknet-react/core";
import { useEffect, useState } from "react";
import WalletModal from "../modal/walletConnectModal";
import ControllerConnector from "@cartridge/connector/controller";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();

  const controller = connectors.find(
    (c) => c.id === "controller"
  ) as ControllerConnector;

  useEffect(() => {
    if (isConnected && address && controller) {
      controller.username()?.then((name) => setUsername(name));
    } else {
      setUsername(null);
    }
  }, [isConnected, address, controller]);

  const handleConnectWallet = async (connector: Connector) => {
    try {
      await connect({ connector });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error connecting wallet:", error);
      if (error instanceof Error) {
        if (error.message.includes("User rejected the request")) {
          alert("Connection was cancelled by user");
        } else {
          alert("Failed to connect: " + error.message);
        }
      }
    }
  };

  const handleDisconnectWallet = async () => {
    try {
      await disconnect();
      setUsername(null);
    } catch (error) {
      console.error("Error disconnecting:", error);
    }
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

      <div className="flex gap-4 items-center">
        {isConnected ? (
          <div className="flex items-center gap-4">
            <span className="text-white text-sm font-semibold tracking-wide">
              {username
                ? `${username}`
                : `${address?.slice(0, 6)}...${address?.slice(-4)}`}
            </span>
            <button
              onClick={handleDisconnectWallet}
              className="text-xl font-bold py-2 px-6 bg-red-400 hover:bg-red-500 text-white rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 border-2 border-red-300 border-b-4 border-r-4"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-xl font-bold py-2 px-6 bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 border-2 border-purple-400 border-b-4 border-r-4"
            >
              Connect Wallet
            </button>
          </>
        )}
        <button
          onClick={() => navigate("/test-game")}
          className="text-xl font-bold py-2 px-6 bg-orange-500 hover:bg-orange-600 text-white rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 border-2 border-orange-300 border-b-4 border-r-4"
        >
          Test Dojo Game
        </button>
        <WalletModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSelectWallet={handleConnectWallet}
        />
      </div>
    </nav>
  );
}
