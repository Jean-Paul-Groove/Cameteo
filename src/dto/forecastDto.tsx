export interface Forecast {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: 0;
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
    time: [
      "2023-09-26",
      "2023-09-27",
      "2023-09-28",
      "2023-09-29",
      "2023-09-30",
      "2023-10-01",
      "2023-10-02"
    ];
    temperature_2m_max: [25.3, 25.6, 24.9, 25.9, 30.8, 27.3, 26.7];
    temperature_2m_min: [11.2, 12.3, 12.3, 16.0, 17.3, 14.0, 13.1];
    precipitation_sum: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
    weathercode: [0, 45, 45, 45, 1, 45, 45];
    sunrise: [
      "2023-09-26T05:36",
      "2023-09-27T05:37",
      "2023-09-28T05:38",
      "2023-09-29T05:39",
      "2023-09-30T05:40",
      "2023-10-01T05:41",
      "2023-10-02T05:42"
    ];
    sunset: [
      "2023-09-26T17:35",
      "2023-09-27T17:33",
      "2023-09-28T17:32",
      "2023-09-29T17:30",
      "2023-09-30T17:28",
      "2023-10-01T17:26",
      "2023-10-02T17:24"
    ];
  };
}
