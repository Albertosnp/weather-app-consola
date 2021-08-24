const fs = require('fs');
const { default: axios } = require("axios")

class Busquedas {
  dbPath = './db/db.json'
  historial = []
  
  constructor() {
    this.MAPBOX_KEY = process.env.MAPBOX_KEY
    this.OPEN_WEATHER_KEY = process.env.OPEN_WEATHER_KEY
    this.historial = []
    this.leerDB()
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

  agregarHistorial(ciudad = '') {
    if (this.historial.includes(ciudad)) return 
    
    this.historial.push(ciudad)
    this.guardarDB()
  }

  guardarDB() {
    const payload = {
      historial: this.historial
    }
    fs.writeFileSync(this.dbPath, JSON.stringify(payload))
  }

  leerDB() {
    if (this.historial) {
      const payload = fs.readFileSync(this.dbPath, 'utf-8')
      const { historial }  = JSON.parse(payload)
      this.historial = historial ?? []
    }
  }
}

module.exports = Busquedas;