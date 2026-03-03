import React from 'react'
import { useSelector } from 'react-redux'

const ForecastDetails = () => {
    const { forecast, loading, error } = useSelector(state => state.weatherDetails);

    if (loading) return <p className='p-10'>Loading.......</p>;
    if (error) return <p>{error}</p>;
    if (!forecast) return null;

    return (
        <div className="grid grid-cols-3 gap-4 p-4">
            {forecast.map(item => (
                <div key={item.dt} className="card bg-base-200 shadow-md p-4">
                    <h3 className="font-semibold">
                        {new Date(item.dt * 1000).toLocaleString()}
                    </h3>
                    <p>Temp: {(item.main.temp - 273).toFixed(1)} °C</p>
                    <p>Weather: {item.weather[0].description}</p>
                </div>
            ))}
        </div>
    );
}

export default ForecastDetails;