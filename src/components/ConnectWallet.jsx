import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

function ConnectWalletButton() {
    const { connected, publicKey } = useWallet();

    return (
        <div>
            {!connected ? (
                <WalletMultiButton />
            ) : (
                <p>Connected as {publicKey.toBase58()}</p>
            )}
        </div>
    );
}

export default ConnectWalletButton;
