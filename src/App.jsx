import Widget from "./components/Widget"
import { WeatherProvider } from "./context/weatherProvider"

function App() {

  return (
    <>
      <WeatherProvider>
        <Widget />
      </WeatherProvider>
      
    </>
  )
}

export default App
