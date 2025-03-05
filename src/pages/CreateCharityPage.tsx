
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { FileImage, AlertCircle } from "lucide-react";
import { getCategories } from "@/data/campaigns";

const CreateCharityPage: React.FC = () => {
  const navigate = useNavigate();
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goal: "",
    category: "",
    ownerName: "",
    coverImage: "/placeholder.svg" // Default placeholder
  });
  
  useEffect(() => {
    // Check if wallet is connected
    const walletConnected = localStorage.getItem('walletConnected');
    const storedAddress = localStorage.getItem('walletAddress');
    
    setIsWalletConnected(walletConnected === 'true');
    if (storedAddress) {
      setWalletAddress(storedAddress);
    } else if (!walletConnected) {
      toast.error("Please connect your wallet to create a charity page");
      navigate("/");
    }
  }, [navigate]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title.trim()) {
      toast.error("Please enter a title for your charity page");
      return;
    }
    
    if (!formData.description.trim()) {
      toast.error("Please provide a description for your charity page");
      return;
    }
    
    if (!formData.goal || parseFloat(formData.goal) <= 0) {
      toast.error("Please set a valid donation goal");
      return;
    }
    
    if (!formData.category) {
      toast.error("Please select a category for your charity page");
      return;
    }
    
    if (!formData.ownerName.trim()) {
      toast.error("Please enter your name or organization name");
      return;
    }
    
    // In a real app, this would create the charity page in the database
    toast.success("Your charity page has been created!");
    
    // Redirect to the charity pages listing
    setTimeout(() => {
      navigate("/charity-pages");
    }, 1500);
  };
  
  // In a real app, we would implement this to handle image uploads
  const handleImageUpload = () => {
    toast.info("Image upload functionality would be implemented in a production app");
  };

  if (!isWalletConnected) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-12 flex flex-col items-center justify-center">
          <AlertCircle className="h-12 w-12 text-amber-500 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Wallet Not Connected</h1>
          <p className="text-gray-600 mb-6">Please connect your wallet to create a charity page.</p>
          <Button onClick={() => navigate("/")}>Go to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <Button variant="outline" onClick={() => navigate("/charity-pages")}>
              Back to Charity Pages
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Create Your Charity Page</CardTitle>
              <CardDescription>
                Fill out the form below to create your own charity page. All community-created pages
                will be clearly marked as user-created campaigns.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Charity Title</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Enter a clear, descriptive title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Describe your charity campaign in detail"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={6}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="goal">Fundraising Goal (SOL)</Label>
                      <Input
                        id="goal"
                        name="goal"
                        type="number"
                        placeholder="e.g., 1000"
                        value={formData.goal}
                        onChange={handleInputChange}
                        min="1"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => handleSelectChange("category", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {getCategories().map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="ownerName">Your Name or Organization</Label>
                    <Input
                      id="ownerName"
                      name="ownerName"
                      placeholder="e.g., John Smith or Green Earth Initiative"
                      value={formData.ownerName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label>Cover Image</Label>
                    <div 
                      className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
                      onClick={handleImageUpload}
                    >
                      <FileImage className="h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Click to upload a cover image</p>
                      <p className="text-xs text-gray-500 mt-1">(Max 5MB, PNG or JPG)</p>
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
                    <p>
                      <strong>Important Note:</strong> Your charity page will be marked as a community-created
                      campaign. Verified status is only granted to established organizations after a review process.
                    </p>
                    <p className="mt-2">
                      Wallet Address: <span className="font-mono">{walletAddress.slice(0, 10)}...{walletAddress.slice(-4)}</span>
                    </p>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <Button variant="outline" onClick={() => navigate("/charity-pages")} className="sm:flex-1">
                  Cancel
                </Button>
                <Button onClick={handleSubmit} className="sm:flex-1">
                  Create Charity Page
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateCharityPage;
