
import { Heart, Book, Trees, Hospital, Laptop, PiggyBank, Baby, Music } from "lucide-react";
import { ReactElement } from "react";

export type Category = "Healthcare" | "Education" | "Environment" | "Technology" | "Children" | "Arts" | "Emergency" | "Financial";

export interface Campaign {
  id: string;
  title: string;
  description: string;
  image: string;
  category: Category;
  icon: ReactElement;
  target: number;
  collected: number;
  daysLeft: number;
}

export const campaigns: Campaign[] = [
  {
    id: "1",
    title: "Emergency Medical Relief",
    description: "Providing urgent medical care and supplies to underserved communities.",
    image: "/placeholder.svg",
    category: "Healthcare",
    icon: <Hospital className="h-4 w-4" />,
    target: 100,
    collected: 75,
    daysLeft: 15
  },
  {
    id: "2",
    title: "Education for All Initiative",
    description: "Supporting education access in rural areas through technology and resources.",
    image: "/placeholder.svg",
    category: "Education",
    icon: <Book className="h-4 w-4" />,
    target: 50,
    collected: 35,
    daysLeft: 20
  },
  {
    id: "3",
    title: "Green Earth Project",
    description: "Planting trees and restoring ecosystems in threatened areas.",
    image: "/placeholder.svg",
    category: "Environment",
    icon: <Trees className="h-4 w-4" />,
    target: 80,
    collected: 60,
    daysLeft: 25
  },
  {
    id: "4",
    title: "Digital Literacy Program",
    description: "Providing computers and internet access to underprivileged students.",
    image: "/placeholder.svg",
    category: "Technology",
    icon: <Laptop className="h-4 w-4" />,
    target: 120,
    collected: 90,
    daysLeft: 30
  },
  {
    id: "5",
    title: "Children's Health Initiative",
    description: "Supporting pediatric care and childhood nutrition programs.",
    image: "/placeholder.svg",
    category: "Children",
    icon: <Baby className="h-4 w-4" />,
    target: 150,
    collected: 100,
    daysLeft: 40
  },
  {
    id: "6",
    title: "Arts Education Fund",
    description: "Supporting arts education and cultural programs in schools.",
    image: "/placeholder.svg",
    category: "Arts",
    icon: <Music className="h-4 w-4" />,
    target: 70,
    collected: 45,
    daysLeft: 35
  },
  {
    id: "7",
    title: "Financial Literacy Program",
    description: "Teaching essential financial skills to young adults.",
    image: "/placeholder.svg",
    category: "Financial",
    icon: <PiggyBank className="h-4 w-4" />,
    target: 90,
    collected: 65,
    daysLeft: 28
  },
  {
    id: "8",
    title: "Heart Health Research",
    description: "Supporting cardiovascular disease research and prevention.",
    image: "/placeholder.svg",
    category: "Healthcare",
    icon: <Heart className="h-4 w-4" />,
    target: 200,
    collected: 150,
    daysLeft: 45
  },
  {
    id: "9",
    title: "Clean Water Initiative",
    description: "Providing clean water access to rural communities.",
    image: "/placeholder.svg",
    category: "Environment",
    icon: <Trees className="h-4 w-4" />,
    target: 110,
    collected: 85,
    daysLeft: 32
  },
  {
    id: "10",
    title: "STEM Education Grant",
    description: "Supporting science and technology education in schools.",
    image: "/placeholder.svg",
    category: "Education",
    icon: <Book className="h-4 w-4" />,
    target: 130,
    collected: 95,
    daysLeft: 38
  },
  {
    id: "11",
    title: "Mental Health Support",
    description: "Providing mental health resources and counseling services.",
    image: "/placeholder.svg",
    category: "Healthcare",
    icon: <Heart className="h-4 w-4" />,
    target: 160,
    collected: 120,
    daysLeft: 42
  },
  {
    id: "12",
    title: "Youth Tech Academy",
    description: "Teaching coding and digital skills to young people.",
    image: "/placeholder.svg",
    category: "Technology",
    icon: <Laptop className="h-4 w-4" />,
    target: 140,
    collected: 105,
    daysLeft: 36
  }
];

export const getCategories = (): Category[] => {
  const categories = new Set(campaigns.map(campaign => campaign.category));
  return Array.from(categories) as Category[];
};

export const getCampaignsByCategory = (category: Category): Campaign[] => {
  return campaigns.filter(campaign => campaign.category === category);
};
