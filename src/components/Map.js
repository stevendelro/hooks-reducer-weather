import React, { useState } from 'react'
import ReactMapGL, { Marker, FlyToInterpolator } from 'react-map-gl'
import { mapBoxToken } from '../helpers'
import InputForm from './InputForm'

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
      {state.location.placeName || null}
      <ReactMapGL
        {...viewport}
        onViewportChange={setViewport}
        mapboxApiAccessToken={mapBoxToken}>
        <Marker latitude={viewport.latitude} longitude={viewport.longitude}>
          <span role='img' aria-label='here'>
            📍
          </span>
        </Marker>
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
