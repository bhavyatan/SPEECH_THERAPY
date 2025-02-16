import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const ExerciseProgressChart = ({ userId }) => {
    const [exerciseData, setExerciseData] = useState([]);
    const [timeFrame, setTimeFrame] = useState("daily"); // Dropdown selection

    useEffect(() => {
        fetch(`/api/exercise/progress/${userId}?time_frame=${timeFrame}`)
            .then(res => res.json())
            .then(data => setExerciseData(data))
            .catch(err => console.error(err));
    }, [userId, timeFrame]);

    return (
        <div>
            <select onChange={(e) => setTimeFrame(e.target.value)} value={timeFrame}>
                <option value="daily">Daily</option>
                <option value="monthly">Monthly</option>
            </select>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={exerciseData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="count" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ExerciseProgressChart;
