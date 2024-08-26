// src/components/GenerateKeypair.jsx

import React, { useState } from 'react';
import { Keypair } from '@solana/web3.js';

const GenerateKeypair = () => {
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');

  const generateKeys = () => {
    // Generate a new Solana keypair
    const keypair = Keypair.generate();
    const pubKey = keypair.publicKey.toBase58();
    const privKey = Buffer.from(keypair.secretKey).toString('base64');

    // Set the keys in state
    setPublicKey(pubKey);
    setPrivateKey(privKey);

    console.log("Public Key:", pubKey);
    console.log("Private Key:", privKey);
  };

  return (
    <div>
      <button onClick={generateKeys}>Generate Keypair</button>
      {publicKey && (
        <div>
          <p><strong>Public Key:</strong> {publicKey}</p>
          <p><strong>Private Key:</strong> {privateKey}</p>
        </div>
      )}
    </div>
  );
};

export default GenerateKeypair;
