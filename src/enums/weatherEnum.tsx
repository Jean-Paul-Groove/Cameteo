import sunny from "../assets/icons8-sun-50.png";
import partlyCloudy from "../assets/icons8-partly-cloudy-day-50.png";
import cloudy from "../assets/icons8-cloud-50.png";
import veryCloudy from "../assets/icons8-clouds-50.png";
import fog from "../assets/icons8-fog-50.png";
import lightRain from "../assets/icons8-rain-cloud-50.png";
import rain from "../assets/icons8-rain-50.png";
import snow from "../assets/icons8-snow-50.png";
import freezingRain from "../assets/icons8-sleet-50.png";
import thunderStorm from "../assets/icons8-storm-50.png";
export const weatherCodeEnum: {
  [index: number]: { icon: string; description: string };
} = {
  0: { description: "Ciel dégagé", icon: sunny },
  1: { description: "Légerement couvert", icon: partlyCloudy },
  2: { description: "Partiellement couvert", icon: cloudy },
  3: { description: "Couvert", icon: veryCloudy },
  45: { description: "Brouillard", icon: fog },
  48: { description: "Brouillard", icon: fog },
  51: { description: "Faible bruine", icon: lightRain },
  53: { description: "Bruine", icon: lightRain },
  55: { description: "Forte bruine", icon: rain },
  56: { description: "Pluie givrante", icon: freezingRain },
  57: { description: "Forte pluie givrante", icon: freezingRain },
  61: { description: "Faible pluie", icon: rain },
  63: { description: "Pluie", icon: rain },
  65: { description: "Forte pluie", icon: rain },
  66: { description: "Pluie givrante", icon: freezingRain },
  67: { description: "Forte pluie givrante", icon: freezingRain },
  71: { description: "Faible neige", icon: snow },
  73: { description: "Neige", icon: snow },
  75: { description: "Forte neige", icon: snow },
  77: { description: "Neige solide ?", icon: snow },
  80: { description: "Faibles averses", icon: lightRain },
  81: { description: "Averses", icon: lightRain },
  82: { description: "Fortes averses", icon: rain },
  85: { description: "Averses neigeuses", icon: rain },
  86: { description: "Fortes averses neigeuses", icon: rain },
  95: { description: "Orages", icon: thunderStorm },
  96: { description: "Orages avec grêle", icon: thunderStorm },
  99: { description: "Orages avec forte grêle", icon: thunderStorm },
};
