import { Coffee, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const DonationButton = () => {
  const [showHeart, setShowHeart] = useState(false);
  
  const handleDonation = () => {
    // Replace "YOUR_USERNAME" with your actual Buy Me a Coffee username
    window.open("https://www.buymeacoffee.com/YOUR_USERNAME", "_blank");
    setShowHeart(true);
  };
  
  // Reset the heart animation after it plays
  useEffect(() => {
    if (showHeart) {
      const timer = setTimeout(() => {
        setShowHeart(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [showHeart]);

  return (
    <>
      {showHeart && (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
          <Heart className="w-20 h-20 text-red-500 animate-ping opacity-70" />
        </div>
      )}
      
      <div className="w-full mt-6 flex justify-center">
        <Button 
          variant="default"
          size="default"
          className="bg-amber-500 hover:bg-amber-600 text-white border-0 shadow-md transition-all duration-200 hover:scale-105 rounded-full px-4 py-2 font-medium"
          onClick={handleDonation}
        >
          <Coffee className="mr-2 h-5 w-5" />
          Buy Me a Coffee
        </Button>
      </div>
    </>
  );
};

export default DonationButton;