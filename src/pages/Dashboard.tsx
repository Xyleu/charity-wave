
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ChartBar, UserCircle, Edit, Heart } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface DonationHistory {
  id: string;
  date: string;
  amount: number;
  charity: string;
  token: string;
}

const mockDonationHistory: DonationHistory[] = [
  {
    id: "1",
    date: "2024-02-22",
    amount: 100,
    charity: "Education for All",
    token: "USDC"
  },
  {
    id: "2",
    date: "2024-02-20",
    amount: 50,
    charity: "Healthcare Support",
    token: "SOL"
  },
  {
    id: "3",
    date: "2024-02-18",
    amount: 75,
    charity: "Green Earth Initiative",
    token: "USDT"
  }
];

const Dashboard = () => {
  const [displayName, setDisplayName] = useState("");
  const [isChangingName, setIsChangingName] = useState(false);

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
          <h1 className="text-4xl font-bold mb-8">Your Dashboard</h1>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Donated</p>
                  <h3 className="text-2xl font-bold mt-1">$225.00</h3>
                </div>
                <ChartBar className="text-primary h-5 w-5" />
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Causes Supported</p>
                  <h3 className="text-2xl font-bold mt-1">3</h3>
                </div>
                <Heart className="text-primary h-5 w-5" />
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Impact Score</p>
                  <h3 className="text-2xl font-bold mt-1">85</h3>
                </div>
                <UserCircle className="text-primary h-5 w-5" />
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
            </div>
          </Card>

          {/* Donation History */}
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Donation History</h2>
              <div className="space-y-4">
                {mockDonationHistory.map((donation) => (
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
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
