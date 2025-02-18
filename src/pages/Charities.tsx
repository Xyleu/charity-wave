
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  HeartPulse, 
  Leaf, 
  Palette, 
  Apple, 
  Laptop 
} from "lucide-react";

interface Campaign {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  collected: number;
  target: number;
  daysLeft: number;
  address: string;
  icon: React.ReactNode;
}

const campaigns: Campaign[] = [
  {
    id: "1",
    title: "Education for All",
    category: "Education",
    description: "Help provide education to underprivileged children",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&q=80",
    collected: 150,
    target: 200,
    daysLeft: 15,
    address: "edu123",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    id: "2",
    title: "Healthcare Support",
    category: "Healthcare",
    description: "Support medical treatments for those in need",
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=500&q=80",
    collected: 90,
    target: 200,
    daysLeft: 20,
    address: "health123",
    icon: <HeartPulse className="h-5 w-5" />,
  },
  {
    id: "3",
    title: "Green Earth Initiative",
    category: "Environment",
    description: "Support reforestation and climate action",
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=500&q=80",
    collected: 120,
    target: 200,
    daysLeft: 25,
    address: "env123",
    icon: <Leaf className="h-5 w-5" />,
  },
  {
    id: "4",
    title: "Community Art Center",
    category: "Arts & Culture",
    description: "Help build a local arts education center",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=500&q=80",
    collected: 60,
    target: 200,
    daysLeft: 40,
    address: "art123",
    icon: <Palette className="h-5 w-5" />,
  },
  {
    id: "5",
    title: "Food Bank Support",
    category: "Food Security",
    description: "Help provide meals to families in need",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=500&q=80",
    collected: 170,
    target: 200,
    daysLeft: 10,
    address: "food123",
    icon: <Apple className="h-5 w-5" />,
  },
  {
    id: "6",
    title: "Digital Literacy",
    category: "Technology",
    description: "Provide computers and tech education",
    image: "https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?w=500&q=80",
    collected: 80,
    target: 200,
    daysLeft: 30,
    address: "tech123",
    icon: <Laptop className="h-5 w-5" />,
  },
];

const Charities = () => {
  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Urgent Campaigns</h1>
            <Button variant="outline">View All</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="overflow-hidden transition-transform hover:scale-[1.02]">
                <div className="relative">
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full flex items-center gap-2 shadow-sm">
                    {campaign.icon}
                    <span className="text-sm font-medium">{campaign.category}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{campaign.title}</h3>
                  <p className="text-gray-600 mb-4">{campaign.description}</p>
                  
                  <Progress 
                    value={(campaign.collected / campaign.target) * 100} 
                    className="h-2 mb-4"
                  />
                  
                  <div className="flex justify-between items-center mb-4">
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
                  
                  <Button className="w-full" data-address={campaign.address}>
                    Donate Now
                  </Button>
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
