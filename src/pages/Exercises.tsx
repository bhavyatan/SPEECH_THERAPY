import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Mic, StopCircle, Award, Mic2 } from "lucide-react"; // Added Mic2 for the heading icon

interface Exercise {
  id: number;
  phrase: string;
  difficulty: string;
  completed: boolean;
  attempts: number;
  audioURL: string | null;
}

const allTongueTwisters = [
  "Peter Piper picked a peck of pickled peppers",
  "She sells seashells by the seashore",
  "How much wood would a woodchuck chuck",
  "I scream, you scream, we all scream for ice cream",
  "Fuzzy Wuzzy was a bear, Fuzzy Wuzzy had no hair",
  "Six slippery snails slid slowly seaward",
  "Betty bought some butter, but the butter was bitter",
  "A proper copper coffee pot",
  "Toy boat, toy boat, toy boat",
  "Unique New York, Unique New York",
  "Red lorry, yellow lorry, red lorry, yellow lorry",
  "Thin sticks, thick bricks",
  "Crisp crusts crackle and crunch",
  "Lesser leather never weathered wetter weather better",
  "Three free throws",
  "I saw Susie sitting in a shoe shine shop",
  "Six slippery snails slid slowly seaward",
  "Which wristwatches are Swiss wristwatches?",
  "The thirty-three thieves thought that they thrilled the throne throughout Thursday",
  "If two witches would watch two watches, which witch would watch which watch?",
  "Fred fed Ted bread, and Ted fed Fred bread"
];

const getRandomExercises = (count = 5) => {
  const shuffled = [...allTongueTwisters].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map((phrase, index) => ({
    id: index + 1,
    phrase,
    difficulty: ["Easy", "Medium", "Hard"][Math.floor(Math.random() * 3)],
    completed: false,
    attempts: 0,
    audioURL: null,
  }));
};

const Exercises = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [currentExerciseId, setCurrentExerciseId] = useState<number | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    setExercises(getRandomExercises(5));
  }, []);

  useEffect(() => {
    const completed = exercises.filter((ex) => ex.completed).length;
    setOverallProgress((completed / exercises.length) * 100);
  }, [exercises]);

  const startRecording = async (exerciseId: number) => {
    if (isRecording) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);

        setExercises((prev) =>
          prev.map((ex) => (ex.id === exerciseId ? { ...ex, audioURL: url } : ex))
        );

        stream.getTracks().forEach((track) => track.stop());
      };

      setMediaRecorder(recorder);
      setCurrentExerciseId(exerciseId);
      recorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-900 to-blue-500">
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="container py-8 space-y-8 relative z-10">

        {/* Main Heading with Microphone Icon */}
        <h1 className="text-5xl font-extrabold text-white text-center tracking-wide flex items-center justify-center gap-3">
          <Mic2 className="h-10 w-10 text-white" /> {/* Microphone icon */}
          Exercises
        </h1>

        <Card className="w-full p-6 bg-white shadow-xl rounded-xl hover:shadow-2xl transition-all">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-primary">
              <Award className="h-6 w-6 text-primary" />
              Overall Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={overallProgress} className="h-3 rounded-md bg-gradient-to-r from-blue-500 to-indigo-600" />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {exercises.map((exercise) => (
            <Card key={exercise.id} className="p-6 bg-white shadow-lg rounded-xl hover:shadow-2xl transition-all">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-primary">{exercise.phrase}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Difficulty: {exercise.difficulty}</p>

                <div className="flex flex-col items-center space-y-4">
                  {!isRecording || currentExerciseId !== exercise.id ? (
                    <Button
                      onClick={() => startRecording(exercise.id)}
                      disabled={isRecording}
                      className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 transition-colors"
                    >
                      <Mic className="mr-2 h-5 w-5" />
                      Start Recording
                    </Button>
                  ) : (
                    <Button
                      onClick={stopRecording}
                      variant="destructive"
                      className="w-full px-6 py-3 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700 transition-colors"
                    >
                      <StopCircle className="mr-2 h-5 w-5" />
                      Stop Recording
                    </Button>
                  )}

                  {exercise.audioURL && (
                    <div className="w-full flex justify-center">
                      <audio controls className="w-full bg-gray-100 rounded-md shadow-sm">
                        <source src={exercise.audioURL} type="audio/webm" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  )}

                  {exercise.completed && (
                    <div className="text-green-600 flex items-center space-x-2">
                      <Award className="h-6 w-6" />
                      <span>Completed!</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Exercises;