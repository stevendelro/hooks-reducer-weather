import React, { useState } from 'react'
import { getLocationData, getWeather } from './helpers'

function InputForm({ latitude, longitude }) {
  const [location, setLocation] = useState('')
  const [weather, setWeather] = useState({})



  const submitHandler = async e => {
    e.preventDefault()
    const [latitude, longitude, placeName] = await getLocationData(location, null, null)
    const weatherData = await getWeather(latitude, longitude)
    setWeather(weatherData)
    console.log('searched weather', weatherData)
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

// 1. Loaction data will be taken from the browser
// 2. That data will be used to get dark sky weather.
// 3. User can search for a location via the input, which will manually grab data.

//TODO: Implement reducers and global state. Render shit.
