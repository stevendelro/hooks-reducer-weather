import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Bar,
  ComposedChart,
  Legend
} from 'recharts'

const StyledToolTip = styled.div`
  margin: 12px;
  background-color: rgba(248, 248, 255, .8);
  box-shadow: 0 1px 1px rgba(0,0,0,0.12), 
              0 2px 2px rgba(0,0,0,0.12), 
              0 4px 4px rgba(0,0,0,0.12), 
              0 8px 8px rgba(0,0,0,0.12),
              0 16px 16px rgba(0,0,0,0.12);
  color: #1b1e23;
  z-index: 1 !important;
  padding: 20px;
  font-weight: bold;
  font-size: small;
  min-width: 2rem;
`

const CustomTooltip = ({ active, payload }) => {
  if (active) {
    return (
      <StyledToolTip>
        <h2>{payload[0].payload.more.date}</h2>
        <hr />
        <p>High: {payload[0].payload.more.apparentTemperatureHigh.toFixed(0)}°F</p>
        <p>Low: {payload[0].payload.more.apparentTemperatureLow.toFixed(0)}°F</p>
        {/* <p>Range: {payload[0].temperature[0]}°F - {payload[0].temperature[1]}°F </p> */}
        <p>Chance of rain: {payload[0].payload.more.precipProbability * 100}%</p>
        <p>{payload[0].payload.more.summary}</p>
      </StyledToolTip>
    );
  }

  return null;
};



function HighLowChart({ state }) {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    state.weather.daily.data.forEach(day => {
      setChartData(prev => [
        ...prev,
        {
          weekday: day.weekday,
          date: day.date,
          lo: day.apparentTemperatureLow.toFixed(0),
          hi: day.apparentTemperatureHigh.toFixed(0),
          temperature: [
            day.apparentTemperatureLow.toFixed(0),
            day.apparentTemperatureHigh.toFixed(0),
          ],
          more: day
        }
      ])
    })
  }, [state.weather.daily.data])

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Daily Forcast</h1>

      <ResponsiveContainer width='90%' height={250}>
        <ComposedChart
          data={chartData}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}>
          <XAxis dataKey='weekday' />
          <YAxis unit='°F' />
          <CartesianGrid strokeDasharray='3 3' />
          
          <Bar dataKey='hi' name='High' fill="#ffe2e2" unit='°F' barSize={20} />
          <Bar dataKey='lo' name='Low' fill="#bad7df" unit='°F' barSize={20} />
          <Area dataKey='temperature' name='Temp Range' unit='°F' stroke='#99ddcc' fill='#99ddcc' />
          <Tooltip content={<CustomTooltip/>}/>
          <Legend />
        </ComposedChart>
      </ResponsiveContainer>
    </>
  )
}

export default HighLowChart
