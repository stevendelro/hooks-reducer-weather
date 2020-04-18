import React, { useState } from 'react'
import styled from 'styled-components'
import ReactMapGL, { Marker, FlyToInterpolator } from 'react-map-gl'
import { mapBoxToken } from '../helpers'
import InputForm from './InputForm'
import FloatingLabel from './FloatingLabel'
import Header from './ui/Header'

const StyledTemps = styled.div`
  margin: 12px;
  background-color: rgba(40, 40, 40, 0.6);
  z-index: 1 !important;
  color: #fff;
  padding: 1rem;
  font-weight: bold;
  font-size: -webkit-xxx-large;
  position: absolute;
  top: 42%;
  left: 78%;
`

function Map({ state, dispatch }) {
  const [viewport, setViewport] = useState({
    width: 800,
    height: 400,
    latitude: state.location.latitude,
    longitude: state.location.longitude,
    zoom: 10,
  })

  return (
    <>
      <Header
        setViewport={setViewport}
        viewport={viewport}
        FlyToInterpolator={FlyToInterpolator}
        dispatch={dispatch}
      />
      <div>
      {state.noLocationData ? null : <FloatingLabel state={state} />}
      <ReactMapGL
        {...viewport}
        mapStyle='mapbox://styles/mapbox/outdoors-v11'
        onViewportChange={setViewport}
        mapboxApiAccessToken={mapBoxToken}>
        <Marker
          latitude={state.location.latitude}
          longitude={state.location.longitude}>
          <span role='img' aria-label='pinned location'>
            📍
          </span>
        </Marker>
        {state.noWeatherData ? null : (
          <StyledTemps>
            <div>
              {`${state.weather.daily.data[0].temperatureHigh.toFixed(0)}°F`}
            </div>
            <hr />
            <div>
              {`${state.weather.daily.data[0].temperatureLow.toFixed(0)}°F`}
            </div>
          </StyledTemps>
        )}
      </ReactMapGL>
      </div>
      
    </>
  )
}

export default Map
