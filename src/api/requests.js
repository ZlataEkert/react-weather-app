import axios from "axios";

export const fetchWeatherData = async (location) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`;
  const data = await axios.get(url);
  return data;
};
