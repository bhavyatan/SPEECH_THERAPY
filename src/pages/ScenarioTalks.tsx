import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface Scenario {
  prompt: string;
  wordLimit: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

interface AnalysisResult {
  scenario: string; // Scenario prompt
  difficulty: string;
  word_limit: number;
  response: string; // AI-processed response
  feedback: string;
  timestamp?: string; // Optional timestamp
}

const sampleScenarios: Scenario[] = [
  {
    prompt: "You're at a networking event and need to introduce yourself and your profession in under a minute.",
    wordLimit: 100,
    difficulty: "Beginner",
  },
  {
    prompt: "Explain the plot of your favorite movie to someone who has never seen it before.",
    wordLimit: 150,
    difficulty: "Beginner",
  },
  {
    prompt: "You're in a job interview and the interviewer asks, 'Where do you see yourself in five years?'",
    wordLimit: 120,
    difficulty: "Intermediate",
  },
  {
    prompt: "Convince your friend to start eating healthy by explaining its long-term benefits.",
    wordLimit: 130,
    difficulty: "Intermediate",
  },
  {
    prompt: "You are a travel vlogger describing the beauty and attractions of your favorite city.",
    wordLimit: 200,
    difficulty: "Intermediate",
  },
  {
    prompt: "Debate why artificial intelligence is beneficial or harmful for society.",
    wordLimit: 180,
    difficulty: "Advanced",
  },
  {
    prompt: "You are pitching a new eco-friendly product to a panel of investors.",
    wordLimit: 160,
    difficulty: "Advanced",
  },
  {
    prompt: "Describe a historical event as if you were a news reporter covering it live.",
    wordLimit: 175,
    difficulty: "Advanced",
  },
  {
    prompt: "You are explaining the rules of your favorite sport to someone who has never played it before.",
    wordLimit: 140,
    difficulty: "Beginner",
  },
  {
    prompt: "Give a short motivational speech to inspire someone going through a tough time.",
    wordLimit: 150,
    difficulty: "Intermediate",
  },
];

export default function ScenarioTalks() {
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);
  const [userResponse, setUserResponse] = useState("");
  const [feedback, setFeedback] = useState<AnalysisResult | null>(null);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [listening, setListening] = useState(false);
  const recognition = useRef<any>(null);
  const { user } = useUser(); // ✅ Clerk hook to get the user
  const userId = user?.id; // ✅ Unique user ID
  const [userProgress, setUserProgress] = useState<AnalysisResult[]>([]);

  useEffect(() => {
    const fetchUserProgress = async () => {
      if (!userId) return;
      try {
        const response = await axios.get(`http://localhost:5000/api/progress/${userId}`);
        setUserProgress(response.data.progress || []);
      } catch (error) {
        console.error("Error fetching user progress:", error);
      }
    };

    fetchUserProgress();
  }, [userId]);

  const analyzeResponse = async () => {
    if (!currentScenario || !userResponse.trim() || !userId) return;

    try {
      setLoadingFeedback(true);
      setError(null);
      const response = await axios.post<AnalysisResult>(
        "http://localhost:5000/api/analyze",
        {
          user_id: userId, // ✅ Sending user_id to Flask
          scenario: currentScenario,
          response: userResponse.trim(),
        }
      );
      setFeedback(response.data);
    } catch (error) {
      setError("Failed to analyze response. Please try again.");
    } finally {
      setLoadingFeedback(false);
    }
  };

  const generateScenario = () => {
    const randomScenario = sampleScenarios[Math.floor(Math.random() * sampleScenarios.length)];
    setCurrentScenario(randomScenario);
    setUserResponse("");
    setFeedback(null);
  };

  const toggleRecording = () => {
    if (listening) {
      recognition.current.stop();
      setListening(false);
    } else {
      recognition.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.current.continuous = true;
      recognition.current.interimResults = false;
      recognition.current.onresult = (event: any) => {
        setUserResponse((prev) =>
          prev + " " + event.results[event.results.length - 1][0].transcript
        );
      };
      recognition.current.start();
      setListening(true);
    }
  };

  // Helper function to clean feedback text
  const cleanFeedbackText = (text: string) => {
    return text
      .replace(/\*\*/g, '')
      .replace(/```/g, '')
      .replace(/\[|\]/g, '')
      .split('\n')
      .filter(line => line.trim())
      .map(line => line.trim())
      .join('\n');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        backgroundImage: "url('/back.jpg')", // Image in the public folder
        backgroundSize: "cover", // Ensures the image covers the entire background
        backgroundPosition: "center", // Centers the image
      }}
    >
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-2xl w-full">
        <div className="flex justify-between mb-6">
          <Button onClick={generateScenario} variant="default">
            Generate Scenario
          </Button>
          <Button onClick={toggleRecording} variant="secondary">
            {listening ? "Stop Recording" : "Start Recording"}
          </Button>
        </div>

        {currentScenario && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold">{currentScenario.prompt}</h2>
            <p className="text-gray-600">Word Limit: {currentScenario.wordLimit}</p>
            <p className="text-gray-600">Difficulty: {currentScenario.difficulty}</p>
          </div>
        )}

        <Textarea
          value={userResponse}
          placeholder="Recording in progress..."
          className="w-full h-32 border p-2 rounded-lg"
          disabled
        />

        <div className="flex justify-end gap-4 mt-4">
          <Button onClick={analyzeResponse} disabled={!userResponse.trim() || loadingFeedback}>
            {loadingFeedback ? "Analyzing..." : "Get AI Feedback"}
          </Button>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {feedback && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-semibold">Analysis Result</h3>
            <p>
              <strong>Scenario:</strong> {feedback.scenario}
            </p>
            <p>
              <strong>Difficulty:</strong> {feedback.difficulty}
            </p>
            <p>
              <strong>Word Limit:</strong> {feedback.word_limit}
            </p>
            <p>
              <strong>Your Response:</strong> {feedback.response}
            </p>
            <div className="mt-2">
              <strong>Feedback:</strong>
              <div className="text-gray-700 mt-1">
                {cleanFeedbackText(feedback.feedback).split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-2">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}

        {userProgress.length > 0 && (
          <div className="mt-6 p-4 bg-green-100 rounded-lg">
            <h3 className="text-lg font-semibold">Your Progress</h3>
            {userProgress.slice().reverse().map((entry, index) => (
              <div key={index} className="mt-2 border-b pb-2">
                <p><strong>Scenario:</strong> {entry.scenario ? entry.scenario : "N/A"}</p>
                <p><strong>Difficulty:</strong> {entry.difficulty ? entry.difficulty : "N/A"}</p>
                <p><strong>Response:</strong> {entry.response ? entry.response : "N/A"}</p>
                <p><strong>Feedback:</strong></p>
                <div className="text-gray-700 mt-1">
                  {cleanFeedbackText(entry.feedback).split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-2">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}