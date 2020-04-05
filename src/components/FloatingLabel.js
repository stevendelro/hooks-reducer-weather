import React from 'react'
import styled from 'styled-components'

const StyledFloatingLabel = styled.div`
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  margin: 12px;
  background-color: rgba(40, 40, 40, .6);
  color: #ffffff;
  z-index: 1 !important;
  padding: 20px;
  font-weight: bold;
  font-size: xx-large;
  max-width: 530px;
`

function FloatingLabel({state}) {
  return (
    <StyledFloatingLabel>
      {state.location.placeName}
    </StyledFloatingLabel>
  )
}

export default FloatingLabel
