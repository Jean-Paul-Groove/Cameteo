import { Button, List, ListItemButton } from "@mui/joy";
import Input from "@mui/joy/Input";
import { FormEvent, useContext, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { SearchResultArray } from "../../../dto/locationSearchDto";
import "./SearchBar.css";
import LocationContext from "../../../context/locationContext";
import ListDivider from "@mui/joy/ListDivider";

function SearchBar() {
  const numberOfResults = 10;
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
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsloading(true);
    try {
      const data = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${searchContent}&language=${localisation}&count=${numberOfResults}`
      );
      const result = await data.json();
      if (!result.results) {
        throw new Error(
          `Nous n'avons pas pu trouver de lieu correspondant à "${searchContent}", veuillez réessayer`
        );
      }
      setSearchResult(result);
      console.log(result);
    } catch (error) {
      alert(error);
      setSearchContent("");
      resetSearchResults();
    } finally {
      setIsloading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        onBlur={resetSearchResults}
        variant="plain"
        size="lg"
        color="primary"
        placeholder="Votre ville ... "
        value={searchContent}
        sx={{ "--Input-decoratorChildHeight": "45px" }}
        onChange={(event) => setSearchContent(event.target.value)}
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
      {searchResult.results.length && (
        <List
          sx={{ position: "absolute", backgroundColor: "white", zIndex: 3 }}
        >
          {searchResult.results.map((result) => (
            <>
              <ListItemButton
                key={result.id}
                onClick={() => {
                  if (setLocation) {
                    setLocation({
                      longitude: result.longitude,
                      latitude: result.latitude,
                      elevation: result.elevation,
                      name: result.name,
                    });
                  }
                  resetSearchResults();
                }}
              >
                {result.name + ", " + result.admin2 + ", " + result.country}
              </ListItemButton>
              <ListDivider />
            </>
          ))}
        </List>
      )}
    </form>
  );
}
export default SearchBar;
