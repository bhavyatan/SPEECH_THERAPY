import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Mic, StopCircle, Play, Volume2, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Exercise {
  id: number;
  phrase: string;
  difficulty: string;
  completed: boolean;
  attempts: number;
}

const Exercises = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [exercises] = useState<Exercise[]>([
    {
      id: 1,
      phrase: "Peter Piper picked a peck of pickled peppers",
      difficulty: "Medium",
      completed: false,
      attempts: 0,
    },
    {
      id: 2,
      phrase: "She sells seashells by the seashore",
      difficulty: "Easy",
      completed: false,
      attempts: 0,
    },
    {
      id: 3,
      phrase: "How much wood would a woodchuck chuck",
      difficulty: "Hard",
      completed: false,
      attempts: 0,
    },
  ]);
  const [overallProgress, setOverallProgress] = useState(0);
  const [lastScore, setLastScore] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Calculate overall progress based on completed exercises
    const completed = exercises.filter((ex) => ex.completed).length;
    const progress = (completed / exercises.length) * 100;
    setOverallProgress(progress);
  }, [exercises]);

  const startRecording = async (exercise: Exercise) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
        // Simulate AI analysis with a random score
        const score = Math.floor(Math.random() * 40) + 60; // Score between 60-100
        setLastScore(score);
        if (score >= 80) {
          exercise.completed = true;
        }
        exercise.attempts += 1;
      };

      setMediaRecorder(recorder);
      setCurrentExercise(exercise);
      recorder.start();
      setIsRecording(true);
      
      toast({
        title: "Recording started",
        description: "Speak clearly into your microphone",
      });
    } catch (err) {
      console.error("Error accessing microphone:", err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not access microphone. Please check permissions.",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      toast({
        title: "Recording complete",
        description: "Your pronunciation has been analyzed",
      });
    }
  };

  const playAudio = () => {
    if (audioRef.current && audioURL) {
      audioRef.current.play();
    }
  };

  return (
    <div className="container py-8 space-y-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-primary">Speech Exercises</h1>
        
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-6 w-6 text-primary" />
              Overall Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Completion Rate</span>
                <span className="text-sm text-muted-foreground">
                  {Math.round(overallProgress)}%
                </span>
              </div>
              <Progress value={overallProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {lastScore && currentExercise && (
          <Alert className={lastScore >= 80 ? "border-green-500" : "border-orange-500"}>
            <AlertTitle>Exercise Result</AlertTitle>
            <AlertDescription>
              Your pronunciation score for "{currentExercise.phrase}" was {lastScore}%.
              {lastScore >= 80 ? " Great job!" : " Keep practicing!"}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {exercises.map((exercise) => (
            <Card key={exercise.id} className="relative">
              <CardHeader>
                <CardTitle className="text-xl">Exercise {exercise.id}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg font-medium">{exercise.phrase}</p>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Difficulty: {exercise.difficulty}</span>
                  <span>Attempts: {exercise.attempts}</span>
                </div>
                
                <div className="flex justify-between items-center gap-2">
                  {!isRecording ? (
                    <Button
                      onClick={() => startRecording(exercise)}
                      className="w-full"
                      disabled={isRecording}
                    >
                      <Mic className="mr-2 h-4 w-4" />
                      Start Recording
                    </Button>
                  ) : currentExercise?.id === exercise.id && (
                    <Button
                      onClick={stopRecording}
                      variant="destructive"
                      className="w-full"
                    >
                      <StopCircle className="mr-2 h-4 w-4" />
                      Stop Recording
                    </Button>
                  )}
                  
                  {audioURL && currentExercise?.id === exercise.id && (
                    <Button
                      onClick={playAudio}
                      variant="outline"
                      className="flex-shrink-0"
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                {exercise.completed && (
                  <div className="absolute top-4 right-4">
                    <Award className="h-6 w-6 text-green-500" />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <audio ref={audioRef} src={audioURL || ''} className="hidden" />
    </div>
  );
};

export default Exercises;