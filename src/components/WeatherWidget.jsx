import { useEffect, useState } from "react";

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          "https://api.openweathermap.org/data/2.5/weather?q=Surabaya&units=metric&appid=650309fbb5489c4e3f29b1c5c642482d",
        );

        const data = await response.json();

        console.log(data);

        if (data.main) {
          setWeather(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  // LOADING / ERROR STATE
  if (loading || !weather || !weather.main) {
    return (
      <div className="mt-5 rounded-3xl bg-green-600 text-white p-5 shadow-lg">
        <p className="opacity-80 text-sm">Weather service unavailable 🌦️</p>

        <h2 className="text-3xl font-bold mt-2">--°C</h2>

        <p className="text-sm mt-1 opacity-80">Waiting for API activation...</p>
      </div>
    );
  }

  // SUCCESS
  return (
    <div className="mt-5 rounded-3xl bg-green-600 text-white p-5 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="opacity-80 text-sm">Today's Weather</p>

          <h2 className="text-3xl font-bold mt-1">
            {Math.round(weather.main.temp)}°C
          </h2>

          <p className="mt-1 text-sm opacity-90 capitalize">
            {weather.weather[0].description}
          </p>
        </div>

        <div className="text-5xl">
          {weather.weather[0].main === "Clouds"
            ? "☁️"
            : weather.weather[0].main === "Rain"
              ? "🌧️"
              : weather.weather[0].main === "Thunderstorm"
                ? "⛈️"
                : weather.weather[0].main === "Drizzle"
                  ? "🌦️"
                  : weather.weather[0].main === "Clear"
                    ? "☀️"
                    : "🌤️"}
        </div>
      </div>
    </div>
  );
}
