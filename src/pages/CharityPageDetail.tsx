
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Calendar, User, Wallet } from "lucide-react";
import { toast } from "sonner";
import { CharityPage } from "@/types/charityPage";

// Mock data - in a real app this would come from a database
const mockCharityPages: CharityPage[] = [
  {
    id: "verified-1",
    title: "Clean Water Initiative",
    description: "Providing clean water access to rural communities. Our mission is to ensure that everyone has access to clean and safe drinking water. We work with local communities to build sustainable water systems that can be maintained for years to come.",
    goal: 5000,
    collected: 3250,
    createdAt: "2023-10-15",
    coverImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    category: "Environment",
    isVerified: true,
    walletAddress: "AoS7rRf1fRSSBSJKvT82zLGqSvP1RCcX1TJwGgMJ16Qb",
    ownerName: "Global Water Foundation"
  },
  {
    id: "verified-2",
    title: "Education for All",
    description: "Supporting education access in underprivileged areas. We believe that education is a fundamental right for every child. Through our programs, we provide educational materials, build schools, and train teachers to ensure quality education for all children regardless of their background.",
    goal: 10000,
    collected: 7500,
    createdAt: "2023-11-05",
    coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    category: "Education",
    isVerified: true,
    walletAddress: "BPxEQmGfxdWEjWdnsxXXfEgSs8X2s2sgXzNcGKF3Kh2b",
    ownerName: "Education Access Network"
  },
  {
    id: "user-1",
    title: "Local Animal Shelter Support",
    description: "Help us care for abandoned animals in our community. Our shelter takes in stray and abandoned animals, providing them with food, shelter, and medical care. We work to find loving homes for all our animals and advocate for responsible pet ownership.",
    goal: 2000,
    collected: 850,
    createdAt: "2023-12-10",
    coverImage: "/placeholder.svg",
    category: "Animals",
    isVerified: false,
    walletAddress: "AoS7rRf1fRSSBSJKvT82zLGqSvP1RCcX1TJwGgMJ16Qb",
    ownerName: "John's Animal Support"
  },
  {
    id: "user-2",
    title: "Community Garden Project",
    description: "Creating green spaces in urban neighborhoods. Our community garden project aims to transform vacant lots into productive gardens that provide fresh produce for local residents. We also offer gardening education and create spaces for community gatherings.",
    goal: 3000,
    collected: 1200,
    createdAt: "2024-01-20",
    coverImage: "/placeholder.svg",
    category: "Community",
    isVerified: false,
    walletAddress: "BPxEQmGfxdWEjWdnsxXXfEgSs8X2s2sgXzNcGKF3Kh2b",
    ownerName: "Urban Greening Initiative"
  }
];

const CharityPageDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [charityPage, setCharityPage] = useState<CharityPage | null>(null);
  const [donationAmount, setDonationAmount] = useState<string>("");
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false);
  
  useEffect(() => {
    // In a real app, fetch the charity page data from the API
    const page = mockCharityPages.find(p => p.id === id);
    if (page) {
      setCharityPage(page);
    } else {
      toast.error("Charity page not found");
      navigate("/charity-pages");
    }
    
    // Check if wallet is connected
    const walletConnected = localStorage.getItem('walletConnected');
    setIsWalletConnected(walletConnected === 'true');
  }, [id, navigate]);

  const handleDonate = () => {
    if (!isWalletConnected) {
      toast.error("Please connect your wallet to donate");
      return;
    }
    
    if (!donationAmount || parseFloat(donationAmount) <= 0) {
      toast.error("Please enter a valid donation amount");
      return;
    }
    
    // In a real app, this would process the donation transaction
    toast.success(`Thank you for donating ${donationAmount} SOL!`);
    setDonationAmount("");
  };

  if (!charityPage) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-12 flex items-center justify-center">
          <p>Loading charity page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button variant="outline" onClick={() => navigate("/charity-pages")} className="border-white/10 hover:bg-white/5">
              Back to Charity Pages
            </Button>
          </div>
          
          <div className="relative">
            <div className="h-64 md:h-96 overflow-hidden rounded-lg mb-6">
              <img 
                src={charityPage.coverImage} 
                alt={charityPage.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {charityPage.isVerified && (
              <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2 border border-white/10">
                <ShieldCheck className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Verified Charity</span>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h1 className="text-3xl font-bold mb-4">{charityPage.title}</h1>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-sm text-gray-400">
                  <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                  <span>Created on {new Date(charityPage.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <User className="h-4 w-4 mr-1 text-gray-500" />
                  <span>By {charityPage.ownerName}</span>
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <Wallet className="h-4 w-4 mr-1 text-gray-500" />
                  <span className="truncate" title={charityPage.walletAddress}>
                    {charityPage.walletAddress.slice(0, 6)}...{charityPage.walletAddress.slice(-4)}
                  </span>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3">About this campaign</h2>
                <p className="text-gray-300 whitespace-pre-line">
                  {charityPage.description}
                </p>
              </div>
            </div>
            
            <div>
              <Card className="bg-card/60 backdrop-blur-sm border-border/40">
                <CardHeader>
                  <CardTitle>Donation Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Goal:</span>
                      <span className="font-medium">{charityPage.goal} SOL</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Raised:</span>
                      <span className="font-medium">{charityPage.collected} SOL</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
                      <div 
                        className="bg-primary h-2.5 rounded-full" 
                        style={{ width: `${Math.min(100, (charityPage.collected / charityPage.goal) * 100)}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-right text-gray-400">
                      {Math.round((charityPage.collected / charityPage.goal) * 100)}% of goal
                    </div>
                    
                    <div className="pt-4">
                      <div className="mb-3">
                        <Input
                          type="number"
                          placeholder="Amount (SOL)"
                          value={donationAmount}
                          onChange={(e) => setDonationAmount(e.target.value)}
                          className="bg-background/50 border-white/10"
                        />
                      </div>
                      <Button 
                        className="w-full" 
                        onClick={handleDonate}
                        disabled={!isWalletConnected}
                      >
                        {isWalletConnected ? "Donate Now" : "Connect Wallet to Donate"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharityPageDetail;
