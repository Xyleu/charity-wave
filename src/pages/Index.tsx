
import { Heart, Trophy, Users, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Navbar } from "@/components/Navbar";
import { Link } from "react-router-dom";
import { campaigns } from "@/data/campaigns";

// Define custom icons for Discord and Telegram
const DiscordIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.127c.126-.094.252-.192.372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127c-.598.35-1.22.645-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.834 19.834 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" fill="currentColor" />
  </svg>
);

const TelegramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" fill="currentColor" />
  </svg>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-up">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Empowering Change Through
              <span className="text-primary"> Transparent Giving</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join our blockchain-powered platform connecting donors with verified charities.
              Make a difference with complete transparency and trust.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="text-lg">
                <Link to="/charities">Explore Charities</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg">
                <Link to="/leaderboard">View Impact</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Total Donations Display */}
      <section className="py-8 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold">
              <span className="text-primary">Charity Ledger</span> has raised a total of
              <span className="text-primary ml-2">$1,248,750</span> in donations
            </h2>
            <p className="text-gray-600 mt-2">Thanks to our generous community of donors</p>
          </div>
        </div>
      </section>

      {/* Featured Campaigns Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Campaigns</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaigns.slice(0, 3).map((campaign) => (
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
                
                <CardContent className="p-6 flex-1 flex flex-col bg-white">
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
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link to="/charities">View All Campaigns</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center p-6 rounded-lg bg-white shadow-sm border border-gray-100 transition-transform hover:scale-105">
              <Heart className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-3xl font-bold mb-2">$1.2M+</h3>
              <p className="text-gray-600">Total Donations</p>
            </div>
            <div className="flex flex-col items-center p-6 rounded-lg bg-white shadow-sm border border-gray-100 transition-transform hover:scale-105">
              <Users className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-3xl font-bold mb-2">5,000+</h3>
              <p className="text-gray-600">Active Donors</p>
            </div>
            <div className="flex flex-col items-center p-6 rounded-lg bg-white shadow-sm border border-gray-100 transition-transform hover:scale-105">
              <Trophy className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-3xl font-bold mb-2">50+</h3>
              <p className="text-gray-600">Verified Charities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 mb-8">
              Charity Ledger leverages blockchain technology to create a transparent,
              efficient, and trustworthy charitable giving platform. We believe in
              empowering donors with complete visibility of their impact while
              providing charities with the tools they need to make a difference.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="p-6 rounded-lg bg-white shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold mb-3">Transparency</h3>
                <p className="text-gray-600">
                  Every donation is recorded on the Solana blockchain, ensuring
                  complete transparency and traceability of funds.
                </p>
              </div>
              <div className="p-6 rounded-lg bg-white shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold mb-3">Security</h3>
                <p className="text-gray-600">
                  Built on Solana's secure blockchain infrastructure, ensuring
                  your donations are safe and traceable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Links */}
      <footer className="py-12 bg-primary/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900">Connect With Us</h3>
            <div className="flex flex-wrap justify-center gap-8">
              <a 
                href="https://discord.gg/charityledger" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-gray-600 hover:text-primary transition-colors bg-white px-6 py-3 rounded-full shadow-sm hover:shadow-md"
              >
                <DiscordIcon />
                <span className="font-medium">Discord</span>
              </a>
              <a 
                href="https://t.me/charityledger" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-gray-600 hover:text-primary transition-colors bg-white px-6 py-3 rounded-full shadow-sm hover:shadow-md"
              >
                <TelegramIcon />
                <span className="font-medium">Telegram</span>
              </a>
              <a 
                href="mailto:contact@charityledger.org"
                className="flex items-center space-x-3 text-gray-600 hover:text-primary transition-colors bg-white px-6 py-3 rounded-full shadow-sm hover:shadow-md"
              >
                <Mail className="w-5 h-5" />
                <span className="font-medium">Email</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
