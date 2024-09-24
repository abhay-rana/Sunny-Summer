import { useState } from 'react';
import { WEATHER_API } from '../../env';
import axios from 'axios';

const SearchCity = ({ setWeatherDataList }) => {
  const [cities, setCities] = useState('');
  const [invalidCities, setInvalidCities] = useState([]);
  const [loading, setLoading] = useState(false); // New loading state
  const [recommendedCity, setRecommendedCity] = useState(null); // New state for recommended city


  const fetchWeather = async (cityList) => {
    const validWeatherData = [];
    const invalidCityList = [];
    setLoading(true); 
    setWeatherDataList([])
    setInvalidCities([])

    const requests = cityList.map(city =>
      axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_API}`
      ).then(response => {
        validWeatherData.push({
          city: response.data.name,
          weatherData: response.data
        });
      }).catch(error => {
        invalidCityList.push(city);
      })
    );

    await Promise.all(requests);

    setWeatherDataList((prevList) => [...prevList, ...validWeatherData]);
    setInvalidCities(invalidCityList);
    

     //  recommended city
    const recommended = validWeatherData.find(weather => {
      const temp = Math.round(weather.weatherData.main.temp);
      const condition = weather.weatherData.weather[0].main;
      return temp >= 20 && temp <= 30 && (condition === 'Clear' || condition === 'Sunny' || condition=== "Rain");
    });
        setRecommendedCity(recommended ? recommended.city : null); // Set recommended city

        setLoading(false); // Set loading to false after fetching


  };

  const handleSearch = () => {
    if(cities.length>0){
      const cityList = cities.split(',').map(city => city.trim());
      if (cityList.length > 0) {
        fetchWeather(cityList);
      }
    }else{
      setWeatherDataList([])
      setInvalidCities([])
    }
    
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2 mt-16">
      {/* Input and button in a row */}
      <div className="flex space-x-2">
        <input
          type="text"
          value={cities}
          onChange={(e) => setCities(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter cities (comma separated)"
          className="w-[250px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="w-36 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    disabled={loading} // Disable input while loading

        >
          Check Weather
        </button>
      </div>

       {/* Display loading text if loading is true */}
      {loading && <div className="text-blue-500 font-bold mt-2">Loading...</div>}

      {/* Display invalid cities */}
      {invalidCities.length > 0 && (
        <div className="text-red-600 font-bold">
          <h4>Invalid Cities:</h4>
          <ul className="list-disc list-inside">
            {invalidCities.map((city, index) => (
              <li key={index}>{city}</li>
            ))}
          </ul>
        </div>
      )}

       {/* Recommended City Display */}
      {recommendedCity && (
        <div className="mt-4 text-green-600 font-bold">
          Recommended City for Travel between (20-30)°C: <span className="text-blue-500">{recommendedCity}</span>
        </div>
      )}
    </div>
  );
};

export default SearchCity;
