import { useState } from "react";
import { Button } from "@/components/ui/button";

const tongueTwisters = [
  "Red lorry, yellow lorry.",
  "Unique New York.",
  "Six slippery snails slid slowly seaward.",
  "Friendly fleas and fireflies.",
  "Eleven benevolent elephants.",
  "She sees cheese.",
  "Black bug bit a big black bear.",
  "Toy boat. Toy boat. Toy boat.",
  "Pirates Private Property.",
  "Freshly fried flying fish.",
];

const RandomTongueTwisters = () => {
  const [currentTwister, setCurrentTwister] = useState<string | null>(null);

  const generateRandomTwister = () => {
    const randomIndex = Math.floor(Math.random() * tongueTwisters.length);
    setCurrentTwister(tongueTwisters[randomIndex]);
  };

  return (
    <div className="container py-8 space-y-8">
      <h1 className="text-3xl font-bold text-primary">Random Tongue Twisters</h1>
      
      <Button onClick={generateRandomTwister} className="w-full">
        Generate Random Tongue Twister
      </Button>

      {currentTwister && (
        <div className="mt-4 p-4 border rounded-lg bg-secondary">
          <p className="text-lg font-medium">{currentTwister}</p>
        </div>
      )}
    </div>
  );
};

export default RandomTongueTwisters;