
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { campaigns } from "@/data/campaigns";

const CharityDetail = () => {
  const { id } = useParams();
  const campaign = campaigns.find((c) => c.id === id);

  if (!campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Campaign not found</h1>
          <Button asChild>
            <Link to="/charities">Back to Campaigns</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Button variant="ghost" asChild className="group mb-8">
          <Link to="/charities" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Campaigns
          </Link>
        </Button>

        <Card className="max-w-4xl mx-auto overflow-hidden bg-card/60 backdrop-blur-sm border-border/40">
          <div className="relative">
            <img
              src={campaign.image}
              alt={campaign.title}
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute top-4 left-4 px-3 py-1 bg-background/80 backdrop-blur-sm rounded-full flex items-center gap-2 shadow-sm border border-white/10">
              {campaign.icon}
              <span className="text-sm font-medium">{campaign.category}</span>
            </div>
          </div>

          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">{campaign.title}</h1>
            <p className="text-gray-300 text-lg mb-8">{campaign.description}</p>

            <div className="space-y-6">
              <div>
                <Progress 
                  value={(campaign.collected / campaign.target) * 100} 
                  className="h-3"
                />
                
                <div className="flex justify-between items-center mt-4">
                  <div className="space-y-1">
                    <div className="text-lg">
                      <span className="font-semibold text-primary">{campaign.collected} SOL</span>
                      {" "}raised of {campaign.target} SOL goal
                    </div>
                  </div>
                  <div className="text-gray-400">
                    {campaign.daysLeft} days left
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-muted/50 p-6 rounded-lg border border-white/5">
                  <h2 className="text-xl font-semibold mb-4">Impact & Transparency</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div>
                        <h3 className="font-medium">Wallet Info</h3>
                        <p className="text-sm text-gray-400">Donations are managed through a secure multi-sig wallet</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Button className="w-full py-6 text-lg" size="lg">
                  Donate Now
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CharityDetail;
