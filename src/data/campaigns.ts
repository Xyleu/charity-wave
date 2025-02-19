
import { 
  BookOpen, 
  HeartPulse, 
  Leaf, 
  Palette, 
  Apple, 
  Laptop 
} from "lucide-react";

export interface Campaign {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  collected: number;
  target: number;
  daysLeft: number;
  address: string;
  icon: JSX.Element;
}

export const campaigns: Campaign[] = [
  {
    id: "1",
    title: "Education for All",
    category: "Education",
    description: "Help provide education to underprivileged children in developing countries. Your donation can make a real difference in someone's future.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&q=80",
    collected: 150,
    target: 200,
    daysLeft: 15,
    address: "edu123",
    icon: <BookOpen className="h-5 w-5" />
  },
  {
    id: "2",
    title: "Healthcare Support",
    category: "Healthcare",
    description: "Support medical treatments for those in need. Help us provide essential healthcare services to underserved communities.",
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=500&q=80",
    collected: 90,
    target: 200,
    daysLeft: 20,
    address: "health123",
    icon: <HeartPulse className="h-5 w-5" />
  },
  {
    id: "3",
    title: "Green Earth Initiative",
    category: "Environment",
    description: "Support reforestation and climate action projects. Together we can make our planet greener and more sustainable.",
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=500&q=80",
    collected: 120,
    target: 200,
    daysLeft: 25,
    address: "env123",
    icon: <Leaf className="h-5 w-5" />
  },
  {
    id: "4",
    title: "Community Art Center",
    category: "Arts & Culture",
    description: "Help build a local arts education center that will provide creative opportunities for youth in our community.",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=500&q=80",
    collected: 60,
    target: 200,
    daysLeft: 40,
    address: "art123",
    icon: <Palette className="h-5 w-5" />
  },
  {
    id: "5",
    title: "Food Bank Support",
    category: "Food Security",
    description: "Help provide meals to families in need. Every donation helps us fight hunger in our communities.",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=500&q=80",
    collected: 170,
    target: 200,
    daysLeft: 10,
    address: "food123",
    icon: <Apple className="h-5 w-5" />
  },
  {
    id: "6",
    title: "Digital Literacy",
    category: "Technology",
    description: "Provide computers and tech education to bridge the digital divide. Help create opportunities in the digital age.",
    image: "https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?w=500&q=80",
    collected: 80,
    target: 200,
    daysLeft: 30,
    address: "tech123",
    icon: <Laptop className="h-5 w-5" />
  }
];
