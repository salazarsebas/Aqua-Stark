// components/modal/walletConnectModal.jsx
import React from 'react';
import { wallets } from '@/constants/wallets';

const WalletModal = ({ isOpen, onClose, onSelectWallet }) => {
  if (!isOpen) return null;

  // Handle keyboard events (Escape key to close modal)
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-[#1C1D1F] rounded-lg p-6 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-xl font-bold">Connect Wallet</h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white"
            aria-label="Close modal"
          >
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
        
        <div className="mt-4 text-center text-sm text-gray-400">
          <p>Don't have a wallet? <a href="https://starknet.io/ecosystem/wallets/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">Get one here</a></p>
        </div>
      </div>
    </div>
  );
};

export default WalletModal;