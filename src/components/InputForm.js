import React, { useState } from 'react'
import * as d3 from 'd3-ease'
import { getLocationData, getWeather } from '../helpers'

function InputForm({ dispatch, setViewport, viewport, FlyToInterpolator }) {
  const [location, setLocation] = useState('')

  const submitHandler = async e => {
    e.preventDefault()
    const { latitude, longitude, placeName } = await getLocationData(
      location,
      null,
      null
    )
    dispatch({
      type: 'SET_LOCATION',
      payload: { placeName, latitude, longitude }
    })
    setViewport({
      ...viewport,
      latitude: latitude,
      longitude: longitude,
      zoom: 7,
      transitionDuration: 2500,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: d3.easeCubic
    })
    const weatherData = await getWeather(latitude, longitude)
    dispatch({
      type: 'SET_WEATHER',
      payload: weatherData
    })
    setLocation('')
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <label>Location</label>
          <input
            value={location}
            onChange={e => setLocation(e.target.value)}
            type='text'
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default InputForm
