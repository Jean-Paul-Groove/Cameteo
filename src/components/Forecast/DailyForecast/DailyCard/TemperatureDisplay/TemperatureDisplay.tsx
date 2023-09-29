import temperatureIcon from "../../../../../assets/icons8-thermometer-50.png";
import temperatureMinIcon from "../../../../../assets/icons8-thermometer-50-blue.png";
import { Avatar } from "@mui/joy";
import "./TemperatureDisplay.css";
function TemperatureDisplay(props: { tempMax: number; tempMin: number }) {
  const { tempMax, tempMin } = props;
  return (
    <div className="daily--card__temperature-display">
      <div className="daily--card__temperature-display-item">
        <Avatar
          variant="plain"
          src={temperatureIcon}
          alt="Température maximale"
          title="Température maximale"
        />
        {"Max " + tempMax}C°
      </div>
      <div className=" daily--card__temperature-display-item temperature-display-item-right">
        <Avatar
          variant="plain"
          src={temperatureMinIcon}
          alt="Température minimale"
          title="Température minimale"
        />
        {"Min " + tempMin}C°
      </div>
    </div>
  );
}

export default TemperatureDisplay;
