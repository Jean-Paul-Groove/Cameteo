import { Forecast } from "../../../dto/forecastDto";
import "./DailyForecast.css";
import { BiSolidRightArrow } from "react-icons/bi";
import DailyCard from "./DailyCard/DailyCard";
import { weatherCodeEnum } from "../../../enums/weatherEnum";
import { Stack } from "@mui/joy";
import { useRef, useState } from "react";
function DailyForecast(props: { forecast: Forecast }) {
  const { forecast } = props;
  const dayVisible = useRef(0);
  const [navigationHidden, setNavigationHidden] = useState("left");
  function regroupDataPerDay(forecast: Forecast) {
    const weekWeatherData = [];
    const dailyData = forecast.daily;
    const hourlyData = forecast.hourly;

    for (let i = 0; i < dailyData.time.length; i++) {
      const day = {
        date: dailyData.time[i],
        weather: {
          h8: associateIconWithWeatherCode(hourlyData.weathercode[i * 24 + 8]),
          h12: associateIconWithWeatherCode(
            hourlyData.weathercode[i * 24 + 12]
          ),
          h16: associateIconWithWeatherCode(
            hourlyData.weathercode[i * 24 + 16]
          ),
          h20: associateIconWithWeatherCode(
            hourlyData.weathercode[i * 24 + 20]
          ),
        },
        precipitation: dailyData.precipitation_sum[i],
        tempMax: dailyData.temperature_2m_max[i],
        tempMin: dailyData.temperature_2m_min[i],
        sunrise: dailyData.sunrise[i].split("T")[1],
        sunset: dailyData.sunset[i].split("T")[1],
      };
      weekWeatherData.push(day);
    }
    return weekWeatherData;
  }

  function associateIconWithWeatherCode(code: number) {
    return weatherCodeEnum[`${code}`];
  }

  function showNextDay(action: "prev" | "next") {
    if (action === "next" && dayVisible.current == weekWeatherData.length - 1) {
      return;
    }
    if (action === "prev" && dayVisible.current == 0) {
      return;
    }
    const newDayIndex =
      action === "next" ? dayVisible.current + 1 : dayVisible.current - 1;
    const gallery = document.getElementById("daily--forecast__gallery");
    const firstCard = document.getElementById("card-0");
    if (gallery && firstCard) {
      const cardWidth = +window
        .getComputedStyle(firstCard)
        .width.split("px")[0];
      gallery.style.transform = `translateX(-${cardWidth * newDayIndex}px)`;
    }
    if (
      dayVisible.current == 0 ||
      dayVisible.current == weekWeatherData.length - 1
    ) {
      setNavigationHidden("none");
    }
    if (newDayIndex === 0) {
      setNavigationHidden("left");
    }
    if (newDayIndex === weekWeatherData.length - 1) {
      setNavigationHidden("right");
    }
    dayVisible.current = newDayIndex;
  }
  const weekWeatherData = regroupDataPerDay(forecast);
  return (
    <div
      className="daily--forecast__wrapper__navigation"
      id="daily--forecast__wrapper__navigation"
    >
      {navigationHidden != "left" && (
        <a
          className="daily--forecast__navigation-link navigation-link-left"
          onClick={(e) => {
            e.preventDefault();
            showNextDay("prev");
          }}
        >
          <BiSolidRightArrow />
        </a>
      )}{" "}
      {navigationHidden != "right" && (
        <a
          className="daily--forecast__navigation-link navigation-link-right"
          onClick={(e) => {
            e.preventDefault();
            showNextDay("next");
          }}
        >
          <BiSolidRightArrow />
        </a>
      )}
      <div className="daily--forecast__wrapper" id="daily--forecast__wrapper">
        <Stack
          id="daily--forecast__gallery"
          direction="row"
          justifyContent="flex-start"
          spacing={2}
        >
          <div className="daily--card__line empty-div"></div>
          {weekWeatherData &&
            weekWeatherData.map((day, index) => {
              return <DailyCard day={day} id={"card-" + index} />;
            })}
          <div className="daily--card__line empty-div"></div>
        </Stack>
      </div>
    </div>
  );
}

export default DailyForecast;
