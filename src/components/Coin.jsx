import React, { useState } from 'react';

function Coin({ selectedSide, flipCoin, wallet,result }) {
  const [isFlipping, setIsFlipping] = useState(false);
  const [flippedSide, setFlippedSide] = useState(null);

  const handleFlipCoin = () => {
    setIsFlipping(true);

    setTimeout(() => {
      const result = flipCoin();
      console.log(result) // This should return 'Heads' or 'Tails'
      setFlippedSide(result); // Set the flipped side to the result of the coin flip
      setIsFlipping(false);
    }, 1000); // Match the timeout with the duration of the animation
  };

  return (
    <div>
      <div>
        <h2>Choose a side:</h2>
        <p className='text-white text-xl'>{selectedSide ? `You chose: ${selectedSide}` : 'Click the flip button to start'}</p>
        <img
          src={`/${flippedSide || selectedSide}.jpg`} // Show the flipped side if available, otherwise the selected side
          alt={flippedSide || selectedSide}
          className={`w-36 h-36 rounded-full ${isFlipping ? 'flip-animation' : ''}`}
        />
      </div>
      <button
        className="px-8 m-5 py-3 bg-stone-950 text-white rounded-md"
        onClick={handleFlipCoin}
        disabled={!wallet.connected || isFlipping}
      >
        Flip Coin
      </button>
    </div>
  );
}

export default Coin;
