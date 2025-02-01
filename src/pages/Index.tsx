import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Mic2, Activity, Trophy } from "lucide-react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { motion } from "framer-motion"; 

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-500 to-indigo-800 text-white">
      {/* Background Animated Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-300/20 to-white opacity-50"></div>

      {/* If user is signed out, show login button */}
      <SignedOut>
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.8 }}
          className="relative flex flex-col items-center justify-center h-screen text-center"
        >
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl mb-6 animate-pulse">
            Welcome to EchoFlow💁
          </h1>
          <p className="mt-4 text-lg leading-8 max-w-2xl">
            Your AI-powered speech therapy companion. Sign in to start practicing!
          </p>
          <SignInButton mode="modal">
            <Button 
              className="mt-6 px-6 py-3 text-lg font-semibold bg-white text-indigo-700 rounded-lg shadow-lg transition duration-300 hover:bg-indigo-600 hover:text-white transform hover:scale-105"
            >
              Sign In
            </Button>
          </SignInButton>
        </motion.div>
      </SignedOut>

      {/* Show main content only when the user is signed in */}
      <SignedIn>
        <div className="relative container px-4 py-16 mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl mb-6">
              Speak Confidently
            </h1>
            <p className="mt-6 text-lg leading-8 max-w-2xl mx-auto text-gray-200">
              Your AI-powered speech therapy companion. Practice pronunciation, track progress,
              and achieve your speech goals with personalized exercises.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                onClick={() => navigate("/exercises")}
                className="px-6 py-3 text-lg bg-white text-indigo-700 rounded-lg shadow-lg transition duration-300 hover:bg-indigo-600 hover:text-white transform hover:scale-105"
              >
                Start Practice
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                onClick={() => navigate("/progress")}
                variant="outline"
                className="border-white bg-white text-indigo-700 hover:bg-indigo-800 hover:text-white px-6 py-3 text-lg rounded-lg shadow-lg transform hover:scale-105"
              >
                View Progress
                <Activity className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3"
          >
            <Card className="p-6 hover:shadow-2xl transition-shadow cursor-pointer bg-white bg-opacity-10 rounded-lg border border-white/20 transform hover:scale-105" onClick={() => navigate("/exercises")}>
              <Mic2 className="h-12 w-12 text-white mb-4" />
              <h3 className="text-xl font-semibold mb-2">Voice Analysis</h3>
              <p className="text-gray-200">
                Get instant feedback on your pronunciation with AI-powered analysis.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-2xl transition-shadow cursor-pointer bg-white bg-opacity-10 rounded-lg border border-white/20 transform hover:scale-105" onClick={() => navigate("/progress")}>
              <Activity className="h-12 w-12 text-white mb-4" />
              <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
              <p className="text-gray-200">
                Monitor your improvement over time with detailed statistics and visual charts.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-2xl transition-shadow cursor-pointer bg-white bg-opacity-10 rounded-lg border border-white/20 transform hover:scale-105" onClick={() => navigate("/exercises")}>
              <Trophy className="h-12 w-12 text-white mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fun Exercises</h3>
              <p className="text-gray-200">
                Practice with engaging, gamified exercises designed for your needs.
              </p>
            </Card>
          </motion.div>
        </div>
      </SignedIn>
    </div>
  );
};

export default Index;
