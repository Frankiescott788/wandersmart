import { useState, useEffect } from "react";
import axios from "axios";



interface WeatherData {
  temperature: number;
  description: string;
  icon: string;
}

export interface HourlyData {
  time: string;
  temperature: number;
  weatherCode: number;
  emoji: string;
}

export interface DailyData {
  date: string;
  maxTemperature: number;
  minTemperature: number;
  weatherCode: number;
  emoji: string;
}

const weatherCodeToEmoji: { [key: number]: string } = {
  0: "☀️", // Clear sky
  1: "🌤️", // Mainly clear
  2: "⛅", // Partly cloudy
  3: "☁️", // Overcast
  45: "🌫️", // Fog
  48: "🌁", // Depositing rime fog
  51: "🌦️", // Light drizzle
  53: "🌧️", // Moderate drizzle
  55: "🌧️", // Dense drizzle
  56: "❄️", // Freezing drizzle: Light
  57: "❄️", // Freezing drizzle: Dense
  61: "🌧️", // Slight rain
  63: "🌧️", // Moderate rain
  65: "🌧️", // Heavy rain
  66: "❄️", // Freezing rain: Light
  67: "❄️", // Freezing rain: Heavy
  71: "🌨️", // Slight snow fall
  73: "🌨️", // Moderate snow fall
  75: "❄️", // Heavy snow fall
  77: "🌨️", // Snow grains
  80: "🌧️", // Rain showers: Slight
  81: "🌧️", // Rain showers: Moderate or heavy
  82: "🌧️", // Rain showers: Violent
  85: "❄️", // Snow showers: Slight
  86: "❄️", // Snow showers: Heavy
  95: "⛈️", // Thunderstorm: Slight or moderate
  96: "⛈️", // Thunderstorm with hail: Slight
  99: "⛈️", // Thunderstorm with hail: Heavy
};

interface Coordinates {
  lat: number;
  lon: number;
}

const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [hourly, setHourly] = useState<HourlyData[]>([]);
  const [daily, setDaily] = useState<DailyData[]>([]); // State for 7-day forecast
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

  const getCurrentWeather = async (lati : number, longi : number) => {
    try {
        setLoading(true);
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&appid=6fcaddaefdf79e82f2dd23bb74194ed6&units=metric`
        );
        const data = response.data;
        setWeather({
          temperature: data.main.temp,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
        });
        setCoordinates(data.coord);
      } catch (err) {
        setError("Failed to fetch weather data");
      } finally {
        setLoading(false);
      }
  };

  const fetchWeather = async (id: string) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${id}&appid=6fcaddaefdf79e82f2dd23bb74194ed6&units=metric`
      );
      const data = response.data;
      setWeather({
        temperature: data.main.temp,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      });
      setCoordinates(data.coord);
    } catch (err) {
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  // Only make the request if coordinates are available
  const fetchHourly = async () => {
    if (!coordinates) return; // Don't fetch if coordinates are not available

    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.lat}&longitude=${coordinates.lon}&hourly=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
      );
      const data = response.data;

      const mappedHourly = data.hourly.time.map(
        (time: string, index: number) => ({
          time,
          temperature: data.hourly.temperature_2m[index],
          weatherCode: data.hourly.weathercode[index],
          emoji: weatherCodeToEmoji[data.hourly.weathercode[index]] || "❓", // Use emoji mapping or fallback
        })
      );

      setHourly(mappedHourly);
    } catch (err) {
      setError("Failed to fetch hourly data");
    } finally {
      setLoading(false);
    }
  };

  const fetchDaily = async () => {
    if (!coordinates) return; // Don't fetch if coordinates are not available

    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.lat}&longitude=${coordinates.lon}&hourly=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
      );
      const data = response.data;

      const mappedDaily = data.daily.time.map(
        (time: string, index: number) => ({
          date: time,
          maxTemperature: data.daily.temperature_2m_max[index],
          minTemperature: data.daily.temperature_2m_min[index],
          weatherCode: data.daily.weathercode[index],
          emoji: weatherCodeToEmoji[data.daily.weathercode[index]] || "❓", // Use emoji mapping or fallback
        })
      );

      setDaily(mappedDaily);
    } catch (err) {
      setError("Failed to fetch daily data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (coordinates) {
      fetchHourly();
      fetchDaily();
    }
  }, [coordinates]); 

  return {
    weather,
    loading,
    error,
    hourly,
    daily,
    fetchDaily,
    fetchHourly,
    fetchWeather,
    coordinates,
    getCurrentWeather
  };
};

export default useWeather;
