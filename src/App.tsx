import { useState } from "react";
import "./App.css";
import Banner from "./components/Banner/Banner";
import LocationContext from "./context/locationContext";
import { location } from "./context/locationContext";
import Forecast from "./components/Forecast/Forecast";
function App() {
  const [location, setLocation] = useState<location>({
    longitude: undefined,
    latitude: undefined,
    elevation: undefined,
    name: undefined,
  });
  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      <Banner />
      <Forecast />
    </LocationContext.Provider>
  );
}

export default App;
