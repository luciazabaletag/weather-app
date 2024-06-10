import { useContext } from "react";
import ContextWeather from "../context/weatherProvider";

const useWeather = () => {
  return useContext(ContextWeather)
}

export default useWeather
