// src/index.jsx or src/App.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import App from './App';
import './index.css';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';

const network = WalletAdapterNetwork.Devnet; // or 'Testnet' or 'MainnetBeta'

const wallets = [
    new PhantomWalletAdapter(),
    // You can add other wallets here
];

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <ChakraProvider>
        <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </WalletModalProvider>
        </WalletProvider>
    </ChakraProvider>
);
