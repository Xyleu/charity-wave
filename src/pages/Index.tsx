
import { Heart, Trophy, Users, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Navbar } from "@/components/Navbar";
import { Link } from "react-router-dom";
import { campaigns } from "@/data/campaigns";

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
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium">Discord</span>
              </a>
              <a 
                href="https://t.me/charityledger" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-gray-600 hover:text-primary transition-colors bg-white px-6 py-3 rounded-full shadow-sm hover:shadow-md"
              >
                <MessageCircle className="w-5 h-5" />
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
