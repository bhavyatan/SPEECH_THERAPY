import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquareText } from "lucide-react";


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

const sampleScenarios: Scenario[] = [
  {
    prompt: "You're giving a 2-minute elevator pitch about your startup to a potential investor.",
    wordLimit: 150,
    difficulty: "Intermediate",
  },
  {
    prompt: "You're apologizing to a customer for a service failure. Explain the issue and compensation.",
    wordLimit: 100,
    difficulty: "Beginner",
  },
  {
    prompt: "Present a technical concept like neural networks to a non-technical audience in 3 minutes.",
    wordLimit: 200,
    difficulty: "Advanced",
  },
  {
    prompt: "Negotiate a salary increase with your manager, highlighting your achievements.",
    wordLimit: 120,
    difficulty: "Intermediate",
  },
];

export default function ScenarioTalks() {
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);
  const [userResponse, setUserResponse] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [listening, setListening] = useState(false);
  const recognition = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognition.current = new SpeechRecognition();
        recognition.current.continuous = true;
        recognition.current.interimResults = true;
        recognition.current.lang = "en-US";

        recognition.current.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0].transcript)
            .join("");
          setUserResponse(transcript);
        };

        recognition.current.onerror = () => setListening(false);
        recognition.current.onend = () => setListening(false);
      }
    }
    return () => recognition.current?.stop();
  }, []);

  const generateRandomScenario = () => {
    const randomIndex = Math.floor(Math.random() * sampleScenarios.length);
    setCurrentScenario(sampleScenarios[randomIndex]);
    setUserResponse("");
    setFeedback(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-purple-600 text-white p-6 flex flex-col items-center">
      <h1 className="text-5xl font-bold text-center mb-8 flex items-center gap-3">
        <MessageSquareText className="h-12 w-12 text-white" />
        ScenarioTalks
      </h1>

      <div className="flex gap-6 mb-8">
        <Button onClick={generateRandomScenario} className="bg-blue-300 hover:bg-blue-400 text-white text-lg px-6 py-3">
          {currentScenario ? "Generate New Scenario" : "Start Practice"}
        </Button>
        <Button 
          onClick={() => {
            if (!recognition.current) return;
            if (listening) {
              recognition.current.stop();
              setListening(false);
            } else {
              recognition.current.start();
              setListening(true);
            }
          }}
          className={listening ? "bg-red-500 hover:bg-red-600 text-white text-lg px-6 py-3" : "bg-gray-300 hover:bg-gray-400 text-black text-lg px-6 py-3"}
        >
          {listening ? "⏹ Stop Recording" : "🎤 Start Recording"}
        </Button>
      </div>

      {currentScenario && (
        <Card className="w-full max-w-2xl bg-white text-black shadow-lg p-6 mb-8">
          <CardContent>
            <h2 className="text-xl font-semibold">Scenario Brief:</h2>
            <p className="mt-4 text-gray-700 text-lg">{currentScenario.prompt}</p>
            <div className="text-md text-gray-500 mt-4">Difficulty: {currentScenario.difficulty} | Word Limit: {currentScenario.wordLimit}</div>
          </CardContent>
        </Card>
      )}

      <Textarea
        placeholder={currentScenario ? "Start speaking or type your response..." : "Generate a scenario first"}
        value={userResponse}
        onChange={(e) => setUserResponse(e.target.value)}
        className="w-full max-w-2xl p-4 rounded-lg text-black bg-white shadow-lg min-h-[150px] text-lg"
        disabled={!currentScenario}
      />

      {currentScenario && (
        <div className="flex justify-end w-full max-w-2xl mt-6">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white text-lg px-6 py-3" disabled={!userResponse.trim()}>
            Analyze Response
          </Button>
        </div>
      )}

      {feedback && (
        <Card className="w-full max-w-2xl bg-white text-black shadow-lg p-6 mt-8">
          <CardContent>
            <h2 className="text-xl font-semibold">Analysis Results:</h2>
            <pre className="whitespace-pre-wrap mt-4 text-gray-700 text-lg">{feedback}</pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}