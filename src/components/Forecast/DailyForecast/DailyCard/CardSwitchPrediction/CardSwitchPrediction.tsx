import { Button } from "@mui/joy";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

function CardSwitchPrediction(props: {
  predictionState: "hourly" | "daily";
  setPrediction: React.Dispatch<React.SetStateAction<"daily" | "hourly">>;
}) {
  const { predictionState, setPrediction } = props;

  return (
    <Button
      sx={{ marginLeft: "" }}
      variant="soft"
      onClick={() =>
        setPrediction(predictionState == "hourly" ? "daily" : "hourly")
      }
      startDecorator={
        predictionState == "hourly" ? <AiOutlineMinus /> : <AiOutlinePlus />
      }
    >
      {predictionState == "hourly" ? "Moins" : "Plus"}
    </Button>
  );
}
export default CardSwitchPrediction;
