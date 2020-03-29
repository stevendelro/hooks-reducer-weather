const initialState = {
  error: false,
  noWeatherData: true,
  weather: {
    currently: {},
    hourly: {},
    daily: {}
  },
  location: {
    placeName: '',
    latitude: '',
    longitude: '',
    timeSearched: ''
  },
  noHistoryData: true,
  historyList: []
}

const weatherReducer = (state, action) => {
  const now = moment()
  const getDate = now.format('L')
  const getTime = now.format('LTS')

  switch (action.type) {
    case 'SET_WEATHER':
      return {
        ...state,
        noData: false,
        weather: {
          currently: { ...action.payload.currently },
          hourly: { ...action.payload.hourly },
          daily: { ...action.payload.daily }
        }
      }
    case 'SET_LOCATION':
      return {
        ...state,
        nodata: false,
        location: {
          placeName: action.payload.placeName,
          latitude: action.payload.latitude,
          longitude: action.payload.longitude
        }
      }
    case 'LOG_LAST_CITY': {
      // Splicing the history list to keep the most recent 7 searches.
      if (state.historyList.length > 7) {
        return {
          ...state,
          noHistoryData: false,
          historyList: [
            ...state.historyList.splice(
              state.historyList.length - 7,
              state.historyList.length
            ),
            {
              key: uuidv4(),
              location: action.payload.location,
              date: getDate,
              timeSearched: getTime
            }
          ]
        }
      } else {
        return {
          ...state,
          noHistoryData: false,
          historyList: [
            ...state.historyList,
            {
              key: uuidv4(),
              location: action.payload.location,
              timeSearched: getTime,
              date: getDate
            }
          ]
        }
      }
    }
    default:
      return state
  }
}
const [state, dispatch] = useReducer(weatherReducer, initialState)