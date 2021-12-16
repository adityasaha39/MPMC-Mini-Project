import React, { useState } from "react";
import styled from "styled-components";
import Axios from "axios";
import CityComponent from "./modules/CityComponent";
import WeatherComponent from "./modules/WeatherInfoComponent";

export const WeatherIcons = {
  "01d": "https://icons.iconarchive.com/icons/icons-land/weather/256/Sunny-icon.png",
  "01n": "https://uxwing.com/wp-content/themes/uxwing/download/23-nature-and-environment/night.png",
  "02d": "https://icons.iconarchive.com/icons/icons-land/weather/256/Sunny-icon.png",
  "02n": "https://uxwing.com/wp-content/themes/uxwing/download/23-nature-and-environment/night.png",
  "03d": "data:image/png;base64,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",
  "03n": "data:image/png;base64,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",
  "04d": "https://icons.iconarchive.com/icons/icons-land/weather/256/Sunny-icon.png",
  "04n": "https://uxwing.com/wp-content/themes/uxwing/download/23-nature-and-environment/night.png",
  "09d": "https://thumbs.dreamstime.com/b/rain-icon-trendy-flat-style-isolated-grey-background-cloud-rain-symbol-your-web-site-design-logo-app-ui-modern-fore-rain-203778809.jpg",
  "09n": "https://thumbs.dreamstime.com/b/rain-icon-trendy-flat-style-isolated-grey-background-cloud-rain-symbol-your-web-site-design-logo-app-ui-modern-fore-rain-203778809.jpg",
  "10d": "https://thumbs.dreamstime.com/b/rain-icon-trendy-flat-style-isolated-grey-background-cloud-rain-symbol-your-web-site-design-logo-app-ui-modern-fore-rain-203778809.jpg",
  "10n": "https://thumbs.dreamstime.com/b/rain-icon-trendy-flat-style-isolated-grey-background-cloud-rain-symbol-your-web-site-design-logo-app-ui-modern-fore-rain-203778809.jpg",
  "11d": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQjP5_xXIXyyyGPJd9rRzeREdxqB5Pl2ORlw&usqp=CAU",
  "11n": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQjP5_xXIXyyyGPJd9rRzeREdxqB5Pl2ORlw&usqp=CAU",
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 380px;
  padding: 20px 10px;
  margin: auto;
  border-radius: 4px;
  box-shadow: 0 3px 6px 0 #555;
  background: white;
  font-family: Montserrat;
`;

const AppLabel = styled.span`
  color: black;
  margin: 20px auto;
  font-size: 18px;
  font-weight: bold;
`;
const CloseButton = styled.span`
  padding: 2px 3px;
  background-color: black;
  border-radius: 50%;
  color: white;
  position: absolute;
`;

function App() {
  const [city, updateCity] = useState();
  const [weather, updateWeather] = useState();
  const fetchWeather = async (e) => {
    e.preventDefault();
    const response = await Axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fe4feefa8543e06d4f3c66d92c61b69c`,
    );
    updateWeather(response.data);
  };
  return (
    <>
    <Container>
      <AppLabel>Group-10 Weather App</AppLabel>
      {city && weather ? (
        <WeatherComponent weather={weather} city={city} />
      ) : (
        <CityComponent updateCity={updateCity} fetchWeather={fetchWeather} />
      )}
    </Container>
    <Container>Mini Project Under the interest of MPMC LAB</Container>
    <Container><AppLabel>Supervised By:-</AppLabel> Dr.Apangshu Das, ECE, NIT AGARTALA </Container>
    <Container><AppLabel>Contributed By:-</AppLabel> 19UEC032,19UEC040,19UEC091,19UEC114,19UEC115</Container>
    </>
  );
}

export default App;
