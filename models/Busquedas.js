const { default: axios } = require("axios")


class Busquedas {

  historial = []
  
  constructor() {
    this.API_KEY = process.env.MAPBOX_KEY
  }

  get paramsMapBox() {
    return {
      'access_token': this.API_KEY,
      'limit': 5,
      'language': 'es'
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
      datos = data.features
    } catch (error) {
      console.log(error.response);
      datos = []
    }
    return datos
  }
}

module.exports = Busquedas;