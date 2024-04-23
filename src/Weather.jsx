import React, { useState } from 'react';
import './Weather.css';

const api = {
    key: "80ecc260b86dd233ae04ba7bc1d24bbf",
    base: "https://api.openweathermap.org/data/2.5/"
}

const Weather = () => {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = ev => {
        if (ev.key === "Enter") {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result);
                    setQuery('');
                })
        }
    }

    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"];

        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
            "Friday", "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`;
    }

    let weatherBackground = '';

    if (typeof weather.weather !== "undefined" && weather.weather.length > 0) {
        switch (weather.weather[0].main) {
            case 'Clear':
                weatherBackground = 'clear';
                break;
            case 'Thunderstorm':
                weatherBackground = 'Thunderstorm';
                break;
            case 'Clouds':
                weatherBackground = 'clouds';
                break;
            case 'Rain':
                weatherBackground = 'rain';
                break;
            case 'Snow':
                weatherBackground = 'snow';
                break;
            default:
                weatherBackground = 'default';
        }
    }

    return (
        <div className={`main ${weatherBackground}`}>
            <main>
                <div className='search-bar'>
                    <input
                        type='text'
                        className='search-bar'
                        placeholder='Search...'
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        onKeyPress={(e) => search(e)}
                    />
                </div>

                {typeof weather.main !== "undefined" ? (
                    <div>
                        <div className='location-box'>
                            <div className='location'>
                                {weather.name},{weather.sys.country}
                                <div className='date'>
                                    {dateBuilder(new Date())}
                                </div>
                            </div>
                            <div className='weather-box'>
                                <div className='temp'>
                                    {Math.round(weather.main.temp)}°C
                                </div>
                            </div>
                            <div className='weather'>
                                {weather.weather[0].main}
                            </div>
                        </div>
                    </div>
                ) : (' ')}
            </main>
        </div>
    );
}

export default Weather;