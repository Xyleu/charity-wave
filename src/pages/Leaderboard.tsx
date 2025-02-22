
import { useState } from "react";
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
}

const allDonors: Donor[] = [
  { rank: 1, walletAddress: "8xzt3dYRuqXxRF6Nz9uDv9o3YKBGFkWQvJxwvPYMxvCr", amount: 15000, donations: 42 },
  { rank: 2, walletAddress: "9mnbHHRBKXV7ovp4WzAEAuWykqPPgYb4E7VeyJ3Jh4s9", amount: 12500, donations: 38 },
  { rank: 3, walletAddress: "4vfrDHS2QaZX2P9XtJ2P9xGYaE2Vwp2MQKLZKGyCkjx5", amount: 10000, donations: 35 },
  { rank: 4, walletAddress: "7LkYvqozNwip9Ry6p3rNKUYVwKtG1ZvFrNxGR5ahXuhK", amount: 9500, donations: 31 },
  { rank: 5, walletAddress: "2YmFmqYB2xF9YQeqRQvkJqRGjwEBXXeRmEGUt8xo6bHy", amount: 8800, donations: 29 },
  { rank: 6, walletAddress: "5nQPzKvHGqJxGY9Z7P9NvyQJJZZvTJ1dKp2qVv1XuZ8r", amount: 8200, donations: 27 },
  { rank: 7, walletAddress: "3vKjNqZqXwE8yFtXv5Y9p1RmZJ7LgXEeKzD2q6vW4tBs", amount: 7500, donations: 25 },
  { rank: 8, walletAddress: "6mHnWxKvD8JpGYz9R4Q2NkBqXy1ZrVw3eKcL5tYfXuPm", amount: 7000, donations: 23 },
  { rank: 9, walletAddress: "1bPzMwQyX5NvJrKg8tRfY6L2eHnD9ZqUaVw4k3mS7Ens", amount: 6500, donations: 21 },
  { rank: 10, walletAddress: "9aKvNwE8mX5YpRqZ2tBf3L6Q4cJ7DnWx1KgM6vS8hGjr", amount: 6000, donations: 19 },
  { rank: 11, walletAddress: "4kLmNxE8pY5ZqRtBf3L6Q4cJ7DnWx1KgM6vS8hGjr9aK", amount: 5500, donations: 18 },
  { rank: 12, walletAddress: "2vS8hGjr9aKvNwE8mX5YpRqZ2tBf3L6Q4cJ7DnWx1KgM", amount: 5000, donations: 17 },
  { rank: 13, walletAddress: "7DnWx1KgM6vS8hGjr9aKvNwE8mX5YpRqZ2tBf3L6Q4cJ", amount: 4500, donations: 16 },
  { rank: 14, walletAddress: "5YpRqZ2tBf3L6Q4cJ7DnWx1KgM6vS8hGjr9aKvNwE8mX", amount: 4000, donations: 15 },
  { rank: 15, walletAddress: "8hGjr9aKvNwE8mX5YpRqZ2tBf3L6Q4cJ7DnWx1KgM6vS", amount: 3500, donations: 14 }
];

const Leaderboard = () => {
  const [showAllDonors, setShowAllDonors] = useState(false);
  const shortenAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const displayedDonors = showAllDonors ? allDonors : allDonors.slice(0, 10);

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
          {displayedDonors.map((donor) => (
            <Card key={donor.rank} className="p-8">
              <div className="flex items-center gap-8">
                <div className="w-20 h-20 relative">
                  <img 
                    src={`https://api.dicebear.com/7.x/identicon/svg?seed=${donor.walletAddress}`}
                    alt={`Wallet ${shortenAddress(donor.walletAddress)}`}
                    className="rounded-full object-cover w-full h-full bg-gray-100 p-2"
                  />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    #{donor.rank}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <h3 className="text-lg font-mono font-medium">{shortenAddress(donor.walletAddress)}</h3>
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      Copy Address
                    </Button>
                  </div>
                  <div className="flex items-center gap-6 mb-4">
                    <span className="text-gray-600">Total Donated: ${donor.amount.toLocaleString()}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-600">{donor.donations} Donations</span>
                  </div>
                  <Progress value={(donor.amount / 15000) * 100} className="h-2" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => setShowAllDonors(!showAllDonors)}
            className="mx-auto"
          >
            {showAllDonors ? "Show Less" : "View All"}
          </Button>
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
