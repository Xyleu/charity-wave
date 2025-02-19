
import { Trophy, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";

interface Donor {
  rank: number;
  name: string;
  amount: number;
  donations: number;
  avatar: string;
}

const topDonors: Donor[] = [
  { rank: 1, name: "Sarah Johnson", amount: 15000, donations: 42, avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80" },
  { rank: 2, name: "Michael Chen", amount: 12500, donations: 38, avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&q=80" },
  { rank: 3, name: "Emma Davis", amount: 10000, donations: 35, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" },
];

const Leaderboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Our Top <span className="text-primary">Changemakers</span>
          </h1>
          <p className="text-xl text-gray-600">
            Celebrating the generous spirits who are making a difference in our community.
            Every donation counts towards creating positive change.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 text-center">
            <Trophy className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">$250,000+</h3>
            <p className="text-gray-600">Total Donations</p>
          </Card>
          <Card className="p-6 text-center">
            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">1,000+</h3>
            <p className="text-gray-600">Active Donors</p>
          </Card>
          <Card className="p-6 text-center">
            <Star className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">5,000+</h3>
            <p className="text-gray-600">Lives Impacted</p>
          </Card>
        </div>

        {/* Top Donors */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center mb-8">Top Donors</h2>
          {topDonors.map((donor) => (
            <Card key={donor.rank} className="p-6">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 relative">
                  <img 
                    src={donor.avatar} 
                    alt={donor.name}
                    className="rounded-full object-cover w-full h-full"
                  />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    #{donor.rank}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{donor.name}</h3>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-600">Total Donated: ${donor.amount}</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-600">{donor.donations} Donations</span>
                  </div>
                  <Progress value={(donor.amount / 15000) * 100} className="mt-2" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link to="/charities">Make a Donation</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
