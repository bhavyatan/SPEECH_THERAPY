
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts"
import { Activity, Award, Calendar, Target } from "lucide-react"

const Progress = () => {
  // Sample data - in a real app, this would come from your backend
  const progressData = [
    { date: "Mon", score: 75 },
    { date: "Tue", score: 82 },
    { date: "Wed", score: 78 },
    { date: "Thu", score: 85 },
    { date: "Fri", score: 90 },
    { date: "Sat", score: 88 },
    { date: "Sun", score: 92 },
  ]

  const stats = [
    {
      title: "Weekly Progress",
      value: "85%",
      description: "Average pronunciation score",
      icon: Activity,
    },
    {
      title: "Exercises Completed",
      value: "24",
      description: "Total exercises this week",
      icon: Target,
    },
    {
      title: "Practice Streak",
      value: "7 days",
      description: "Current streak",
      icon: Calendar,
    },
    {
      title: "Achievements",
      value: "5",
      description: "Badges earned",
      icon: Award,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-blue-600 text-white">
      <div className="container py-12 space-y-8 animate-fade-in">
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-bold text-white text-center">Progress Tracking</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-lg border-none shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white/80">{stat.title}</CardTitle>
                  <stat.icon className="h-4 w-4 text-white/60" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <p className="text-xs text-white/60">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="col-span-4 bg-white/10 backdrop-blur-lg border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">Weekly Performance</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ChartContainer
                className="h-[300px]"
                config={{
                  score: {
                    theme: {
                      light: "white",
                      dark: "white",
                    },
                  },
                }}
              >
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="date" stroke="rgba(255,255,255,0.6)" />
                  <YAxis domain={[0, 100]} stroke="rgba(255,255,255,0.6)" />
                  <ChartTooltip contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "none" }} />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="white"
                    strokeWidth={3}
                    dot={{ stroke: "white", strokeWidth: 2, fill: "rgba(255,255,255,0.5)" }}
                    activeDot={{ r: 8, fill: "white" }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/10 backdrop-blur-lg border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-white">Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <Award className="h-6 w-6 text-yellow-300" />
                    <span>Perfect Pronunciation - 3 exercises in a row</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Award className="h-6 w-6 text-yellow-300" />
                    <span>Weekly Warrior - 7 day streak</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Award className="h-6 w-6 text-yellow-300" />
                    <span>Exercise Expert - Completed 20 exercises</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-white">Areas for Improvement</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <Target className="h-6 w-6 text-blue-300" />
                    <span>Practice "R" sounds more frequently</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Target className="h-6 w-6 text-blue-300" />
                    <span>Work on tongue twisters</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Target className="h-6 w-6 text-blue-300" />
                    <span>Focus on sentence rhythm</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Progress

