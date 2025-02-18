
import { useState } from "react";
import { Link } from "react-router-dom";
import { Wallet, ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleWalletConnect = () => {
    // TODO: Implement actual wallet connection
    setIsWalletConnected(!isWalletConnected);
    toast({
      title: isWalletConnected ? "Wallet disconnected" : "Wallet connected",
      description: isWalletConnected ? "Your wallet has been disconnected" : "Your wallet has been connected successfully",
    });
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-semibold text-primary">Charity Ledger</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/charities" className="text-gray-700 hover:text-primary transition-colors">
              Charities
            </Link>
            <Link to="/leaderboard" className="text-gray-700 hover:text-primary transition-colors">
              Leaderboard
            </Link>
            <Button
              variant="outline"
              className="flex items-center space-x-2"
              onClick={handleWalletConnect}
            >
              <Wallet size={16} />
              <span>{isWalletConnected ? "Connected" : "Connect Wallet"}</span>
              <ChevronDown size={16} />
            </Button>
          </div>

          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link
                to="/charities"
                className="text-gray-700 hover:text-primary transition-colors"
                onClick={toggleMenu}
              >
                Charities
              </Link>
              <Link
                to="/leaderboard"
                className="text-gray-700 hover:text-primary transition-colors"
                onClick={toggleMenu}
              >
                Leaderboard
              </Link>
              <Button
                variant="outline"
                className="flex items-center space-x-2 w-full justify-center"
                onClick={handleWalletConnect}
              >
                <Wallet size={16} />
                <span>{isWalletConnected ? "Connected" : "Connect Wallet"}</span>
                <ChevronDown size={16} />
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
