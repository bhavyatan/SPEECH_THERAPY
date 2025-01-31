import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { Activity, Award, Calendar, Target } from "lucide-react";

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
  ];

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
  ];

  return (
    <div className="container py-8 space-y-8 animate-fade-in">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-primary">Progress Tracking</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Weekly Performance</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer
              className="h-[300px]"
              config={{
                score: {
                  theme: {
                    light: "hsl(var(--primary))",
                    dark: "hsl(var(--primary))",
                  },
                },
              }}
            >
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 100]} />
                <ChartTooltip />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-500" />
                  <span>Perfect Pronunciation - 3 exercises in a row</span>
                </li>
                <li className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-500" />
                  <span>Weekly Warrior - 7 day streak</span>
                </li>
                <li className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-500" />
                  <span>Exercise Expert - Completed 20 exercises</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Areas for Improvement</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span>Practice "R" sounds more frequently</span>
                </li>
                <li className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span>Work on tongue twisters</span>
                </li>
                <li className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span>Focus on sentence rhythm</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Progress;