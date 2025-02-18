
import { Card } from "@/components/ui/card";
import { Trophy } from "lucide-react";

interface Donor {
  address: string;
  totalDonated: number;
  rank: number;
}

// This would typically come from your backend
const donors: Donor[] = [
  { address: "8xir...9j2k", totalDonated: 250.5, rank: 1 },
  { address: "3vbm...7h4d", totalDonated: 180.75, rank: 2 },
  { address: "9pql...2w5n", totalDonated: 155.25, rank: 3 },
  { address: "5kxy...4f8m", totalDonated: 120.0, rank: 4 },
  { address: "2rst...6c9v", totalDonated: 95.5, rank: 5 },
];

const Leaderboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Top Donors</h1>
            <p className="text-gray-600">
              Recognizing our most generous contributors making a difference in the world
            </p>
          </div>

          <Card className="overflow-hidden">
            {donors.map((donor, index) => (
              <div
                key={donor.address}
                className={`flex items-center justify-between p-6 ${
                  index !== donors.length - 1 ? "border-b" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center
                    ${donor.rank === 1 ? "bg-yellow-100 text-yellow-600" :
                      donor.rank === 2 ? "bg-gray-100 text-gray-600" :
                      donor.rank === 3 ? "bg-orange-100 text-orange-600" :
                      "bg-gray-50 text-gray-500"}
                  `}>
                    {donor.rank <= 3 ? (
                      <Trophy className="w-4 h-4" />
                    ) : (
                      <span className="text-sm font-medium">{donor.rank}</span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{donor.address}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">
                    {donor.totalDonated} SOL
                  </p>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
