import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { COUNTRY_LIST } from "../constants/countryList";

const ContextWeather = createContext()

const WeatherProvider = ({ children }) => {

    const [ countryList, setCountryList ] = useState(COUNTRY_LIST)
    const [ country, setCountry ] = useState('AR')
    const [ background, setBackground ] = useState('')
    const [ spinner, setSpinner ] = useState(true)
    const [ show, setShow] = useState(true)
    const [ dataWeather, setDataWeather ] = useState()
    const [ weatherIcon, setWeatherIcon ] = useState('')
    const [ sunrise, setSunrise ] = useState('')
    const [ sunset, setSunset ] = useState('')
    const [ date, setDate ] = useState('')
    const [ city, setCity ] = useState('Buenos Aires')
    const [ tempNow, setTempNow ] = useState()
    const [ tempMin, setTempMin ] = useState()
    const [ tempMax, setTempMax ] = useState()

    useEffect(() => {
        const getWeather = async () => {
            setSpinner(true)
            const appId = import.meta.env.VITE_API_KEY
            const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=1&appid=${appId}`
            
            try {
            const { data } = await axios(url)
            const { lat, lon } = data[0]
            const urlClima = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`
            const { data: clima} = await axios(urlClima)

            setDataWeather(clima)
            setTempNow(Math.round(clima.main.temp - 273))
            setTempMin(Math.round(clima.main.temp_min - 273))
            setTempMax(Math.round(clima.main.temp_max - 273))

            switch (clima.weather[0].main) {
                case "Clouds":
                    setWeatherIcon('/icons/cloudy.svg')
                    setBackground('/nublado.webp')
                    break;
                case "Thunderstorm":
                    setWeatherIcon('/icons/storm.svg')
                    setBackground('/tormenta.webp')
                break;
                case "Drizzle":
                case "Rain":
                    setWeatherIcon('/icons/rain.svg')
                    setBackground('/lluvia.webp')
                break;
                case "Snow":
                    setWeatherIcon('/icons/snowing.svg')
                    setBackground('/snow.webp')
                break;
                case "Clear":
                case "Smoke":
                    setWeatherIcon('/icons/sun.svg')
                    setBackground('/despejado.webp')
                break;
            
                default:
                    break;
            }

            const dateToday = new Date().toLocaleDateString('es-ES', { weekday:"long", year:"numeric", month:"long", day:"numeric"}).toLocaleUpperCase()
            setDate(dateToday)

            const sunrise = clima.sys.sunrise
            const sunset = clima.sys.sunset
            const timezone = clima.timezone
            setSunrise(new Date((sunrise + timezone) * 1000).toLocaleTimeString('es-ES', {timeStyle: 'short'}))
            setSunset(new Date((sunset + timezone) * 1000).toLocaleTimeString('es-ES', {timeStyle: 'short'}))

            } catch (error) {
                console.log(error)
            } finally {
                setSpinner(false)
                setShow(true)
            }
        }
        getWeather()
        
    }, [city])

    

  return (
    <ContextWeather.Provider
        value={{
            countryList,
            tempNow,
            tempMin,
            tempMax,
            country,
            setCountry,
            city,
            setCity,
            weatherIcon,
            dataWeather,
            date,
            sunrise,
            sunset,
            background,
            spinner,
            setShow,
            show,
        }}
    >
        {children}
    </ContextWeather.Provider>
  )
}

export {
    WeatherProvider,
}

export default ContextWeather