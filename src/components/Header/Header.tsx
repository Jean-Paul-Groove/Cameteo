import "./Header.css";
import SearchBar from "./SearchBar/SearchBar";
import LocationContext from "../../context/locationContext";
import { useContext } from "react";
import oTitle from "../../assets/o-title2.png";
import Logo from "./Logo/Logo";

function Header() {
  const { location } = useContext(LocationContext);
  return (
    <>
      <Logo />
      <header className={location.name ? "header shrinked" : "header"}>
        <h1 className="header-title">
          Camété<b className="hidden-letter">o</b>
          <img className="header-title-o" src={oTitle} />
        </h1>
        <SearchBar></SearchBar>
      </header>
    </>
  );
}

export default Header;
