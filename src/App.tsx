import { SignedIn, SignedOut, SignInButton, UserButton, SignIn, SignUp } from "@clerk/clerk-react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Tips from "./pages/Tips"; 
import WordRepition from "./pages/Wordrepition"; 
import Exercises from "./pages/Exercises";
import ScenarioTalks from "./pages/ScenarioTalks";
import NotFound from "./pages/NotFound";
import Practices from "./pages/Practices";
import VoiceAssistant from "./pages/VoiceAssistant";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <header className="absolute top-4 right-4 z-10">
          <SignedOut>
          </SignedOut>
          <SignedIn>
            <UserButton  />
          </SignedIn>
        </header>
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Index />} />
          <Route path="/tips" element={<Tips />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/ScenarioTalks" element={<ScenarioTalks />} />
          <Route path="/voice-assistant" element={<VoiceAssistant />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/wordrepition" element={<WordRepition />} />
          <Route path="/practices" element={<Practices />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
