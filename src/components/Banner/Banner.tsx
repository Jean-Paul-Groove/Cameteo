import "./Banner.css";
import bannerImg from "../../assets/clear-sky-clouds-nature-5k-f3.webp";
import SearchBar from "./SearchBar/SearchBar";
import bannerLogo from "../../assets/cameleon.webp";
function Banner() {
  return (
    <div className="banner">
      <img className="banner-img" src={bannerImg} />
      <img src={bannerLogo} alt="logo" className="banner-logo" />
      <h1 className="banner-title">Camétéo</h1>
      <SearchBar></SearchBar>
    </div>
  );
}

export default Banner;
