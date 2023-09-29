import { Card, Typography, Divider } from "@mui/joy";
import { dayEnum } from "../../../../enums/daysEnum";
import { monthEnum } from "../../../../enums/monthsEnum";

import "./DailyCard.css";
import DailyCardWeatherPrediction from "./DailyCardWeatherPrediction/DailyCardWeatherPrediction";
import CardSwitchPrediction from "./CardSwitchPrediction/CardSwitchPrediction";
import { useState } from "react";
import TemperatureDisplay from "./TemperatureDisplay/TemperatureDisplay";
import SunTimeDisplay from "./SunTimeDisplay/SunTimeDisplay";
import RainWindDisplay from "./RainWindDisplay/RainWindDisplay";
function DailyCard(props: {
  day: {
    date: string;
    weather: {
      [index: string]: { icon: string; description: string };
    };
    precipitation: number;
    tempMax: number;
    tempMin: number;
    sunrise: string;
    sunset: string;
    windSpeed: number;
    windDirection: number;
  };
  id: string;
}) {
  const { day, id } = props;
  const [predictionDisplay, setPredictionDisplay] = useState<
    "daily" | "hourly"
  >("daily");
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
  const hoursToShow = [8, 12, 16, 20];
  return (
    <Card
      color="primary"
      variant="outlined"
      invertedColors
      className="daily-card"
      sx={{ margin: "1vw" }}
      id={id}
    >
      <Typography level="h3">{formatedDate(day.date)} </Typography>
      <TemperatureDisplay tempMax={day.tempMax} tempMin={day.tempMin} />
      <Divider inset="none" orientation="horizontal" />{" "}
      <SunTimeDisplay sunrise={day.sunrise} sunset={day.sunset} />{" "}
      <Divider inset="none" orientation="horizontal" />{" "}
      <RainWindDisplay
        precipitation={day.precipitation}
        windDirection={day.windDirection}
        windSpeed={day.windSpeed}
      />
      {Object.keys(day.weather).map((weatherKey, index) => {
        if (predictionDisplay === "daily" && !hoursToShow.includes(index)) {
          return;
        } else {
          return (
            <>
              <Divider inset="none" orientation="horizontal" />
              <DailyCardWeatherPrediction weather={day.weather[weatherKey]}>
                {weatherKey.split("h")[1] + "h"}
              </DailyCardWeatherPrediction>
            </>
          );
        }
      })}
      <CardSwitchPrediction
        predictionState={predictionDisplay}
        setPrediction={setPredictionDisplay}
      />
    </Card>
  );
}

export default DailyCard;
