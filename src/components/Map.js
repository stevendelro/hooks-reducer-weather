import React from 'react'
import styled from 'styled-components'
import ReactMapGL, { Marker } from 'react-map-gl'
import { mapBoxToken } from '../helpers'
import FloatingLabel from './FloatingLabel'

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

function Map({ state }) {
  return (
    <>
      {state.noLocationData ? null : <FloatingLabel state={state} />}
      <ReactMapGL
        latitude={state.location.latitude}
        longitude={state.location.longitude}
        zoom={10}
        width={800}
        height={400}
        mapStyle='mapbox://styles/mapbox/outdoors-v11'
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
    </>
  )
}

export default Map
