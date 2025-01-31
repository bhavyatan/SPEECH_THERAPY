import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Mic2, Activity, Trophy } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <div className="container px-4 py-16 mx-auto">
        <div className="text-center animate-fadeIn">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-primary mb-6">
            Speak Confidently
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            Your AI-powered speech therapy companion. Practice pronunciation, track progress,
            and achieve your speech goals with personalized exercises.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              onClick={() => navigate("/exercises")}
              className="bg-primary hover:bg-primary/90"
            >
              Start Practice
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              onClick={() => navigate("/progress")}
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
            >
              View Progress
              <Activity className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Mic2 className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Voice Analysis</h3>
            <p className="text-gray-600">
              Get instant feedback on your pronunciation with AI-powered analysis.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Activity className="h-12 w-12 text-secondary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
            <p className="text-gray-600">
              Monitor your improvement over time with detailed progress tracking.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Trophy className="h-12 w-12 text-accent mb-4" />
            <h3 className="text-xl font-semibold mb-2">Fun Exercises</h3>
            <p className="text-gray-600">
              Practice with engaging, gamified exercises designed for your needs.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;