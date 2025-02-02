import { Card, CardContent } from "@/components/ui/card";
import { FaLungs, FaMicrophone, FaVolumeUp, FaHeadphones, FaPalette } from "react-icons/fa";

const SpeechTherapyTips = () => {
  const tips = [
    {
      title: "Breathing Exercises",
      icon: <FaLungs size={30} className="text-blue-500" />,
      description:
        "Practice deep breathing techniques to improve airflow and speech clarity. Try inhaling deeply through your nose, holding for 3 seconds, and exhaling slowly.",
    },
    {
      title: "Articulation Tips",
      icon: <FaMicrophone size={30} className="text-green-500" />,
      description:
        "Focus on pronouncing each syllable clearly. Slow down your speech and use a mirror to observe mouth movements.",
    },
    {
      title: "Vocal Exercises",
      icon: <FaVolumeUp size={30} className="text-purple-500" />,
      description:
        "Humming, lip trills, and tongue twisters can help strengthen vocal muscles and enhance speech fluency.",
    },
    {
      title: "Listening Skills",
      icon: <FaHeadphones size={30} className="text-orange-500" />,
      description:
        "Practice listening carefully to various speech patterns and try to mimic them. This improves both comprehension and articulation.",
    },
    {
      title: "Mouth Muscle Exercises",
      icon: <FaPalette size={30} className="text-red-500" />,
      description:
        "Exercises like puffing out your cheeks or stretching your lips can strengthen your mouth muscles and aid in better articulation.",
    },
    {
      title: "Pacing and Pauses",
      icon: <FaMicrophone size={30} className="text-yellow-500" />,
      description:
        "Practice pausing between words or sentences. It helps with breath control and improves the overall flow of speech.",
    },
    
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-500 p-8 text-white">
      <h1 className="text-4xl font-bold text-center mb-6">Speech Therapy Tips</h1>
      <p className="text-center mb-8 text-lg">
        Improve your speech with these expert-recommended techniques.
      </p>
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {tips.map((tip, index) => (
          <Card key={index} className="bg-white text-gray-800 p-6 rounded-2xl shadow-lg">
            <CardContent className="flex flex-col items-center text-center">
              {tip.icon}
              <h2 className="text-xl font-semibold mt-4">{tip.title}</h2>
              <p className="mt-2 text-sm">{tip.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SpeechTherapyTips;