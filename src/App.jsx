import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import WeatherGraph from './components/WeatherGraph';
import Loader from './components/Loader';
import Error from './components/Error';

export default function App() {
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [hourly, setHourly] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = import.meta.env.VITE_WEATHERKEY;

  const fetchWeather = async (lat = null, lon = null, city = null) => {
    try {
      setLoading(true);
      setError('');

      let url = '';
      if (city) url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
      else if (lat && lon) url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      else return;

      const res = await fetch(url);
      const data = await res.json();
      if (data.cod !== '200') throw new Error();

      setWeather({
        city: data.city.name,
        country: data.city.country,
        temp: Math.round(data.list[0].main.temp),
        humidity: data.list[0].main.humidity,
        wind: data.list[0].wind.speed,
        icon: data.list[0].weather[0].icon,
      });

      setForecast(data.list.filter((_, i) => i % 8 === 0));
      setHourly(data.list);
    } catch {
      setError('Weather data not available');
      setWeather(null);
      setForecast([]);
      setHourly([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
        () => setError('Location permission denied')
      );
  }, []);

  return (
    <div className="min-h-screen bg-animated flex flex-col items-center p-6 gap-10">
      {/* Header */}
      <header className="flex flex-col items-center gap-2 text-white drop-shadow-lg">
        <h1 className="text-5xl font-extrabold ">WeatherWise</h1>
        <p className="text-center text-sm md:text-base">
          Live weather forecast, hourly trends & 5-day forecast
        </p>
      </header>

      {/* Search */}
    <div className="w-full flex justify-center">
  <SearchBar
    search={search}
    setSearch={setSearch}
    fetchByCity={() => fetchWeather(null, null, search)}
    fetchByLocation={() =>
      navigator.geolocation.getCurrentPosition((p) =>
        fetchWeather(p.coords.latitude, p.coords.longitude)
      )
    }
  />
</div>


      {/* Loader & Error */}
      {loading && <Loader />}
      {error && <Error message={error} />}

      {/* Main Layout */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Current Weather */}
        {weather && (
          <div className="lg:col-span-5 flex justify-center">
            <CurrentWeather weather={weather} />
          </div>
        )}

        {/* Forecast & Graph */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          {forecast.length > 0 && (
            <Forecast forecast={forecast} weather={weather} setWeather={setWeather} />
          )}
          {hourly.length > 0 && <WeatherGraph hourly={hourly} />}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-white/70 text-sm text-center mt-4">
        &copy; {new Date().getFullYear()} WeatherWise. All rights reserved.
      </footer>
    </div>
  );
}
