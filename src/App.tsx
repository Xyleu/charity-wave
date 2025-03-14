
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Charities from "./pages/Charities";
import Leaderboard from "./pages/Leaderboard";
import Dashboard from "./pages/Dashboard";
import CharityPages from "./pages/CharityPages";
import CharityPageDetail from "./pages/CharityPageDetail";
import CreateCharityPage from "./pages/CreateCharityPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="min-h-screen w-full">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/charities" element={<Charities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/charity-pages" element={<CharityPages />} />
            <Route path="/charity-page/:id" element={<CharityPageDetail />} />
            <Route path="/create-charity" element={<CreateCharityPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
