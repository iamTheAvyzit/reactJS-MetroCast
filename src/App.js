import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const arrow = ['🡰','🡲','🡱','🡳','🡴','🡵','🡶','🡷']

  const [loc, setLoc] = useState({})
  const [locFrmBttn, setlocFrmBttn] = useState('london')
  const [searchStr, setSearchStr] = useState('london')
  const [curr, setCurr] = useState({
    icon: '',
    text: '',
    temp_c: '',
    temp_f: '',
    wind_mph: '',
    wind_dir: '',
    precip_mm: '',
    humidity: ''
  })
  const [fore, setFore] = useState({
    day0_date:'',
    day1_date:'',
    day2_date:'',
    day0: [],
    day1: [],
    day2: [],
    day0_icon: '',
    day1_icon: '',
    day2_icon: ''
  })

  const handleClick = () => {
    setlocFrmBttn(searchStr)
  }
  
  const URL = `https://api.weatherapi.com/v1/forecast.json?key={YOUR_API_KEY}&days=3&q=${locFrmBttn}`;
  
  useEffect(async () => {
    await fetch(URL)
    .then((res) => res.json())
    .then(({location, current, forecast}) => {
      setLoc(location);
      setCurr({
        icon: current.condition.icon,
        text: current.condition.text,
        temp_c: current.temp_c,
        temp_f: current.temp_f,
        wind_mph: current.wind_mph,
        wind_dir: current.wind_dir,
        precip_mm: current.precip_mm,
        humidity: current.humidity
      });
      setFore({
        day0_date: forecast.forecastday[0].date,
        day1_date: forecast.forecastday[1].date,
        day2_date: forecast.forecastday[2].date,
        day0: forecast.forecastday[0].day,
        day1: forecast.forecastday[1].day,
        day2: forecast.forecastday[2].day,
        day0_icon: forecast.forecastday[0].day.condition.icon,
        day1_icon: forecast.forecastday[1].day.condition.icon,
        day2_icon: forecast.forecastday[2].day.condition.icon
      });
    })
    .catch((err) => {
      console.log(err.message)
      window.alert("Sorry! ☹ City Not Found! 404 Please Reload 😵")
    });

  }, [locFrmBttn]);

  const getDay = (dateStr) => {
    var date = new Date(dateStr).toLocaleString('en-US', {weekday:'long'});
    return date;
  };

  const getArrows = (dir) => {
    switch(dir){
      case "SSE":
      case "SE":
      case "ESE": return arrow[6];
      break;
      case "NNE":
      case "NE":
      case "ENE": return arrow[5];
      break;
      case "NNW":
      case "NW":
      case "WNW": return arrow[4];
      break
      case "WSW":
      case "SW":
      case "SSW": return arrow[7];
      break
      case "S": return arrow[3];
      case "N": return arrow[2];
      case "E": return arrow[1];
      case "W": return arrow[0];
      default: return dir;
    };
  };

  return (
    <div class="container">
    <div class="weather-side">
      <div class="weather-gradient"></div>
      <div class="date-container">
        <h2 class="date-dayname">{getDay(loc.localtime)}</h2><span class="date-day">{loc.name}</span><img class="location-icon" src="https://img.icons8.com/ios/50/ffffff/worldwide-location.png"/><span class="location">{loc.region}</span>
      </div>
      <div class="weather-container"><img class="weather-icon" src={curr.icon}/>
        <h1 class="weather-temp">{curr.temp_c} °C | {curr.temp_f} °F</h1>
        <h3 class="weather-desc">{curr.text}</h3>
      </div>
    </div>
    <div class="info-side">
      <div class="today-info-container">
        <div class="today-info">
          <div class="precipitation"> <span class="title">PRECIPITATION</span><span class="value">{curr.precip_mm}%</span>
            <div class="clear"></div>
          </div>
          <div class="humidity"> <span class="title">HUMIDITY</span><span class="value">{curr.humidity}%</span>
            <div class="clear"></div>
          </div>
          <div class="wind"> <span class="title">WIND</span><span class="value">{curr.wind_mph} mph</span>
            <div class="clear"></div>
          </div>
          <div class="wind-dir"> <span class="title">WIND DIR</span><span class="value">{getArrows(curr.wind_dir)}</span>
            <div class="clear"></div>
          </div>
        </div>
      </div>
      <div class="week-container">
        <ul class="week-list">
          <li class="active"><img class="day-icon" src={fore.day0_icon}/><span class="day-name">{fore.day0_date}</span><span class="day-temp">{fore.day0.maxtemp_c}°C | {fore.day0.mintemp_c}°C</span></li>
          <li><img class="day-icon" src={fore.day1_icon}/><span class="day-name">{fore.day1_date}</span><span class="day-temp">{fore.day1.maxtemp_c}°C | {fore.day1.mintemp_c}°C</span></li>
          <li><img class="day-icon" src={fore.day2_icon}/><span class="day-name">{fore.day2_date}</span><span class="day-temp">{fore.day2.maxtemp_c}°C | {fore.day2.mintemp_c}°C</span></li>
          <div class="clear"></div>
        </ul>
      </div>
      <div class="location-container">
        <input class="location-button" type='text' placeholder='search a city...' onChange={(e) => setSearchStr(e.target.value)}/>
        <button class="location-button" onClick={handleClick}><span>Get Weather</span></button>
      </div>
    </div>
  </div>
  );
};

export default App;
