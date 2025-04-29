import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush
} from 'recharts';
import { API } from '../../../config/configData';

const RatesChart = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRetailRate = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API}/dailyrate/retailrates/charts`);
        setData(response.data);
      } catch (error) {
        setError('Failed to fetch rate data');
        console.error('Error fetching retail rates:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRetailRate();
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 shadow-lg rounded">
          <p className="font-bold text-gray-700">{`Date: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const ChartComponent = ({ dataKey, color, name }) => (
    <div className="w-full h-[600px] bg-white p-4 rounded-lg shadow mb-6">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-600">Loading chart data...</p>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-red-600">{error}</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 50,
              bottom: 60
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis
              dataKey="date"
              angle={-45}
              textAnchor="end"
              height={60}
              tick={{ fill: '#666' }}
            />
            <YAxis
              domain={['auto', 'auto']}
              tickFormatter={(value) => value.toLocaleString()}
              tick={{ fill: '#666' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              height={36}
            />
            <Brush
              dataKey="date"
              height={30}
              stroke="#8884d8"
              startIndex={Math.max(0, data.length - 30)}
            />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              fill={color}
              fillOpacity={0.2}
              name={name}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );

  return (
    <div className="space-y-10">
      <ChartComponent dataKey="goldRate" color="#FFD700" name="Gold Rate" />
      <ChartComponent dataKey="silverRate" color="#C0C0C0" name="Silver Rate" />
    </div>
  );
};

export default RatesChart;