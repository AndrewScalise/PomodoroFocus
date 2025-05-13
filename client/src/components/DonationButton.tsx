import { Coffee, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState, useEffect } from "react";

const DonationButton = () => {
  const [showHeart, setShowHeart] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const handleDonation = () => {
    window.open("https://www.buymeacoffee.com", "_blank");
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
      
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="fixed bottom-4 right-4 flex items-center gap-2 bg-amber-100 text-amber-900 hover:bg-amber-200 border-amber-300 shadow-md transition-all duration-300 hover:scale-105"
          >
            <Coffee className="h-4 w-4" />
            <span>Buy Me a Coffee</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4 bg-white shadow-xl border border-amber-200">
          <div className="space-y-4">
            <div className="text-center">
              <h4 className="font-medium text-lg">Support This Project</h4>
              <div className="flex justify-center my-2">
                <Coffee className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600">
              If you find this Pomodoro Timer useful, consider buying me a coffee. Your
              support helps me create more free tools like this one!
            </p>
            <Button 
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium transition-all duration-200 hover:scale-[1.02]"
              onClick={handleDonation}
            >
              <Coffee className="mr-2 h-4 w-4" />
              Buy Me a Coffee
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default DonationButton;