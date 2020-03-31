import React, { useState } from 'react'
import styled from 'styled-components'
import ReactMapGL, { Marker, FlyToInterpolator } from 'react-map-gl'
import { mapBoxToken } from '../helpers'
import InputForm from './InputForm'

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
  left: 79%;
`

function Map({ state, dispatch }) {
  const [viewport, setViewport] = useState({
    width: 800,
    height: 400,
    latitude: state.location.latitude,
    longitude: state.location.longitude,
    zoom: 10
  })

  return (
    <>
      <ReactMapGL
        {...viewport}
        mapStyle='mapbox://styles/mapbox/light-v8'
        onViewportChange={setViewport}
        mapboxApiAccessToken={mapBoxToken}>
        <Marker latitude={state.location.latitude} longitude={state.location.longitude}>
          <span role='img' aria-label='pinned location'>📍</span>
        </Marker>
        {!state.noWeatherData ? (
          <StyledTemps>
            <div>
              {`${state.weather.daily.data[0].temperatureHigh.toFixed(0)}°F`}
            </div>
            <hr />
            <div>
              {`${state.weather.daily.data[0].temperatureLow.toFixed(0)}°F`}
            </div>
          </StyledTemps>
        ) : null}
      </ReactMapGL>
      <InputForm
        setViewport={setViewport}
        viewport={viewport}
        FlyToInterpolator={FlyToInterpolator}
        dispatch={dispatch}
      />
    </>
  )
}

export default Map
