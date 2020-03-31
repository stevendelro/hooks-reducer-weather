import React, { useEffect, useReducer } from 'react'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'
import Map from './components/Map'
import FloatingLabel from './components/FloatingLabel'

import { getWeather, getPosition, getLocationData } from './helpers'

function App() {
  const initialState = {
    error: false,
    noWeatherData: true,
    noHistoryData: true,
    noLocationData: true,
    weather: {
      currently: {},
      hourly: {},
      daily: {}
    },
    location: {
      placeName: '',
      latitude: '',
      longitude: '',
      timeSearched: ''
    },
    
    historyList: []
  }

  const reducer = (state, action) => {
    const now = moment()
    const getDate = now.format('L')
    const getTime = now.format('LTS')

    switch (action.type) {
      case 'SET_WEATHER':
        return {
          ...state,
          noWeatherData: false,
          weather: {
            currently: { ...action.payload.currently },
            hourly: { ...action.payload.hourly },
            daily: { ...action.payload.daily }
          }
        }
      case 'SET_LOCATION':
        return {
          ...state,
          noLocationData: false,
          location: {
            placeName: action.payload.placeName,
            latitude: action.payload.latitude,
            longitude: action.payload.longitude
          }
        }
      case 'LOG_LAST_CITY': {
        // Splicing the history list to keep the most recent 7 searches.
        if (state.historyList.length > 7) {
          return {
            ...state,
            noHistoryData: false,
            historyList: [
              ...state.historyList.splice(
                state.historyList.length - 7,
                state.historyList.length
              ),
              {
                key: uuidv4(),
                location: action.payload.location,
                date: getDate,
                timeSearched: getTime
              }
            ]
          }
        } else {
          return {
            ...state,
            noHistoryData: false,
            historyList: [
              ...state.historyList,
              {
                key: uuidv4(),
                location: action.payload.location,
                timeSearched: getTime,
                date: getDate
              }
            ]
          }
        }
      }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  // Auto fetch weather from the browser's Geolocation API
  useEffect(() => {
    getPosition()
      .then(({ coords }) => getWeather(coords.latitude, coords.longitude))
      .then(initialWeather => {
        dispatch({
          type: 'SET_WEATHER',
          payload: initialWeather
        })
      })
  }, [])

  // Auto fetch the name of the browser's Geolocation coordinates.
  useEffect(() => {
    getPosition()
      .then(({ coords }) =>
        getLocationData(null, coords.latitude, coords.longitude)
      )
      .then(locationData => {
        dispatch({
          type: 'SET_LOCATION',
          payload: locationData
        })
      })
  }, [])

  // Add the location of the current weather fetch to search history.
  useEffect(() => {
    if (state.location.placeName) {
      dispatch({
        type: 'LOG_LAST_CITY',
        payload: {
          location: state.location.placeName
        }
      })
    }
  }, [state.location.placeName])

  

  return (
    <div className='App'>
      {state.noWeatherData ? null : <FloatingLabel state={state} />}
      {state.noLocationData ? <h1>Loading..</h1> : <Map state={state} dispatch={dispatch} /> }
    </div>
  )
}

export default App
