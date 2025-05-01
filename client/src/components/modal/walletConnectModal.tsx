// components/WalletModal.tsx
import React from 'react';
import { Wallet, wallets } from '@/constants/wallets'; // Import the wallets array

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectWallet: (walletId: string) => void;
}

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose, onSelectWallet }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1C1D1F] rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-xl font-bold">Connect Wallet</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>
        <div className="space-y-3">
          {wallets.map((wallet) => (
            <button
              key={wallet.id}
              onClick={() => onSelectWallet(wallet.id)}
              className={`flex items-center gap-4 p-4 rounded-md w-full text-left transition-all duration-300 hover:scale-105 ${wallet.bgColor}`}
            >
              <div className="flex-shrink-0">{wallet.icon}</div>
              <div>
                <h3 className="text-white font-semibold">{wallet.name}</h3>
                <p className="text-gray-400 text-sm">{wallet.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WalletModal;