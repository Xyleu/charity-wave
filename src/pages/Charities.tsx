
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { ArrowLeft, Info, ExternalLink } from "lucide-react";
import { campaigns } from "@/data/campaigns";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import { Connection, PublicKey, LAMPORTS_PER_SOL, SystemProgram, Transaction } from "@solana/web3.js";

type CryptoOption = {
  symbol: string;
  name: string;
  logo: string;
  minAmount: number;
  decimals: number;
};

const cryptoOptions: CryptoOption[] = [
  {
    symbol: "USDC",
    name: "USD Coin",
    logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
    minAmount: 10,
    decimals: 6,
  },
  {
    symbol: "USDT",
    name: "Tether",
    logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png",
    minAmount: 10,
    decimals: 6,
  },
  {
    symbol: "SOL",
    name: "Solana",
    logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/info/logo.png",
    minAmount: 0.1,
    decimals: 9,
  },
  {
    symbol: "ARB",
    name: "Arbitrum",
    logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/arbitrum/info/logo.png",
    minAmount: 10,
    decimals: 18,
  },
  {
    symbol: "JUP",
    name: "Jupiter",
    logo: "https://jup.ag/favicon.ico",
    minAmount: 100,
    decimals: 6,
  },
];

const Charities = () => {
  const [showAll, setShowAll] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState(cryptoOptions[0]);
  const displayedCampaigns = showAll ? campaigns : campaigns.slice(0, 6);

  const handleFastDonation = async () => {
    try {
      const amount = parseFloat(donationAmount);
      
      if (isNaN(amount) || amount < selectedCrypto.minAmount) {
        toast.error(`Minimum donation amount is ${selectedCrypto.minAmount} ${selectedCrypto.symbol}`);
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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild className="group">
                <Link to="/" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  Back to Home
                </Link>
              </Button>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Less" : "View All"}
            </Button>
          </div>

          <div className="mb-12 text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Make a Real <span className="text-primary">Impact</span> Today
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Support these urgent causes and make a real difference in people's lives. 
              Every donation counts towards creating positive change.
            </p>
            <div className="flex justify-center gap-4 mb-8">
              <Button 
                size="lg" 
                className="text-lg px-8" 
                asChild
              >
                <Link to="#campaigns">
                  Start Donating
                </Link>
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" variant="outline" className="text-lg px-8">
                    <Info className="mr-2 h-4 w-4" />
                    Learn More
                  </Button>
                </DialogTrigger>
                <DialogContent>
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
                        <Button asChild>
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
      <div className="bg-white py-16 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Fast Donation with <span className="text-primary">Charity Ledger</span>
              </h2>
              <div className="space-y-4 text-gray-600">
                <p className="text-lg">
                  Trust us to manage your donations effectively. We accept these 5 cryptocurrencies
                  and ensure your contribution reaches those who need it most.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full p-1 bg-primary/10 text-primary mt-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    Automatic funds distribution to verified charities
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full p-1 bg-primary/10 text-primary mt-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    Support multiple causes with a single transaction
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full p-1 bg-primary/10 text-primary mt-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    Complete transparency with blockchain tracking
                  </li>
                </ul>
              </div>
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-4 flex-wrap">
                  {cryptoOptions.map((crypto) => (
                    <Button 
                      key={crypto.symbol}
                      size="lg" 
                      variant={selectedCrypto.symbol === crypto.symbol ? "default" : "outline"}
                      className="text-lg gap-2"
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
                <p className="text-sm text-gray-500">
                  Minimum donation: 10 USDC / 10 USDT / 0.1 SOL / 10 ARB / 100 JUP
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8">
              <div className="space-y-6">
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                    Donation Amount
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="amount"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value)}
                      min={selectedCrypto.minAmount}
                      step="any"
                      className="block w-full rounded-lg border-gray-300 pl-4 pr-20 focus:border-primary focus:ring-primary sm:text-sm"
                      placeholder={`Min ${selectedCrypto.minAmount}`}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <select
                        value={selectedCrypto.symbol}
                        onChange={(e) => setSelectedCrypto(cryptoOptions.find(c => c.symbol === e.target.value) || cryptoOptions[0])}
                        className="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:border-primary focus:ring-primary sm:text-sm"
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
                  <label htmlFor="impact-area" className="block text-sm font-medium text-gray-700 mb-1">
                    Select Impact Area (Optional)
                  </label>
                  <select
                    id="impact-area"
                    className="block w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary sm:text-sm"
                  >
                    <option value="">Let Charity Ledger decide</option>
                    <option value="urgent">Most Urgent Needs</option>
                    <option value="education">Education</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="environment">Environment</option>
                  </select>
                </div>
                <Button 
                  className="w-full text-lg py-6" 
                  size="lg"
                  onClick={handleFastDonation}
                >
                  Make Fast Donation
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  Your donation will be distributed based on our impact assessment
                  and urgent needs across verified charitable organizations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Campaigns Grid */}
      <div id="campaigns" className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedCampaigns.map((campaign) => (
            <Card key={campaign.id} className="group flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="relative overflow-hidden">
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full flex items-center gap-2 shadow-sm">
                  {campaign.icon}
                  <span className="text-sm font-medium">{campaign.category}</span>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col bg-white">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {campaign.title}
                </h3>
                <p className="text-gray-600 mb-6 flex-1">{campaign.description}</p>
                
                <div className="space-y-4">
                  <div className="relative pt-1">
                    <Progress 
                      value={(campaign.collected / campaign.target) * 100} 
                      className="h-2"
                    />
                    <div className="absolute -top-2 right-0 bg-primary text-white text-xs px-2 py-1 rounded-full">
                      {Math.round((campaign.collected / campaign.target) * 100)}%
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <div className="text-sm text-gray-600">
                        <span className="font-semibold text-primary">{campaign.collected} SOL</span>
                        {" "}of {campaign.target} SOL
                      </div>
                    </div>
                    <div className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                      {campaign.daysLeft} days left
                    </div>
                  </div>
                  
                  <Button asChild className="w-full group-hover:bg-primary/90 transition-colors">
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
    </div>
  );
};

export default Charities;
