export interface Forecast {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units: {
    time: string;
    temperature_2m: "°C" | "°F";
    precipitation_probability: "%";
    weathercode: string;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    precipitation_probability: number[];
    weathercode: number[];
  };
  daily_units: {
    time: string;
    temperature_2m_max: "°C";
    temperature_2m_min: "°C";
    precipitation_sum: "mm";
    weathercode: "wmo code";
    sunrise: "iso8601";
    sunset: "iso8601";
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    weathercode: number[];
    sunrise: string[];
    sunset: string[];
    winddirection_10m_dominant: number[];
    windspeed_10m_max: number[];
  };
}
