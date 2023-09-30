import { useState } from "react";
import "./App.css";
import LocationContext from "./context/locationContext";
import { location } from "./context/locationContext";
import Forecast from "./components/Forecast/Forecast";
import Header from "./components/Header/Header";
function App() {
  const [location, setLocation] = useState<location>({
    longitude: undefined,
    latitude: undefined,
    elevation: undefined,
    name: undefined,
  });
  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      <Header />
      <Forecast />
    </LocationContext.Provider>
  );
}

export default App;
