
import { Trophy, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";

interface Donor {
  rank: number;
  walletAddress: string;
  amount: number;
  donations: number;
  avatar: string;
}

const topDonors: Donor[] = [
  { 
    rank: 1, 
    walletAddress: "8xzt...3kj9", 
    amount: 15000, 
    donations: 42, 
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=1" 
  },
  { 
    rank: 2, 
    walletAddress: "9mnb...7h4s", 
    amount: 12500, 
    donations: 38, 
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=2" 
  },
  { 
    rank: 3, 
    walletAddress: "4vfr...2p9x", 
    amount: 10000, 
    donations: 35, 
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=3" 
  },
];

const Leaderboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            Our Top <span className="text-primary">Changemakers</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Celebrating the generous spirits who are making a difference in our community.
            Every donation counts towards creating positive change.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <Card className="p-8 text-center">
            <Trophy className="w-12 h-12 text-primary mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-3">$250,000+</h3>
            <p className="text-gray-600">Total Donations</p>
          </Card>
          <Card className="p-8 text-center">
            <Users className="w-12 h-12 text-primary mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-3">1,000+</h3>
            <p className="text-gray-600">Active Donors</p>
          </Card>
          <Card className="p-8 text-center">
            <Star className="w-12 h-12 text-primary mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-3">5,000+</h3>
            <p className="text-gray-600">Lives Impacted</p>
          </Card>
        </div>

        {/* Top Donors */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center mb-12">Top Donors</h2>
          {topDonors.map((donor) => (
            <Card key={donor.rank} className="p-8">
              <div className="flex items-center gap-8">
                <div className="w-20 h-20 relative">
                  <img 
                    src={donor.avatar} 
                    alt={`Wallet ${donor.walletAddress}`}
                    className="rounded-full object-cover w-full h-full bg-gray-100"
                  />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    #{donor.rank}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-mono font-medium mb-4">{donor.walletAddress}</h3>
                  <div className="flex items-center gap-6 mb-4">
                    <span className="text-gray-600">Total Donated: ${donor.amount}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-600">{donor.donations} Donations</span>
                  </div>
                  <Progress value={(donor.amount / 15000) * 100} className="h-2" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button asChild size="lg">
            <Link to="/charities">Make a Donation</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
