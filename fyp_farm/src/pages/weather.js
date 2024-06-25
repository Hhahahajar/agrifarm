/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherForecast = () => {
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = 'VKKuuusDYnC02idiM3TUXQNvtY3Xwf25'; // Your API Key
  const LOCATION = 'pulau indah'; // Replace with the desired location (latitude, longitude)

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get('https://api.tomorrow.io/v4/weather/forecast', {
          params: {
            location: LOCATION,
            apikey: API_KEY,
          },
        });
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather forecast data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  const renderWeatherData = () => {
    if (!weatherData) return null;

    return weatherData.timelines.hourly.map((data, index) => (
      <tr key={index}>
        <td className="border px-4 py-2">{new Date(data.time).toLocaleTimeString()}</td>
        <td className="border px-4 py-2">{data.values.temperature}°C</td>
        <td className="border px-4 py-2">{data.values.humidity}%</td>
        <td className="border px-4 py-2">{data.values.windSpeed} m/s</td>
        <td className="border px-4 py-2">{data.values.precipitationProbability}%</td>
        <td className="border px-4 py-2">{data.values.uvIndex}</td>
        <td className="border px-4 py-2">{data.values.visibility} km</td>
      </tr>
    ));
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <h1 className="text-2xl font-bold mb-4">Ramalan cuaca</h1>
      {weatherData ? (
        <table className="min-w-full bg-white border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-200 p-2">Masa</th>
              <th className="border border-gray-200 p-2">Suhu (°C)</th>
              <th className="border border-gray-200 p-2">Kelembapan (%)</th>
              <th className="border border-gray-200 p-2">Kelanjuan Angin (m/s)</th>
              <th className="border border-gray-200 p-2">Ramalan Curahan (%)</th>
              <th className="border border-gray-200 p-2">Indeks UV</th>
              <th className="border border-gray-200 p-2">Darjah Penglihatan (km)</th>
            </tr>
          </thead>
          <tbody>{renderWeatherData()}</tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WeatherForecast;
