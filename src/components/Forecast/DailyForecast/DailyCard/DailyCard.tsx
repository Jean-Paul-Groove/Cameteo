import { Card, Typography, Divider } from "@mui/joy";
import { dayEnum } from "../../../../enums/daysEnum";
import { monthEnum } from "../../../../enums/monthsEnum";

import "./DailyCard.css";
import DailyCardWeatherPrediction from "./DailyCardWeatherPrediction/DailyCardWeatherPrediction";
import CardSwitchPrediction from "./CardSwitchPrediction/CardSwitchPrediction";
import { WheelEvent, useState } from "react";
import TemperatureDisplay from "./TemperatureDisplay/TemperatureDisplay";
import SunTimeDisplay from "./SunTimeDisplay/SunTimeDisplay";
import RainWindDisplay from "./RainWindDisplay/RainWindDisplay";
function DailyCard(props: {
  day: {
    date: string;
    hourlyForecast: {
      [index: string]: {
        weather: { icon: string; description: string };
        temp: number;
      };
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
  function handleScrollOnDailyPredictions(event: WheelEvent) {
    if (predictionDisplay === "daily") {
      return;
    }
    event.stopPropagation();
    const navDiv = document.getElementById(
      "daily--forecast__wrapper__navigation"
    );
    if (navDiv) {
      navDiv.onwheel = function () {
        return true;
      };
    }
  }
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
      />{" "}
      <div
        className="daily-card__hourly-predictions"
        onWheel={handleScrollOnDailyPredictions}
      >
        {Object.keys(day.hourlyForecast).map((weatherKey, index) => {
          if (predictionDisplay === "daily" && !hoursToShow.includes(index)) {
            return;
          } else {
            return (
              <div key={index + "dailypredictions"}>
                <Divider inset="none" orientation="horizontal" />
                <DailyCardWeatherPrediction
                  hourlyPrediction={day.hourlyForecast[weatherKey]}
                >
                  {weatherKey.split("h")[1] + "h"}
                </DailyCardWeatherPrediction>
              </div>
            );
          }
        })}
      </div>
      <CardSwitchPrediction
        predictionState={predictionDisplay}
        setPrediction={setPredictionDisplay}
      />
    </Card>
  );
}

export default DailyCard;
