import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import axios from 'axios';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Get the user's current location
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation(position.coords);
    });
  }, []);

  useEffect(() => {
    if (location) {
      // Get the current weather data using the OpenWeatherMap API
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=YOUR_API_KEY&units=metric`)
        .then(response => {
          setWeatherData(response.data);
        })
        .catch(error => console.log(error));
    }
  }, [location]);

  if (!weatherData) {
    return <View><Text>Loading...</Text></View>;
  }

  return (
    <View>
      <Text>Current Weather: {weatherData.weather[0].description}</Text>
      <Text>Temperature: {weatherData.main.temp}°C</Text>
    </View>
  );
};

export default Weather;
