const { default: axios } = require("axios")


class Busquedas {

  historial = []
  
  constructor() {
    this.MAPBOX_KEY = process.env.MAPBOX_KEY
    this.OPEN_WEATHER_KEY = process.env.OPEN_WEATHER_KEY
  }

  get paramsOpenWeather() {
    return {
      'appid': this.OPEN_WEATHER_KEY,
      'units': 'metric',
      'lang': 'es', 
    }
  }

  get paramsMapBox() {
    return {
      'access_token': this.MAPBOX_KEY,
      'limit': 5,
      'language': 'es'
    }
  }

  async buscarClimaPorLugar(lat, lon) {
    const instance = axios.create({
      baseURL: 'https://api.openweathermap.org/data/2.5/weather',
      params: {...this.paramsOpenWeather, lat, lon}
    })
    try {
      const { data }  = await instance.get()
      return data
    } catch (error) {
      console.log(error);
    }
  }

  async buscarCiudad(ciudad) {
    const instance = axios.create({
      baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ciudad}.json`,
      params: this.paramsMapBox  
    })
    let datos = []
    try {
      const { data } = await instance.get()
      datos = data.features.map(lugar => ({
          id: lugar.id,
          nombre: lugar.place_name,
          lat: lugar.center[1],
          lng: lugar.center[0]
        }))
    } catch (error) {
      console.log(error.response);
      datos = []
    }
    return datos
  }
}

module.exports = Busquedas;