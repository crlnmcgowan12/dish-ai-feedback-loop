
import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { HistoricalRating } from '../types';

interface HistoricalRatingChartProps {
  historicalRatings: HistoricalRating[];
}

const HistoricalRatingChart: React.FC<HistoricalRatingChartProps> = ({ historicalRatings }) => {
  // Format the date for display
  const formatData = historicalRatings.map(rating => ({
    ...rating,
    formattedDate: new Date(rating.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  }));

  return (
    <div className="w-full h-64 mt-4">
      <h3 className="text-lg font-medium mb-2">Rating History (Last 7 Days)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={formatData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="formattedDate" />
          <YAxis domain={[0, 5]} />
          <Tooltip 
            formatter={(value) => [`${value} stars`, 'Rating']}
            labelFormatter={(value) => `Date: ${value}`}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="averageRating"
            name="Average Rating"
            stroke="#8b5cf6"
            activeDot={{ r: 8 }}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HistoricalRatingChart;
