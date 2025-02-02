import React, { useState, useEffect, useRef } from "react";  
import { Button } from "@/components/ui/button";  
import { useNavigate } from "react-router-dom";  
import { Brain } from "lucide-react";

// Declare global types for SpeechRecognition  
declare global {  
  interface Window {  
    SpeechRecognition: any;  
    webkitSpeechRecognition: any;  
  }  
}  

// Medium difficulty words  
const mediumWords = [  
  "Mountain", "Forest", "Castle", "Notebook", "Balloon", "Bicycle", "Planet",  
  "Lighthouse", "Horizon", "Butterfly" ,"Adventure", "Beautiful", "Celebrate", "Discovery", "Elephant", 
  "Fantastic", "Generous", "Happiness", "Important", "Journey",
  "Knowledge", "Language", "Memories", "Nutrition", "Original",
  "Peaceful", "Question", "Remember", "Surprise", "Tomorrow",
  "Universe", "Vacation", "Wonderful", "Yourself", "Afternoon",
];  

// Difficult words  
const difficultWords = [  
  "Ephemeral","Mellifluous","Euphoria","Ineffable","Oscillate","Nocturnal","Garrulous","Vestigial", "Pernicious","Wanderlust","Vernacular","Loquacious","Incandescent","Sublime","Axiom","Effervescent",
  "Quiddity","Nebulous","Limerence","Fandangle","Bombastic"     
];  

// Get 5 words: 3 difficult and 2 medium  
const getRandomWords = () => {  
  const randomMediumWords = [];  
  const randomDifficultWords = [];  

  // Pick 2 random medium words  
  for (let i = 0; i < 2; i++) {  
    const randomMediumWord = mediumWords[Math.floor(Math.random() * mediumWords.length)];  
    randomMediumWords.push(randomMediumWord);  
  }  

  // Pick 3 random difficult words  
  for (let i = 0; i < 3; i++) {  
    const randomDifficultWord = difficultWords[Math.floor(Math.random() * difficultWords.length)];  
    randomDifficultWords.push(randomDifficultWord);  
  }  

  return [...randomDifficultWords, ...randomMediumWords]; // Return 5 words  
};  

const WordRepetitionGame = () => {  
  const [targetWords, setTargetWords] = useState<string[]>([]);  
  const [feedback, setFeedback] = useState<string | null>(null);  
  const [isRecording, setIsRecording] = useState(false);  
  const [isMemorizing, setIsMemorizing] = useState(true);  
  const recognitionRef = useRef<any>(null);  
  const navigate = useNavigate();  

  // Initialize SpeechRecognition  
  useEffect(() => {  
    const SpeechRecognition =  
      window.SpeechRecognition || window.webkitSpeechRecognition;  

    if (!SpeechRecognition) {  
      alert("Speech Recognition is not supported in this browser.");  
      return;  
    }  

    recognitionRef.current = new SpeechRecognition();  
    recognitionRef.current.continuous = false;  
    recognitionRef.current.interimResults = false;  
    recognitionRef.current.lang = "en-US";  

    recognitionRef.current.onresult = (event: any) => {  
      const speechResult = event.results[0][0].transcript;  
      console.log("User said:", speechResult);  

      const userWords = speechResult.split(" ");  
      if (userWords.length === targetWords.length && userWords.every((word, index) => word.toLowerCase() === targetWords[index].toLowerCase())) {  
        setFeedback("Correct! You repeated all the words correctly.");  
      } else {  
        setFeedback(`Oops! You said: "${speechResult}". Try again.`);  
      }  
    };  

    recognitionRef.current.onerror = (event: any) => {  
      console.error("Speech recognition error:", event.error);  
      setFeedback("Sorry, there was an error with speech recognition.");  
    };  

    recognitionRef.current.onend = () => {  
      console.log("Speech recognition ended.");  
    };  
  }, [targetWords]);  

  const startRecording = () => {  
    if (!isRecording) {  
      recognitionRef.current?.start();  
      setIsRecording(true);  
      setIsMemorizing(false);  
    }  
  };  

  const stopRecording = () => {  
    if (isRecording) {  
      recognitionRef.current?.stop();  
      setIsRecording(false);  
    }  
  };  

  const startNewRound = () => {  
    const randomWords = getRandomWords();  
    setTargetWords(randomWords);  
    setFeedback(null);  
    setIsRecording(false);  
    setIsMemorizing(true);  

    // Hide words after 6 seconds  
    setTimeout(() => {  
      setIsMemorizing(false);  
    }, 6000);  
  };  

  return (  
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-500 to-purple-700 text-white px-4">  
      <div className="flex items-center gap-4 mb-4">
        <Brain size={48} className="text-white" />
        <h1 className="text-5xl font-bold">Test Your Memory</h1>
      </div>
      <div className="md:w-3/4 lg:w-2/4 space-y-4">  
        {isMemorizing && targetWords.length > 0 && (  
          <div className="p-6 rounded-lg bg-white text-gray-800 shadow-lg text-center">  
            <h2 className="text-3xl font-semibold mb-2">  
              Memorize these words:  
            </h2>  
            <h3 className="text-lg">{targetWords.join(", ")}</h3>  
            <p className="text-sm text-gray-600 mt-2">After memorizing, click to start speaking.</p>  
          </div>  
        )}  

        <div className="space-y-4">  
          {!isRecording && targetWords.length > 0 && (  
            <Button onClick={startRecording} className="w-full px-6 py-3 bg-purple-600 text-white hover:bg-purple-500 focus:ring-2 focus:ring-purple-400 rounded-lg">  
              Start Practice  
            </Button>  
          )}  

          {isRecording && (  
            <Button onClick={stopRecording} variant="destructive" className="w-full px-6 py-3 bg-red-600 text-white hover:bg-red-500 focus:ring-2 focus:ring-red-400 rounded-lg">  
              Stop Recording  
            </Button>  
          )}  

          {feedback && (  
            <div className="mt-4 p-4 border-2 border-purple-300 rounded-lg bg-purple-100">  
              <h3 className="font-semibold text-purple-600">Feedback</h3>  
              <p className="text-purple-500">{feedback}</p>  
            </div>  
          )}  

          <Button onClick={startNewRound} className="w-full px-6 py-3 bg-purple-600 text-white hover:bg-purple-500 focus:ring-2 focus:ring-purple-400 rounded-lg mt-4">  
            Start New Round  
          </Button>  
        </div>  
      </div>  
    </div>  
  );  
};  

export default WordRepetitionGame;