
export interface CharityPage {
  id: string;
  title: string;
  description: string;
  goal: number;
  collected: number;
  createdAt: string;
  coverImage: string;
  category: string;
  isVerified: boolean;
  walletAddress: string;
  ownerName: string;
}
