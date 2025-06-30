const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1/current.json';

const getWeatherByCity = async (req, res) => {
    const { cityName } = req.params;

    try {
        const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(cityName)}&aqi=no`;

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            return res.status(400).json({
                error: data.error?.message || 'Failed to fetch weather data for city'
            });
        }

        const weatherData = formatWeatherResponse(data);
        res.json(weatherData);

    } catch (error) {
        console.error('Weather API Error (City):', error);
        res.status(500).json({
            error: 'Internal server error while fetching weather data'
        });
    }
};

const getWeatherByCoordinates = async (req, res) => {
    const { lat, lon } = req.query;

    try {
        // Validate coordinates
        if (!lat || !lon) {
            return res.status(400).json({
                error: 'Please provide both latitude (lat) and longitude (lon) parameters'
            });
        }

        if (isNaN(lat) || isNaN(lon)) {
            return res.status(400).json({
                error: 'Latitude and longitude must be valid numbers'
            });
        }

        if (lat < -90 || lat > 90) {
            return res.status(400).json({
                error: 'Latitude must be between -90 and 90'
            });
        }

        if (lon < -180 || lon > 180) {
            return res.status(400).json({
                error: 'Longitude must be between -180 and 180'
            });
        }

        const query = `${lat},${lon}`;
        const url = `${BASE_URL}?key=${API_KEY}&q=${query}&aqi=no`;

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            return res.status(400).json({
                error: data.error?.message || 'Failed to fetch weather data for coordinates'
            });
        }

        const weatherData = formatWeatherResponse(data);
        res.json(weatherData);

    } catch (error) {
        console.error('Weather API Error (Coordinates):', error);
        res.status(500).json({
            error: 'Internal server error while fetching weather data'
        });
    }
};

// Helper function to format response consistently
const formatWeatherResponse = (data) => {
    return {
        location: {
            name: data.location.name,
            region: data.location.region,
            country: data.location.country,
            coordinates: {
                lat: data.location.lat,
                lon: data.location.lon
            },
            timezone: data.location.tz_id,
            localtime: data.location.localtime
        },
        current: {
            temperature: {
                celsius: data.current.temp_c,
                fahrenheit: data.current.temp_f
            },
            condition: {
                text: data.current.condition.text,
                icon: data.current.condition.icon
            },
            humidity: data.current.humidity,
            feels_like: {
                celsius: data.current.feelslike_c,
                fahrenheit: data.current.feelslike_f
            },
            wind: {
                speed_kph: data.current.wind_kph,
                speed_mph: data.current.wind_mph,
                direction: data.current.wind_dir,
                degree: data.current.wind_degree
            },
            pressure: {
                mb: data.current.pressure_mb,
                in: data.current.pressure_in
            },
            visibility: {
                km: data.current.vis_km,
                miles: data.current.vis_miles
            },
            uv_index: data.current.uv,
            last_updated: data.current.last_updated
        }
    };
};

module.exports = {
    getWeatherByCity,
    getWeatherByCoordinates
};