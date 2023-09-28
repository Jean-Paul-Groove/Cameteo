import { Card, Typography, Avatar, Divider } from "@mui/joy";
import { dayEnum } from "../../../../enums/daysEnum";
import { monthEnum } from "../../../../enums/monthsEnum";
import temperatureIcon from "../../../../assets/icons8-thermometer-50.png";
import temperatureMinIcon from "../../../../assets/icons8-thermometer-50-blue.png";
import sunriseIcon from "../../../../assets/icons8-sunrise-50.png";
import sunsetIcon from "../../../../assets/icons8-sunset-50.png";
import precipitationIcon from "../../../../assets/icons8-hygrometer-50.png";
import "./DailyCard.css";
function DailyCard(props: {
  day: {
    date: string;
    weather: {
      h8: { icon: string; description: string };
      h12: { icon: string; description: string };
      h16: { icon: string; description: string };
      h20: { icon: string; description: string };
    };
    precipitation: number;
    tempMax: number;
    tempMin: number;
    sunrise: string;
    sunset: string;
  };
  id: string;
}) {
  const { day, id } = props;
  function formatedDate(date: string) {
    const day = dayEnum[new Date(date).getDay()];
    const dateArray = date.split("-");
    const formatedDay =
      day.slice(0, 3) +
      ". " +
      dateArray[2] +
      " " +
      monthEnum[+dateArray[1] - 1].slice(0, 3) +
      ".";
    return formatedDay;
  }
  return (
    <Card
      color="primary"
      variant="outlined"
      invertedColors
      className="daily--forecast__dayCard"
      sx={{ margin: "1vw" }}
      id={id}
    >
      <Typography level="h3">{formatedDate(day.date)}</Typography>
      <div className="daily--card__line--prediction">
        8h{" "}
        <Avatar
          variant="plain"
          src={day.weather.h8.icon}
          alt={day.weather.h8.description}
          title={day.weather.h8.description}
        />
        <span className="daily--card__line--prediction--description">
          {day.weather.h8.description}
        </span>
      </div>
      <Divider inset="none" orientation="horizontal" />{" "}
      <div className="daily--card__line--prediction">
        12h
        <Avatar
          variant="plain"
          src={day.weather.h12.icon}
          alt={day.weather.h12.description}
          title={day.weather.h12.description}
        />
        <span className="daily--card__line--prediction--description">
          {day.weather.h12.description}
        </span>
      </div>
      <Divider inset="none" orientation="horizontal" />{" "}
      <div className="daily--card__line--prediction">
        16h
        <Avatar
          variant="plain"
          src={day.weather.h16.icon}
          alt={day.weather.h16.description}
          title={day.weather.h16.description}
        />
        <span className="daily--card__line--prediction--description">
          {day.weather.h16.description}
        </span>
      </div>
      <Divider inset="none" orientation="horizontal" />{" "}
      <div className="daily--card__line--prediction">
        20h
        <Avatar
          variant="plain"
          src={day.weather.h20.icon}
          alt={day.weather.h20.description}
          title={day.weather.h20.description}
        />
        <span className="daily--card__line--prediction--description">
          {day.weather.h20.description}
        </span>
      </div>
      <Divider inset="none" orientation="horizontal" />
      <div className="daily--card__line">
        <Avatar
          variant="plain"
          src={precipitationIcon}
          alt="Précipitations"
          title="Précipitations"
        />
        {day.precipitation}mm
      </div>
      <Divider inset="none" orientation="horizontal" />
      <div className="daily--card__line">
        <span>
          {" "}
          <Avatar
            variant="plain"
            src={temperatureIcon}
            alt="Température maximale"
            title="Température maximale"
          />
          Max
        </span>
        {day.tempMax}C°
      </div>
      <Divider inset="none" orientation="horizontal" />
      <div className="daily--card__line">
        <span>
          <Avatar
            variant="plain"
            src={temperatureMinIcon}
            alt="Température minimale"
            title="Température minimale"
          />
          Min
        </span>
        {day.tempMin}C°
      </div>
      <Divider inset="none" orientation="horizontal" />
      <div className="daily--card__line">
        <Avatar
          variant="plain"
          src={sunriseIcon}
          alt="Lever du soleil"
          title="Lever du soleil"
        />{" "}
        {day.sunrise}
      </div>
      <Divider inset="none" orientation="horizontal" />
      <div className="daily--card__line">
        {" "}
        <Avatar
          variant="plain"
          src={sunsetIcon}
          alt="Coucher du soleil"
          title="Coucher du soleil"
        />{" "}
        {day.sunset}
      </div>
    </Card>
  );
}

export default DailyCard;
