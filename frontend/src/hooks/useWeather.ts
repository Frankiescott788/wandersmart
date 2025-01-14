import { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = 'YOUR_OPENWEATHER_API_KEY';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?q=Polokwane&appid=6fcaddaefdf79e82f2dd23bb74194ed6&units=metric';

interface WeatherData {
    temperature: number;
    description: string;
    icon: string;
}

const useWeather = () => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                setLoading(true);
                const response = await axios.get(BASE_URL);
                const data = response.data;
                setWeather({
                    temperature: data.main.temp,
                    description: data.weather[0].description,
                    icon: data.weather[0].icon,
                });
            } catch (err) {
                setError('Failed to fetch weather data');
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

    return { weather, loading, error };
};

export default useWeather;