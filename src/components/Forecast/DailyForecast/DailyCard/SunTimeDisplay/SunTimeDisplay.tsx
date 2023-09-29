import { Avatar } from "@mui/joy";
import "./SunTimeDisplay.css";
import sunriseIcon from "../../../../../assets/icons8-sunrise-50.png";
import sunsetIcon from "../../../../../assets/icons8-sunset-50.png";
function SunTimeDisplay(props: { sunrise: string; sunset: string }) {
  const { sunrise, sunset } = props;
  return (
    <>
      <div className="daily--card__sun-time-display">
        <div className="daily--card__sun-time-display-item">
          {" "}
          <Avatar
            variant="plain"
            src={sunriseIcon}
            alt="Lever du soleil"
            title="Lever du soleil"
          />
          {sunrise.split("T")[1]}
        </div>
        <div className="daily--card__sun-time-display-item sun-time-display-item-right">
          <Avatar
            variant="plain"
            src={sunsetIcon}
            alt="Coucher du soleil"
            title="Coucher du soleil"
          />{" "}
          {sunset.split("T")[1]}
        </div>
      </div>
    </>
  );
}

export default SunTimeDisplay;
