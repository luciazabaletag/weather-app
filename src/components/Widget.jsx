import useWeather from "../hooks/useWeather"
import { Transition } from '@headlessui/react'

const Widget = () => {

  const { 
    countryList, 
    setCountry, 
    country, 
    setCity, 
    city, 
    tempNow, 
    tempMin, 
    tempMax, 
    date, 
    weatherIcon, 
    dataWeather, 
    sunrise, 
    sunset,
    background,
    spinner,
    setShow,
    show,
  } = useWeather()

    const handleChange = (e) => {
      setCountry(e.target.value);
      const city = countryList.find((city) => city.value === e.target.value);
      setCity(city.cityName)
      setShow(false)
    };

     const transitionClasses = {
      enter: 'transition-opacity duration-1000',
      enterFrom: 'opacity-0',
      enterTo: 'opacity-100',
      leave: 'transition-opacity duration-1000',
      leaveFrom: 'opacity-100',
      leaveTo: 'opacity-0',
    };

  return (
    <>
    { spinner ? (
      <div className="w-full flex justify-center items-center h-screen">
      <div className="animate-spin inline-block w-10 h-10 border-[4px] border-current border-t-transparent text-blue-500 rounded-full" role="status" aria-label="loading">
          <span className="sr-only">Cargando...</span>
      </div>
  </div>
    ) : (
      <>
      <Transition show={show} appear={true} {...transitionClasses}>
      <div style={{backgroundImage: `url(${background})`}} className='h-screen w-screen bg-cover bg-no-repeat relative flex items-center justify-center'>
        <div className="bg-black opacity-50 h-screen w-full">
        </div>
          <div className="backdrop-blur-sm bg-white/10 backdrop-brightness-150 rounded-xl pb-5 shadow-lg max-w-md absolute md:w-full">
            <div className="px-5 md:px-10 mt-5">
              <select value={country} onChange={handleChange} className="text-white text-lg bg-transparent cursor-pointer flex justify-between w-full">
              { countryList.map( country => (
                  <option key={country.value} value={country.value} className="bg-transparent text-sm text-gray-800">{country.label}</option>
                  ))}
              </select>
              <p className="text-white text-xs">{city}</p>
            </div>
            <div className="px-6 mt-8 flex gap-6 md:gap-0 justify-around items-center">
              <div>
                <img className="w-20 h-20 md:w-24 md:h-24" src={weatherIcon} alt="icon weather"/>
              </div>
              <div>
                <p className="text-white text-5xl md:text-7xl">{tempNow}°C</p>
              </div>
            </div>
            <div className="mt-8 px-5 md:px-10 w-full">
              <div className="text-center text-white font-semibold text-sm md:text-md">
              {date}
              </div>
            </div>
            <div className="mt-4 md:mt-2 px-5 md:px-10 flex justify-around items-center mb-4">
              <div className="flex flex-col gap-1 items-center rounded-md ">
                <p className="text-white text-4xl md:text-5xl flex items-center gap-2">{tempMin}° <span className="text-3xl">/</span> {tempMax}°</p>
                <p className="text-white text-xs md:text-sm">MÍN - MÁX</p>
              </div>
            </div>
            <div className="px-5 md:px-10 mt-8 flex justify-between w-full">
              <div className="flex items-center flex-col justify-center md:flex-row gap-1">
                <img src="/icons/humidity.svg" alt="imagen lluvia" />
                <p className="text-white text-sm">{dataWeather?.main.humidity}%</p>
              </div>
              <div className="flex items-center flex-col justify-center md:flex-row gap-1">
                <img src="/icons/viento.svg" alt="imagen viento" />
                <p className="text-white text-sm">{Math.round(dataWeather?.wind.speed)} km/h</p>
              </div>
              <div className="flex items-center flex-col justify-center md:flex-row gap-1 ">
                <img src="/icons/presion.svg" alt="imagen presion" />
                <p className="text-white text-sm">{Math.round(dataWeather?.main.pressure)} hPa</p>
              </div>
            </div>
            <div className="mt-4 px-5 md:px-10 flex justify-around">
              <div className="flex flex-col items-center">
                <img src="/icons/sunrise.svg" alt="icon amanecer"/>
                <p className="text-white text-sm">{sunrise}</p>
              </div>
              <div className="flex flex-col items-center">
                <img src="/icons/sunset.svg" alt="icon atardecer"/>
                <p className="text-white text-sm">{sunset}</p>
              </div>
            </div>
          </div>
      </div>
      </Transition>
      </>
    )}
    </>
  )
}

export default Widget