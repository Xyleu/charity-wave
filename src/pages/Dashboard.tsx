
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChartBar, UserCircle, Edit, Heart, FileHeart } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

interface DonationHistory {
  id: string;
  date: string;
  amount: number;
  charity: string;
  token: string;
}

const Dashboard = () => {
  const [displayName, setDisplayName] = useState("");
  const [isChangingName, setIsChangingName] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [donationHistory, setDonationHistory] = useState<DonationHistory[]>([]);
  const [totalDonated, setTotalDonated] = useState(0);
  const [causesSupported, setCausesSupported] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const walletConnected = localStorage.getItem('walletConnected');
    if (walletConnected !== 'true') {
      toast.error("Please connect your wallet to access the dashboard");
      navigate("/");
      return;
    }

    // Get wallet address from localStorage
    const address = localStorage.getItem('walletAddress') || "";
    setWalletAddress(address);

    // Fetch user's donation history based on wallet
    fetchUserDonations(address);
  }, [navigate]);

  const fetchUserDonations = (address: string) => {
    // In a real app, this would be an API call to fetch donations for this wallet
    // For now, we'll simulate with different mock data based on the wallet address
    
    // Create a deterministic but unique set of donations based on wallet address
    const addressSum = address.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const donationCount = (addressSum % 4) + 1; // 1-4 donations
    
    const mockDonations: DonationHistory[] = [];
    const charities = ["Education for All", "Healthcare Support", "Green Earth Initiative", "Animal Welfare"];
    const tokens = ["USDC", "SOL", "USDT"];
    
    let uniqueCharities = new Set<string>();
    let sum = 0;
    
    for (let i = 0; i < donationCount; i++) {
      const amount = 25 + (i * 25);
      sum += amount;
      const charity = charities[i % charities.length];
      uniqueCharities.add(charity);
      
      mockDonations.push({
        id: `${i+1}`,
        date: new Date(Date.now() - i * 86400000).toISOString().split('T')[0], // Recent dates
        amount: amount,
        charity: charity,
        token: tokens[i % tokens.length]
      });
    }
    
    setDonationHistory(mockDonations);
    setTotalDonated(sum);
    setCausesSupported(uniqueCharities.size);
  };

  const handleNameChange = async () => {
    try {
      // Here we would make the actual blockchain transaction
      // For now, we'll just show a success message
      toast.success("Display name updated successfully!");
      setIsChangingName(false);
    } catch (error) {
      toast.error("Failed to update display name");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Your Dashboard</h1>
            <Button 
              onClick={() => navigate("/create-charity")}
              className="flex items-center gap-2"
            >
              <FileHeart className="h-4 w-4" />
              Create Your Charity Page
            </Button>
          </div>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Donated</p>
                  <h3 className="text-2xl font-bold mt-1">${totalDonated.toFixed(2)}</h3>
                </div>
                <ChartBar className="text-primary h-5 w-5" />
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Causes Supported</p>
                  <h3 className="text-2xl font-bold mt-1">{causesSupported}</h3>
                </div>
                <Heart className="text-primary h-5 w-5" />
              </div>
            </Card>
          </div>

          {/* Display Name Section */}
          <Card className="mb-8">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Display Name Settings</h2>
                <Dialog open={isChangingName} onOpenChange={setIsChangingName}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Edit className="h-4 w-4 mr-2" />
                      Change Display Name
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Change Display Name</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          New Display Name
                        </label>
                        <Input
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          placeholder="Enter your desired display name"
                          className="mt-1"
                        />
                      </div>
                      <p className="text-sm text-gray-500">
                        Changing your display name costs 50 USDC. This helps prevent spam and abuse.
                      </p>
                      <Button 
                        className="w-full" 
                        onClick={handleNameChange}
                        disabled={!displayName}
                      >
                        Pay 50 USDC to Change Name
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <p className="text-gray-600">
                Your display name will be shown on the leaderboard instead of your wallet address.
              </p>
              {walletAddress && (
                <p className="mt-2 text-sm text-gray-500">
                  Wallet: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </p>
              )}
            </div>
          </Card>

          {/* Donation History */}
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Donation History</h2>
              {donationHistory.length > 0 ? (
                <div className="space-y-4">
                  {donationHistory.map((donation) => (
                    <div 
                      key={donation.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <h3 className="font-medium">{donation.charity}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(donation.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {donation.amount} {donation.token}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <p>No donations yet. Support a cause to see your history here!</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
