import { Forecast } from "../../../dto/forecastDto";
import "./DailyForecast.css";
import { BiSolidRightArrow } from "react-icons/bi";
import DailyCard from "./DailyCard/DailyCard";
import { weatherCodeEnum } from "../../../enums/weatherEnum";
import { Stack } from "@mui/joy";
import { TouchEvent, WheelEvent, useRef, useState } from "react";
function DailyForecast(props: { forecast: Forecast }) {
  const { forecast } = props;
  const dayVisible = useRef(0);
  const [navigationHidden, setNavigationHidden] = useState("left");
  let startTouchXPosition = 0;
  function timeToNumberOfSecond(time: string) {
    const timeArray = time.split(":");
    const numberOfSecond = +timeArray[0] * 3600 + +timeArray[1] * 60;
    return numberOfSecond;
  }
  function regroupDataPerDay(forecast: Forecast) {
    const weekWeatherData = [];
    const dailyData = forecast.daily;
    const hourlyData = forecast.hourly;

    for (let i = 0; i < dailyData.time.length; i++) {
      const hourlyForecast: {
        [index: string]: {
          weather: { icon: string; description: string };
          temp: number;
        };
      } = {};
      const sunrise = dailyData.sunrise[i];
      const sunset = dailyData.sunset[i];

      const sunsetTimeAsNumber =
        timeToNumberOfSecond(sunset.split("T")[1]) / 3600;

      const sunriseTimeAsNumber =
        timeToNumberOfSecond(sunrise.split("T")[1]) / 3600;

      for (let j = 0; j < 24; j++) {
        const isNight = j < sunriseTimeAsNumber || j > sunsetTimeAsNumber;

        hourlyForecast["h" + j] = {
          weather: associateIconWithWeatherCode(
            hourlyData.weathercode[i * 24 + j],
            isNight
          ),
          temp: hourlyData.temperature_2m[i * 24 + j],
        };
      }
      const day = {
        date: dailyData.time[i],
        hourlyForecast: hourlyForecast,
        precipitation: dailyData.precipitation_sum[i],
        tempMax: dailyData.temperature_2m_max[i],
        tempMin: dailyData.temperature_2m_min[i],
        sunrise: sunrise,
        sunset: dailyData.sunset[i],
        windDirection: dailyData.winddirection_10m_dominant[i],
        windSpeed: dailyData.windspeed_10m_max[i],
      };
      weekWeatherData.push(day);
    }
    return weekWeatherData;
  }

  function associateIconWithWeatherCode(code: number, night = false) {
    const weather: { icon: string; description: string; iconNight?: string } =
      weatherCodeEnum[`${code}`];

    const dayWeather = { ...weather };
    if (!night) {
      return dayWeather;
    } else {
      const weatherNight = { ...weather };
      if (weatherNight.iconNight) {
        weatherNight.icon = weatherNight.iconNight;
      }
      return weatherNight;
    }
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
      const cardWidth =
        +window.getComputedStyle(firstCard).width.split("px")[0] +
        +window.getComputedStyle(firstCard).marginLeft.split("px")[0];
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
  function handleScroll(event: WheelEvent) {
    const navDiv = document.getElementById(
      "daily--forecast__wrapper__navigation"
    );
    if (navDiv) {
      navDiv.onwheel = function () {
        return false;
      };
    }

    event.preventDefault();
    event.stopPropagation();
    if (event.deltaY > 0 || event.deltaX > 0) {
      showNextDay("next");
    }
    if (event.deltaY < 0 || event.deltaX < 0) {
      showNextDay("prev");
    }
  }
  function handleTouchStart(event: TouchEvent) {
    console.log("start at " + event.touches[0].clientX);
    startTouchXPosition = event.touches[0].clientX;
  }
  function handleTouchEnd(event: TouchEvent) {
    const endTouchXPosition = event.changedTouches[0].clientX;
    if (endTouchXPosition - startTouchXPosition < -50) {
      showNextDay("next");
    }
    if (endTouchXPosition - startTouchXPosition > 50) {
      showNextDay("prev");
    }
    startTouchXPosition = 0;
  }
  return (
    <div
      className="daily--forecast__wrapper__navigation"
      id="daily--forecast__wrapper__navigation"
      onWheel={handleScroll}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
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
          alignItems="flex-start"
          spacing={2}
        >
          {weekWeatherData &&
            weekWeatherData.map((day, index) => {
              return (
                <DailyCard
                  day={day}
                  id={"card-" + index}
                  key={"dailycard" + index}
                />
              );
            })}
        </Stack>
      </div>
    </div>
  );
}

export default DailyForecast;
