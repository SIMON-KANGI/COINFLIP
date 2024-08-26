import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import GenerateKeypair from './keys';
import connection from '../../utils/SolanaConnection';
import Coin from './Coin';
import ConnectWalletButton from './ConnectWallet';
function Game() {
    const wallet = useWallet();
    const [betAmount, setBetAmount] = useState(0);
    const [chosenSide, setChosenSide] = useState('');
    const [result, setResult] = useState(null);

    useEffect(() => {
        if (!wallet.connected) {
            setResult(null);
        }
    }, [wallet.connected]);
    
    const handleBetAmountChange = (event) => {
        const amount = parseInt(event.target.value);
        if (amount > 0) {
            setBetAmount(amount);
        } else {
            alert('Please enter a valid bet amount.');
        }
    };
    

    const flipCoin = () => {
        const coinSide = Math.random() < 0.5 ? 'Heads' : 'Tails';
        if (coinSide === chosenSide) {
            setResult('Win');
            handleTransaction(true);
            return coinSide
        } else {
            setResult('Lose');
            handleTransaction(false);
            return coinSide
        }
        console.log("coinside", coinSide)
    };

    const handleTransaction = async (win) => {
        if (!wallet.publicKey) {
            alert('Please connect your wallet first!');
            return;
        }

        const transaction = new Transaction();
        const destinationPubKey = win 
            ? wallet.publicKey // Send winnings back to the user
            : new PublicKey('5nSGdNWEgsRBY5dtu2U1dCVmS3jdHzEB7BkakVU53hec'); // Send bet amount to a designated loss account

        // Bet amount transaction
        transaction.add(
            SystemProgram.transfer({
                fromPubkey: wallet.publicKey,
                toPubkey: destinationPubKey,
                lamports: betAmount * (win ? 2 : 1), // If win, double the bet amount, otherwise just deduct
            })
        );

        try {
            const signature = await wallet.sendTransaction(transaction, connection);
            await connection.confirmTransaction(signature, 'confirmed');
            console.log('Transaction successful!', signature);
        } catch (error) {
            console.error('Transaction failed:', error);
        }

        setBetAmount(0);
        setChosenSide('');
    };

    return (
        <div>
            <h1 className="text-center text-2xl text-white">Coin Flip Game</h1>
            <ConnectWalletButton/>
            <div className="game-controls items-center justify-center w-1/2 mx-auto">
      
                <p className="text-white text-xl">Current Bet Amount: {betAmount}</p>
                <input
                    type="number"
                    placeholder="Enter bet amount"
                    value={betAmount}
                    onChange={handleBetAmountChange}
                    className='w-1/2 rounded-md py-3 px-2'
                />
                <div className='p-5'>
                <button 
  className={`px-8 py-3 ${wallet.connected ? 'bg-yellow-500' : 'bg-gray-400 cursor-not-allowed'} text-white rounded-md`}  
  onClick={() => setChosenSide('Heads')} 
  disabled={!wallet.connected}
>
  Heads
</button>
<button 
  className={`px-8 py-3 mx-4 ${wallet.connected ? 'bg-rose-500' : 'bg-gray-400 cursor-not-allowed'} text-white rounded-md`} 
  onClick={() => setChosenSide('Tails')} 
  disabled={!wallet.connected}
>
  Tails
</button>

                </div>
              
                <Coin  selectedSide={chosenSide} flipCoin={flipCoin} wallet={wallet}/>
            </div>
            {result && <p className={`${result === "Win" ? "text-emerald-400" : "text-red-500"} text-2xl text-center`}>Result: You {result}!</p>}

            <GenerateKeypair />
        </div>
    );
}

export default Game;
