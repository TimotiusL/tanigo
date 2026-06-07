import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { FaWind, FaTint, FaMapMarkerAlt, FaSun } from "react-icons/fa";

import BottomNav from "../components/BottomNav";

export default function WeatherPage() {
 

  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          "https://api.openweathermap.org/data/2.5/weather?q=Surabaya&units=metric&appid=650309fbb5489c4e3f29b1c5c642482d",
        );

        const data = await response.json();

        if (data.main) {
          setWeather(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherIcon = () => {
    if (!weather) return "☀️";

    const main = weather.weather[0].main;

    switch (main) {
      case "Clouds":
        return "☁️";

      case "Rain":
        return "🌧️";

      case "Thunderstorm":
        return "⛈️";

      case "Drizzle":
        return "🌦️";

      case "Clear":
        return "☀️";

      default:
        return "🌤️";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-200 via-base-100 to-base-200 pb-32">
      <div className="sticky top-0 z-50 bg-base-100/70 backdrop-blur-xl border-b border-base-300">
        <div className="w-full px-8 py-4 flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-primary">Weather Alert</h1>

            <p className="text-sm text-base-content/60">Real-time farming weather</p>
          </div>
        </div>
      </div>

      <div className="w-full px-8 pt-6 grid gap-6">
        {!weather ? (
          <div className="rounded-[2rem] bg-primary text-white p-8 shadow-xl">
            Loading weather...
          </div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary to-lime-600 text-white p-7 shadow-2xl"
            >
              <div className="absolute right-0 top-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />

              <div className="flex items-start justify-between">
                <div>
                  <p className="flex items-center gap-2 opacity-80 text-sm">
                    <FaMapMarkerAlt />

                    {weather.name}
                  </p>

                  <h1 className="text-7xl font-black mt-4 tracking-tight">
                    {Math.round(weather.main.temp)}°
                  </h1>

                  <p className="mt-3 text-lg capitalize opacity-90">
                    {weather.weather[0].description}
                  </p>
                </div>

                <div className="text-8xl">{getWeatherIcon()}</div>
              </div>
            </motion.div>

            <div className="grid grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-[1.7rem] bg-base-100 border border-base-300 shadow-lg p-4"
              >
                <div className="text-primary text-xl">
                  <FaTint />
                </div>

                <p className="text-xs text-base-content/60 mt-3">Humidity</p>

                <h2 className="text-2xl font-bold mt-1">
                  {weather.main.humidity}%
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-[1.7rem] bg-base-100 border border-base-300 shadow-lg p-4"
              >
                <div className="text-info text-xl">
                  <FaWind />
                </div>

                <p className="text-xs text-base-content/60 mt-3">Wind</p>

                <h2 className="text-2xl font-bold mt-1">
                  {weather.wind.speed}
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-[1.7rem] bg-base-100 border border-base-300 shadow-lg p-4"
              >
                <div className="text-warning text-xl">
                  <FaSun />
                </div>

                <p className="text-xs text-base-content/60 mt-3">UV Index</p>

                <h2 className="text-2xl font-bold mt-1">Moderate</h2>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-[2rem] bg-base-100 border border-base-300 shadow-xl p-6"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">🌱</div>

                <div>
                  <h2 className="text-xl font-bold text-base-content">
                    Farming Suggestion
                  </h2>

                  <p className="text-base-content/70 mt-2 leading-relaxed">
                    {weather.main.humidity > 80
                      ? "High humidity detected. Avoid excessive irrigation today."
                      : weather.wind.speed > 8
                        ? "Strong wind detected. Secure lightweight farming equipment."
                        : "Today's weather is suitable for planting and irrigation activities."}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-[2rem] bg-base-100 border border-base-300 shadow-xl p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-base-content/60">
                    Best Farming Time
                  </p>

                  <h2 className="text-3xl font-black mt-2 text-primary">
                    5:00 PM
                  </h2>

                  <p className="text-sm text-base-content/60 mt-2">
                    Ideal weather conditions for watering crops.
                  </p>
                </div>

                <div className="text-6xl">🌅</div>
              </div>
            </motion.div>
          </>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
