import { FETCH_CURRENT_SUCCESS, FETCH_FORECAST_SUCCESS, FETCH_WEATHER_ERROR, FETCH_WEATHER_PENDING, SET_CITY } from '../constants/weatherConstants'
import axios from 'axios'

const API_KEY = import.meta.env.VITE_WEATHER_API

export const fetchWeatherPending = () => {
    return {
        type: FETCH_WEATHER_PENDING,
    }
}

export const fetchCurrectSuccess = (data) => {
    return {
        type: FETCH_CURRENT_SUCCESS,
        payload: data,
    }
}

export const fetchForecastSuccess = (data) => {
    return {
        type: FETCH_FORECAST_SUCCESS,
        payload: data
    }
}

export const fetchWeatherError = (error) => {
    return {
        type: FETCH_WEATHER_ERROR,
        payload: error
    }
}

export const setCity = (city) => {
    return {
        type: SET_CITY,
        payload: city,
    }
}

export const fetchWeather = (city) => {
    return async (dispatch) => {
        dispatch(fetchWeatherPending())

        // log API key to help debug missing/incorrect env variable
        console.log("using API key for weather requests:", API_KEY)

        try {
            const currentWeatherDetails = await axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
            const forecastDetails = await axios(`https://pro.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`)

            dispatch(fetchCurrectSuccess(currentWeatherDetails.data))
            dispatch(fetchForecastSuccess(forecastDetails.data.list))
        } catch (error) {
            // pick the most informative message we can
            const msg =
                error?.response?.data?.message ||
                error.message ||
                'Something went wrong'
            dispatch(fetchWeatherError(msg))
            console.error('weather fetch failed:', error)
        }
    }
}