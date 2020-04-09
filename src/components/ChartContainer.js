import React from 'react'
import HighLowChart from './HighLowChart'

function ChartContainer({state}) {
  return (
    <>
      <HighLowChart state={state}  />
    </>
  )
}

export default ChartContainer
