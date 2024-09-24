const CityWeatherCard = ({ weatherDataList }) => {
  return (
    <>
      <div className="mt-6">
        {weatherDataList.length > 0 && (
          <div>
            <div className="text-4xl font-bold text-pink-500 mb-4">Cities: -</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {weatherDataList.map((weather, index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg rounded-lg p-6 cursor-pointer hover:shadow-xl transition-shadow duration-300"
                >
                  <h3 className="text-2xl font-bold text-gray-800">{weather.city}</h3>
                  <p className="text-gray-600 capitalize">{weather.weatherData.weather[0].description}</p>
                  <p className="text-4xl font-semibold text-blue-500">{Math.round(weather.weatherData.main.temp)}°C</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CityWeatherCard;
