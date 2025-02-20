
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

const Charities = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedCampaigns = showAll ? campaigns : campaigns.slice(0, 6);

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
