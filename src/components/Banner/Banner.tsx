import "./Banner.css";
import bannerImg from "../../assets/clear-sky-clouds-nature-5k-f3.webp";
import SearchBar from "./SearchBar/SearchBar";
import bannerLogo from "../../assets/cameleon.webp";
import LocationContext from "../../context/locationContext";
import { useContext } from "react";
import oTitle from "../../assets/o-title2.png";

function Banner() {
  const { location } = useContext(LocationContext);
  return (
    <div className={location.name ? "banner shrinked" : "banner"}>
      <img className="banner-img" src={bannerImg} />
      <img src={bannerLogo} alt="logo" className="banner-logo" />
      <h1 className="banner-title">
        Camété<b className="hidden-letter">o</b>
        <img className="banner-title-o" src={oTitle} />
      </h1>
      <SearchBar></SearchBar>
    </div>
  );
}

export default Banner;
