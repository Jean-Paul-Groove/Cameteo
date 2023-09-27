import LocationContext, { location } from "../../context/locationContext";
import { useContext, useEffect, useState } from "react";
import "./Forecast.css";

function Forecast() {
  const { location } = useContext(LocationContext);
  const [weatherPrediction, setWeatherPrediction] = useState();
  async function fetchWeatherPredictions(location: location) {
    try {
      const data = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&hourly=temperature_2m,precipitation_probability,weathercode&forecast_days&elevation=${location.elevation}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode,sunrise,sunset`
      );
      const predictions = await data.json();
      setWeatherPrediction(predictions);
      console.log(predictions);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (
      location.name &&
      location.elevation &&
      location.latitude &&
      location.longitude
    ) {
      fetchWeatherPredictions(location);
    }
  }, [location]);

  return (
    <div className="coordinates">
      {" "}
      <span className="coordinate-item">Longitude:{location?.longitude}</span>
      <span className="coordinate-item">Latitude: {location?.latitude}</span>
      <span className="coordinate-item">Elevation:{location?.elevation}</span>
    </div>
  );
}

export default Forecast;
