import React, { useState, useEffect } from 'react'
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

function HighLowChart({ state }) {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    state.weather.daily.data.forEach(day => {
      setChartData(prev => [
        ...prev,
        {
          weekday: day.weekday,
          date: day.date,
          temperature: [
            day.apparentTemperatureLow.toFixed(0),
            day.apparentTemperatureHigh.toFixed(0),
          ],
        },
      ])
    })
  }, [state.weather.daily.data])

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Temperature Range</h1>

      <ResponsiveContainer width='90%' height={250}>
        <AreaChart
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
          <Area dataKey='temperature' stroke='#8884d8' fill='#8884d8' />

          <Tooltip />
        </AreaChart>
      </ResponsiveContainer>
    </>
  )
}

export default HighLowChart
