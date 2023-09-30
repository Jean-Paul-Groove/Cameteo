import { Avatar } from "@mui/joy";
import "./RainWindDisplay.css";
import precipitationIcon from "../../../../../assets/icons8-hygrometer-50.png";
import windIcon from "../../../../../assets/icons8-windsock-50.png";
import windRose from "../../../../../assets/icons8-wind-rose-50.png";
function RainWindDisplay(props: {
  windSpeed: number;
  windDirection: number;
  precipitation: number;
}) {
  const { windSpeed, windDirection, precipitation } = props;
  function convertWindAngle(angle: number) {
    if (angle <= 22 || angle > 337) {
      return "N";
    }
    if (angle > 22 && angle <= 67) {
      return "NE";
    }
    if (angle > 67 && angle <= 112) {
      return "E";
    }
    if (angle > 112 && angle <= 157) {
      return "SE";
    }
    if (angle > 157 && angle <= 202) {
      return "S";
    }
    if (angle > 202 && angle <= 247) {
      return "SO";
    }
    if (angle > 247 && angle <= 292) {
      return "O";
    }
    if (angle > 292 && angle <= 337) {
      return "NO";
    }
  }
  return (
    <div className="daily--card__rain-wind-display">
      <div className="daily--card__rain-wind-display rain-display">
        <Avatar
          variant="plain"
          src={precipitationIcon}
          alt="Précipitations"
          title="Précipitations"
        />
        {precipitation}mm
      </div>
      <div className="daily--card__rain-wind-display wind-display">
        <div className="daily--card__rain-wind-display wind-speed">
          <Avatar
            variant="plain"
            src={windIcon}
            alt="Force du vent"
            title="Force du vent"
          />
          {Math.round(windSpeed) + " Km/h"}
        </div>
        <div className="daily--card__rain-wind-display wind-direction">
          {" "}
          <Avatar
            size="sm"
            variant="plain"
            src={windRose}
            alt="Direction du vent"
            title="Direction du vent"
          />
          {convertWindAngle(windDirection)}
        </div>
      </div>
    </div>
  );
}
export default RainWindDisplay;
