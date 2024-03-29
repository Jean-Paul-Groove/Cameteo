import LocationContext, { location } from "../../context/locationContext";
import { useContext, useEffect, useState } from "react";
import "./Forecast.css";
import DailyForecast from "./DailyForecast/DailyForecast";
import { Typography } from "@mui/joy";

function Forecast() {
  const daysOfForecast = 10;
  const { location } = useContext(LocationContext);
  const [weatherPrediction, setWeatherPrediction] = useState();
  async function fetchWeatherPredictions(location: location) {
    try {
      const data = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&hourly=temperature_2m,precipitation_probability,weathercode&forecast_days&timezone=auto&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode,sunrise,sunset,windspeed_10m_max,winddirection_10m_dominant&forecast_days=${daysOfForecast}`
      );
      const predictions = await data.json();
      setWeatherPrediction(predictions);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (location.name && location.latitude && location.longitude) {
      fetchWeatherPredictions(location);
    }
  }, [location]);
  if (location.name) {
    return (
      <main className="forecast__main">
        <Typography
          className="forecast__location"
          color="primary"
          variant="soft"
          level="h2"
          sx={{
            textAlign: "center",
            margin: "0",
            borderRadius: 0,
          }}
        >
          {location.name}
        </Typography>
        {weatherPrediction && <DailyForecast forecast={weatherPrediction} />}
      </main>
    );
  }
}

export default Forecast;
