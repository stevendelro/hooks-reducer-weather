import axios from 'axios'
const mapBoxToken =
    'pk.eyJ1Ijoic3RldmVuZGVscm9zYXJpbyIsImEiOiJjanl2Zndpbmwwb3p3M2lta2xyNjlhc3Q0In0.EUeki9FFRcyDIirOGn26vw'

export const getPosition = () => {
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}


export const getLocationData = async (location, latitude, longitude) => {
  let lat, long, placeName, mapBoxUrl
  if (!location) {
    mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?types=neighborhood&limit=1&access_token=${mapBoxToken}`
  } else {
    mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    location
  )}.json?limit=1&access_token=${mapBoxToken}`
  }
  
  await axios
    .get(mapBoxUrl)
    .then(response => {
      long = response.data.features[0].center[0]
      lat = response.data.features[0].center[1]
      placeName = response.data.features[0].place_name
    })
    .catch(error => console.error('FUCK', error))

  return {
    latitude: lat,
    longitude: long,
    placeName
  }
}

export const getWeather = async (latitude, longitude) => {
  let weatherData
  const proxy = 'https://cors-anywhere.herokuapp.com/'
  const darkSkyToken = '49672afaebb7601daeb3e11bb45cc16f'
  const darkSkiesUrl = `https://api.darksky.net/forecast/${darkSkyToken}/`
  await axios
    .get(`${proxy}${darkSkiesUrl}${latitude},${longitude}?exclude=flags`)
    .then(request => {
      weatherData = request.data
      
    })
    .catch(error => console.log('Error making darksky call: ', error))
  return weatherData
}
