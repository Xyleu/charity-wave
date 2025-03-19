
import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileHeart, ShieldCheck } from "lucide-react";
import { CharityPage } from "@/types/charityPage";

// Mock data - in a real app this would come from a database
const mockCharityPages: CharityPage[] = [
  {
    id: "verified-1",
    title: "Clean Water Initiative",
    description: "Providing clean water access to rural communities.",
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
    description: "Supporting education access in underprivileged areas.",
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
    description: "Help us care for abandoned animals in our community.",
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
    description: "Creating green spaces in urban neighborhoods.",
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

const CharityPages: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("all");
  
  const filteredPages = activeTab === "all" 
    ? mockCharityPages 
    : activeTab === "verified" 
      ? mockCharityPages.filter(page => page.isVerified) 
      : mockCharityPages.filter(page => !page.isVerified);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Charity Pages</h1>
            <p className="text-gray-400 mt-2">Browse and support charity campaigns</p>
          </div>
          <Button 
            onClick={() => navigate("/create-charity")} 
            className="mt-4 md:mt-0"
          >
            <FileHeart className="mr-2 h-4 w-4" />
            Create Your Charity Page
          </Button>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full mt-6">
          <TabsList className="grid w-full md:w-[400px] grid-cols-3 bg-muted/40">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="verified">Verified</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPages.map((page) => (
                <Card key={page.id} className="overflow-hidden h-full flex flex-col bg-card/60 backdrop-blur-sm border-border/40 hover:border-primary/40 transition-all duration-300">
                  <div className="aspect-video w-full overflow-hidden">
                    <img 
                      src={page.coverImage} 
                      alt={page.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{page.title}</CardTitle>
                      {page.isVerified && (
                        <ShieldCheck className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                    <CardDescription className="line-clamp-2 text-gray-400">
                      {page.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Goal:</span>
                        <span className="font-medium">{page.goal} SOL</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Raised:</span>
                        <span className="font-medium">{page.collected} SOL</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
                        <div 
                          className="bg-primary h-2.5 rounded-full" 
                          style={{ width: `${Math.min(100, (page.collected / page.goal) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="default" 
                      className="w-full"
                      onClick={() => navigate(`/charity-page/${page.id}`)}
                    >
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CharityPages;
