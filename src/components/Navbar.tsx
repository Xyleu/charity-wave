
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Wallet, ChevronDown, Menu, X, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  PhantomWalletAdapter
} from "@solana/wallet-adapter-phantom";
import { Connection } from "@solana/web3.js";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAdapter, setWalletAdapter] = useState<PhantomWalletAdapter | null>(null);

  useEffect(() => {
    const adapter = new PhantomWalletAdapter();
    setWalletAdapter(adapter);
  }, []);

  const handleWalletConnect = async () => {
    if (!walletAdapter) {
      toast({
        title: "Wallet Error",
        description: "Please install Phantom wallet",
        variant: "destructive",
      });
      return;
    }

    try {
      if (!isWalletConnected) {
        await walletAdapter.connect();
        const connection = new Connection("https://api.mainnet-beta.solana.com");
        
        setIsWalletConnected(true);
        toast({
          title: "Wallet Connected",
          description: "Your wallet has been connected successfully",
        });
      } else {
        await walletAdapter.disconnect();
        setIsWalletConnected(false);
        toast({
          title: "Wallet Disconnected",
          description: "Your wallet has been disconnected",
        });
      }
    } catch (error) {
      console.error("Wallet connection error:", error);
      toast({
        title: "Connection Error",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    }
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
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a
                href="mailto:contact@charityledger.com"
                className="text-gray-600 hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Mail size={20} />
              </a>
              <a
                href="https://discord.gg/charityledger"
                className="text-gray-600 hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </a>
              <a
                href="https://t.me/charityledger"
                className="text-gray-600 hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={20} />
              </a>
            </div>

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
              
              {/* Mobile Social Links */}
              <div className="flex items-center space-x-4 py-2">
                <a
                  href="mailto:contact@charityledger.com"
                  className="text-gray-600 hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Mail size={20} />
                </a>
                <a
                  href="https://discord.gg/charityledger"
                  className="text-gray-600 hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                </a>
                <a
                  href="https://t.me/charityledger"
                  className="text-gray-600 hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={20} />
                </a>
              </div>

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
