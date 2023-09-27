import { Dispatch, SetStateAction, createContext } from "react";

export interface location {
  longitude: undefined | number;
  latitude: undefined | number;
  elevation: undefined | number;
  name: undefined | string;
}

const LocationContext = createContext<{
  location: location;
  setLocation: undefined | Dispatch<SetStateAction<location>>;
}>({
  location: {
    longitude: undefined,
    latitude: undefined,
    elevation: undefined,
    name: undefined,
  },
  setLocation: undefined,
});

export default LocationContext;
