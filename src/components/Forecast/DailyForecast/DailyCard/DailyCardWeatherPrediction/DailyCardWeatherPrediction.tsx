import { Avatar } from "@mui/joy";
import "./DailyCardWeatherPrediction.css";
function DailyCardWeatherPrediction(props: {
  weather: { icon: string; description: string };
  children: React.ReactNode;
}) {
  const { weather } = props;

  return (
    <div className="daily--card__line--prediction">
      {props.children}
      <Avatar
        className="prediction-sticker"
        variant="plain"
        src={weather.icon}
        alt={weather.description}
        title={weather.description}
      />
      <span className="daily--card__line--prediction--description">
        {weather.description}
      </span>
    </div>
  );
}

export default DailyCardWeatherPrediction;
