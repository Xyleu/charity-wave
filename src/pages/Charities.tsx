
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { ArrowLeft, Info, ExternalLink, ShieldCheck, FileHeart } from "lucide-react";
import { campaigns, Category, getCategories } from "@/data/campaigns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Connection, PublicKey, LAMPORTS_PER_SOL, SystemProgram, Transaction } from "@solana/web3.js";
import { CharityPage } from "@/types/charityPage";

type CryptoOption = {
  symbol: string;
  name: string;
  logo: string;
  decimals: number;
};

const cryptoOptions: CryptoOption[] = [
  {
    symbol: "USDC",
    name: "USD Coin",
    logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
    decimals: 6,
  },
  {
    symbol: "USDT",
    name: "Tether",
    logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png",
    decimals: 6,
  },
  {
    symbol: "SOL",
    name: "Solana",
    logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/info/logo.png",
    decimals: 9,
  },
  {
    symbol: "ARB",
    name: "Arbitrum",
    logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/arbitrum/info/logo.png",
    decimals: 18,
  },
  {
    symbol: "JUP",
    name: "Jupiter",
    logo: "https://jup.ag/favicon.ico",
    decimals: 6,
  },
];

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

const Charities = () => {
  const [showAll, setShowAll] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState(cryptoOptions[0]);
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");
  const [showAllCommunity, setShowAllCommunity] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  useEffect(() => {
    const walletConnected = localStorage.getItem('walletConnected');
    setIsWalletConnected(walletConnected === 'true');
  }, []);

  const categories = getCategories();
  
  const filteredCampaigns = selectedCategory === "all" 
    ? campaigns 
    : campaigns.filter(campaign => campaign.category === selectedCategory);

  const displayedCampaigns = showAll ? filteredCampaigns : filteredCampaigns.slice(0, 6);

  const displayedCommunityPages = showAllCommunity 
    ? mockCharityPages 
    : mockCharityPages.slice(0, 4);

  const handleFastDonation = async () => {
    try {
      const amount = parseFloat(donationAmount);
      
      if (isNaN(amount) || amount <= 0) {
        toast.error("Please enter a valid amount");
        return;
      }

      // Check if Phantom is installed
      const { solana } = window as any;
      
      if (!solana?.isPhantom) {
        toast.error("Please install Phantom wallet!");
        return;
      }

      // Request connection to the wallet
      await solana.connect();
      const walletPublicKey = solana.publicKey;

      if (!walletPublicKey) {
        toast.error("Please connect your wallet first!");
        return;
      }

      // For this example, we'll implement SOL transfers
      // For other tokens, you'd need to use their respective transfer methods
      if (selectedCrypto.symbol === "SOL") {
        const connection = new Connection("https://api.mainnet-beta.solana.com");
        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: walletPublicKey,
            toPubkey: new PublicKey("CharityLedgerPublicKeyHere123456789"), // Replace with actual charity wallet
            lamports: amount * LAMPORTS_PER_SOL,
          })
        );

        const { signature } = await solana.signAndSendTransaction(transaction);
        await connection.confirmTransaction(signature);
        
        toast.success("Donation successful! Thank you for your contribution.");
      } else {
        // For other tokens, you would implement their specific transfer logic here
        toast.error("Currently only SOL donations are implemented");
      }
    } catch (error) {
      toast.error("Transaction failed. Please try again.");
      console.error("Donation error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* Back button on top */}
      <div className="container mx-auto px-4 pt-24 pb-4">
        <Button variant="ghost" asChild className="group mb-4 text-foreground/80 hover:text-foreground">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
        </Button>
      </div>
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">
              Make a Real <span className="text-primary">Impact</span> Today
            </h1>
            <p className="text-xl text-foreground/80 mb-8">
              Support these urgent causes and make a real difference in people's lives. 
              Every donation counts towards creating positive change.
            </p>
            <div className="flex justify-center gap-4 mb-8">
              <Button 
                size="lg" 
                className="text-lg px-8 bg-primary text-primary-foreground hover:bg-primary/90" 
                onClick={() => {
                  document.getElementById('campaigns')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Start Donating
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" variant="outline" className="text-lg px-8 border-primary/20 text-foreground hover:bg-primary/10">
                    <Info className="mr-2 h-4 w-4" />
                    Learn More
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-card text-card-foreground">
                  <DialogHeader>
                    <DialogTitle>About Our Charity Platform</DialogTitle>
                    <DialogDescription className="pt-4 space-y-4">
                      <p>
                        Our platform connects donors directly with verified charitable causes using blockchain technology. 
                        Every donation is transparent and traceable, ensuring your contribution makes the maximum impact.
                      </p>
                      <p>
                        We support various causes including education, healthcare, environmental conservation, 
                        arts & culture, food security, and technology access initiatives.
                      </p>
                      <p>
                        All charities on our platform are thoroughly vetted and operate with full transparency. 
                        You can track your donations and see their direct impact on the causes you support.
                      </p>
                      <div className="flex justify-end">
                        <Button asChild className="bg-primary hover:bg-primary/90">
                          <a 
                            href="https://docs.charityledger.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            Learn More <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      {/* Fast Donation Section */}
      <div className="bg-card py-16 border-y border-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Fast Donation with <span className="text-primary">Charity Ledger</span>
              </h2>
              <div className="space-y-4 text-foreground/80">
                <p className="text-lg">
                  Trust us to manage your donations effectively. We accept these 5 cryptocurrencies
                  and ensure your contribution reaches those who need it most.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full p-1 bg-primary/20 text-primary mt-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    Automatic funds distribution to verified charities
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full p-1 bg-primary/20 text-primary mt-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    Support multiple causes with a single transaction
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full p-1 bg-primary/20 text-primary mt-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    Complete transparency with blockchain tracking
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <div className="flex items-center gap-4 flex-wrap">
                  {cryptoOptions.map((crypto) => (
                    <Button 
                      key={crypto.symbol}
                      size="lg" 
                      variant={selectedCrypto.symbol === crypto.symbol ? "default" : "outline"}
                      className={`text-lg gap-2 ${selectedCrypto.symbol === crypto.symbol ? 'bg-primary text-primary-foreground' : 'border-primary/20 hover:bg-primary/10'}`}
                      onClick={() => setSelectedCrypto(crypto)}
                    >
                      <img 
                        src={crypto.logo} 
                        alt={crypto.symbol} 
                        className="w-5 h-5"
                      />
                      {crypto.symbol}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-card/50 to-card rounded-2xl p-8 border border-muted">
              <div className="space-y-6">
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-foreground/80 mb-1">
                    Donation Amount
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="amount"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value)}
                      step="any"
                      className="block w-full rounded-lg bg-muted border-muted text-foreground pl-4 pr-20 focus:border-primary focus:ring-primary sm:text-sm"
                      placeholder="Enter amount"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <select
                        value={selectedCrypto.symbol}
                        onChange={(e) => setSelectedCrypto(cryptoOptions.find(c => c.symbol === e.target.value) || cryptoOptions[0])}
                        className="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-foreground/80 focus:border-primary focus:ring-primary sm:text-sm"
                      >
                        {cryptoOptions.map((crypto) => (
                          <option key={crypto.symbol} value={crypto.symbol}>
                            {crypto.symbol}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="impact-area" className="block text-sm font-medium text-foreground/80 mb-1">
                    Select Impact Area (Optional)
                  </label>
                  <select
                    id="impact-area"
                    className="block w-full rounded-lg bg-muted border-muted text-foreground focus:border-primary focus:ring-primary sm:text-sm"
                  >
                    <option value="">Let Charity Ledger decide</option>
                    <option value="urgent">Most Urgent Needs</option>
                    <option value="education">Education</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="environment">Environment</option>
                  </select>
                </div>
                <Button 
                  className="w-full text-lg py-6 bg-primary hover:bg-primary/90" 
                  size="lg"
                  onClick={handleFastDonation}
                >
                  Make Fast Donation
                </Button>
                <p className="text-xs text-foreground/60 text-center">
                  Your donation will be distributed based on our impact assessment
                  and urgent needs across verified charitable organizations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Campaigns Grid - Now Horizontally Scrollable */}
      <div id="campaigns" className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Our Campaigns</h2>
            <Button 
              variant="outline" 
              onClick={() => setShowAll(!showAll)}
              className="border-primary/20 hover:bg-primary/10 text-foreground"
            >
              {showAll ? "Show Less" : "View All"}
            </Button>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="flex flex-wrap gap-2 bg-muted/50">
              <TabsTrigger 
                value="all" 
                onClick={() => setSelectedCategory("all")}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                All Campaigns
              </TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  onClick={() => setSelectedCategory(category)}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Horizontal scrollable container */}
        <div className="scroll-container">
          {displayedCampaigns.map((campaign) => (
            <Card 
              key={campaign.id} 
              className="scroll-item group flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl bg-card border-muted"
            >
              <div className="relative overflow-hidden">
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full flex items-center gap-2 shadow-sm">
                  {campaign.icon}
                  <span className="text-sm font-medium text-white">{campaign.category}</span>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {campaign.title}
                </h3>
                <p className="text-foreground/70 mb-6 flex-1">{campaign.description}</p>
                
                <div className="space-y-4">
                  <div className="relative pt-1">
                    <Progress 
                      value={(campaign.collected / campaign.target) * 100} 
                      className="h-2 bg-muted"
                    />
                    <div className="absolute -top-2 right-0 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                      {Math.round((campaign.collected / campaign.target) * 100)}%
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <div className="text-sm text-foreground/70">
                        <span className="font-semibold text-primary">{campaign.collected} SOL</span>
                        {" "}of {campaign.target} SOL
                      </div>
                    </div>
                    <div className="text-sm font-medium text-foreground/70 bg-muted/50 px-3 py-1 rounded-full">
                      {campaign.daysLeft} days left
                    </div>
                  </div>
                  
                  <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Link to={`/charity/${campaign.id}`}>
                      Donate Now
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Community Charity Pages */}
      <div className="container mx-auto px-4 py-16 border-t border-muted">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold">Community Charity Pages</h2>
              <p className="text-foreground/70 mt-2">Support user-created charity campaigns</p>
            </div>
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                onClick={() => setShowAllCommunity(!showAllCommunity)}
                className="border-primary/20 hover:bg-primary/10 text-foreground"
              >
                {showAllCommunity ? "Show Less" : "View All"}
              </Button>
              <Button 
                onClick={() => window.location.href = "/create-charity"}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <FileHeart className="mr-2 h-4 w-4" />
                Create Your Own
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedCommunityPages.map((page) => (
            <Card key={page.id} className="overflow-hidden h-full flex flex-col bg-card border-muted">
              <div className="aspect-video w-full overflow-hidden">
                <img 
                  src={page.coverImage} 
                  alt={page.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">{page.title}</h3>
                  {page.isVerified && (
                    <ShieldCheck className="h-5 w-5 text-green-500" />
                  )}
                </div>
                <p className="text-sm text-foreground/70 mb-4 line-clamp-2">
                  {page.description}
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground/50">Goal:</span>
                    <span className="font-medium">{page.goal} SOL</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground/50">Raised:</span>
                    <span className="font-medium">{page.collected} SOL</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 mt-1">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${Math.min(100, (page.collected / page.goal) * 100)}%` }}
                    ></div>
                  </div>
                </div>
                <Button 
                  variant="default" 
                  className="w-full mt-auto bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => window.location.href = `/charity-page/${page.id}`}
                >
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Charities;
