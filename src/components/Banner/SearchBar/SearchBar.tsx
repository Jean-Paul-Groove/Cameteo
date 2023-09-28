import { Button, List, ListItemButton } from "@mui/joy";
import Input from "@mui/joy/Input";
import { FormEvent, useContext, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { SearchResultArray } from "../../../dto/locationSearchDto";
import "./SearchBar.css";
import LocationContext from "../../../context/locationContext";
import ListDivider from "@mui/joy/ListDivider";

function SearchBar() {
  const numberOfResults = 5;
  const localisation = "fr";

  const [searchResult, setSearchResult] = useState<SearchResultArray>({
    results: [],
    generationtime_ms: 0,
  });
  const [searchContent, setSearchContent] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const { setLocation } = useContext(LocationContext);
  function resetSearchResults() {
    setSearchResult({
      results: [],
      generationtime_ms: 0,
    });
  }
  async function fetchWeatherPredictions(search: string) {
    setIsloading(true);
    try {
      const data = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${search}&language=${localisation}&count=${numberOfResults}`
      );
      const result = await data.json();
      if (!result.results) {
        throw new Error(
          `Nous n'avons pas pu trouver de lieu correspondant à "${search}", veuillez réessayer`
        );
      }
      setSearchResult(result);
      console.log(result);
    } catch (error) {
      console.log(error);
      resetSearchResults();
    } finally {
      setIsloading(false);
    }
  }
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    fetchWeatherPredictions(searchContent);
  }
  function preSearch(search: string) {
    if (search.length > 5) {
      fetchWeatherPredictions(search);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        variant="plain"
        size="lg"
        color="primary"
        placeholder="Votre ville ... "
        value={searchContent}
        sx={{ "--Input-decoratorChildHeight": "45px" }}
        onChange={(event) => {
          setSearchContent(event.target.value);
          preSearch(event.target.value);
        }}
        endDecorator={
          <Button
            variant="solid"
            color="primary"
            type="search"
            sx={{
              borderBottomLeftRadius: 0,
              borderTopLeftRadius: 0,
              zIndex: 3,
            }}
            loading={isLoading}
          >
            <FaSearch />
          </Button>
        }
      ></Input>
      {searchResult.results.length > 0 && (
        <List
          sx={{
            position: "absolute",
            backgroundColor: "white",
            zIndex: 3,
            maxHeight: "50vh",
            overflowY: "scroll",
            transform: "translateY(-5px)",
          }}
        >
          {searchResult.results.map((result, index) => (
            <>
              <ListItemButton
                key={result.id}
                onClick={() => {
                  if (setLocation) {
                    setLocation({
                      longitude: result.longitude,
                      latitude: result.latitude,
                      elevation: result.elevation,
                      name: result.name + ", " + result.admin1,
                    });
                  }
                  resetSearchResults();
                }}
              >
                {result.name + ", " + result.admin2 + ", " + result.country}
              </ListItemButton>
              {index != searchResult.results.length - 1 && (
                <ListDivider key={result.id + "divider"} />
              )}
            </>
          ))}
        </List>
      )}
    </form>
  );
}
export default SearchBar;
