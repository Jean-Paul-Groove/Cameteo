import { Avatar } from "@mui/joy";
import "./DailyCardWeatherPrediction.css";
function DailyCardWeatherPrediction(props: {
  hourlyPrediction: {
    weather: { icon: string; description: string };
    temp: number;
  };
  children: React.ReactNode;
}) {
  const { hourlyPrediction } = props;

  return (
    <div className="daily--card__line--prediction">
      {props.children}
      <Avatar
        className="prediction-sticker"
        variant="plain"
        src={hourlyPrediction.weather.icon}
        alt={hourlyPrediction.weather.description}
        title={hourlyPrediction.weather.description}
      />
      <span className="daily--card__line--prediction--description">
        {Math.round(hourlyPrediction.temp) + "°C"}
      </span>
    </div>
  );
}

export default DailyCardWeatherPrediction;
