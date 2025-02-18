
import { Heart, Trophy, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Link } from "react-router-dom";

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

      {/* Stats Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
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
      <section className="py-20 px-4">
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
    </div>
  );
};

export default Index;
