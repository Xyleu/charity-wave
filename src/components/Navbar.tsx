
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, Menu, Wallet, X } from "lucide-react";
import { toast } from "sonner";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleWalletConnect = async (walletName: string) => {
    try {
      // In a real app, this would connect to the actual wallet
      // For now, we'll simulate with a mock address
      const mockAddress = walletName === 'phantom' 
        ? "AoS7rRf1fRSSBSJKvT82zLGqSvP1RCcX1TJwGgMJ16Qb" 
        : "BPxEQmGfxdWEjWdnsxXXfEgSs8X2s2sgXzNcGKF3Kh2b";
      
      setWalletAddress(mockAddress);
      setIsWalletConnected(true);
      
      // Store in localStorage for persistence
      localStorage.setItem('walletConnected', 'true');
      localStorage.setItem('walletAddress', mockAddress);
      
      toast.success(`${walletName.charAt(0).toUpperCase() + walletName.slice(1)} wallet connected successfully!`);
      
      // If user is trying to access dashboard, navigate there
      if (location.pathname === "/dashboard") {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast.error("Failed to connect wallet");
    }
  };

  const handleDisconnectWallet = () => {
    setIsWalletConnected(false);
    setWalletAddress("");
    localStorage.removeItem('walletConnected');
    localStorage.removeItem('walletAddress');
    toast.info("Wallet disconnected");
    
    // If user is on dashboard, redirect to home
    if (location.pathname === "/dashboard") {
      navigate("/");
    }
  };

  const handleDashboardClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isWalletConnected) {
      e.preventDefault();
      toast.error("Please connect your wallet to access the dashboard");
    }
  };

  useEffect(() => {
    const walletConnected = localStorage.getItem('walletConnected');
    const storedAddress = localStorage.getItem('walletAddress');
    
    if (walletConnected === 'true' && storedAddress) {
      setIsWalletConnected(true);
      setWalletAddress(storedAddress);
    }
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-primary">
            Charity Ledger
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/charities"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === "/charities" || location.pathname.includes("/charity-page") ? "text-primary" : "text-gray-600"
              }`}
            >
              Donate
            </Link>
            <Link
              to="/leaderboard"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === "/leaderboard" ? "text-primary" : "text-gray-600"
              }`}
            >
              Leaderboard
            </Link>
            <Link
              to="/dashboard"
              onClick={handleDashboardClick}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === "/dashboard" ? "text-primary" : "text-gray-600"
              }`}
            >
              Dashboard
            </Link>
          </div>

          {isWalletConnected ? (
            <Button variant="outline" className="flex items-center space-x-2" onClick={handleDisconnectWallet}>
              <Wallet size={16} />
              <span className="max-w-32 truncate">{walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}</span>
              <X size={16} />
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center space-x-2">
                  <Wallet size={16} />
                  <span>Connect Wallet</span>
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleWalletConnect('phantom')}>
                  <img 
                    src="https://raw.githubusercontent.com/phantom-labs/phantom-logo/master/phantom-icon-purple.png" 
                    alt="Phantom" 
                    className="w-4 h-4 mr-2"
                  />
                  Phantom Wallet
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleWalletConnect('solflare')}>
                  <img 
                    src="https://raw.githubusercontent.com/solflare-wallet/solflare-logos/master/light/solflare-logo-light.svg" 
                    alt="Solflare" 
                    className="w-4 h-4 mr-2"
                  />
                  Solflare Wallet
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link
              to="/charities"
              className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-lg"
            >
              Donate
            </Link>
            <Link
              to="/leaderboard"
              className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-lg"
            >
              Leaderboard
            </Link>
            <Link
              to="/dashboard"
              onClick={handleDashboardClick}
              className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-lg"
            >
              Dashboard
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
