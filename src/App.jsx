import { useState } from 'react';
import SearchCity from './components/search-city';
import CityWeatherCard from './components/city-weather-card';
import "./App.css"


function App() {
  const [weatherDataList, setWeatherDataList] = useState([]);

  return (
    <div className='h-[100%]'>
      <div className='flex flex-col p-4'>
        <div className='font-bold text-center text-4xl text-blue-400 mt-6'>Sunny Summer</div>
        <SearchCity setWeatherDataList={setWeatherDataList} />
        <CityWeatherCard weatherDataList={weatherDataList} />
      </div>
    </div>
  );
}

export default App;
