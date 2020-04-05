import React, { useState, useEffect } from 'react'
import moment from 'moment'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'

function DailyChart({ state }) {
  const [days, setDays] = useState([])
  const [hiTemps, setHiTemps] = useState([])
  const [loTemps, setLoTemps] = useState([])

  const [hoverData, setHoverData] = useState(null)
  const [chartOptions, setChartOptions] = useState({
    empty: true,
    xAxis: {
      categories: [],
    },
    series: [
      {
        title: 'Hi',
        data: [],
      },
      { data: [] },
    ],
    plotOptions: {
      series: {
        point: {
          events: {
            mouseOver(e) {
              setHoverData(e.target.category)
            },
          },
        },
      },
    },
  })

  useEffect(() => {
    state.weather.daily.data.map(day => {
      setDays(prev => [...prev, moment.unix(day.time).format('ll')])
      setHiTemps(prev => [...prev, Number(day.temperatureHigh.toFixed(0))])
      setLoTemps(prev => [...prev, Number(day.temperatureLow.toFixed(0))])
    })
  }, [])

  useEffect(() => {
    setChartOptions({
      empty: false,
      xAxis: {
        categories: days,
      },
      series: [{ data: hiTemps }, { data: loTemps }],
    })
  }, [days, hiTemps, loTemps])

  return (
    <div>
      {chartOptions.empty ? null : (
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      )}
      <h3>Hovering over {hoverData}</h3>
    </div>
  )
}

export default DailyChart
