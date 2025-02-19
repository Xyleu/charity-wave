
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { campaigns } from "@/data/campaigns";

const Charities = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="py-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild className="group">
                <Link to="/" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  Back to Home
                </Link>
              </Button>
            </div>
            <Button variant="outline">View All</Button>
          </div>

          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Urgent Campaigns</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Support these urgent causes and make a real difference in people's lives. 
              Every donation counts towards creating positive change.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="flex flex-col overflow-hidden transition-transform hover:scale-[1.02] shadow-lg">
                <div className="relative">
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-full h-52 object-cover"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full flex items-center gap-2 shadow-sm">
                    {campaign.icon}
                    <span className="text-sm font-medium">{campaign.category}</span>
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold mb-2">{campaign.title}</h3>
                  <p className="text-gray-600 mb-6 flex-1">{campaign.description}</p>
                  
                  <div className="space-y-4">
                    <Progress 
                      value={(campaign.collected / campaign.target) * 100} 
                      className="h-2"
                    />
                    
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-600">
                          <span className="font-semibold text-primary">{campaign.collected} SOL</span>
                          {" "}of {campaign.target} SOL
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        {campaign.daysLeft} days left
                      </div>
                    </div>
                    
                    <Button asChild className="w-full">
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
    </div>
  );
};

export default Charities;
