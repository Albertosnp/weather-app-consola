const { default: axios } = require("axios")

class Busquedas {

  historial = []
  
  constructor() {
    this.API_KEY = 'pk.eyJ1IjoiYWxiZXJ0b3NucCIsImEiOiJja3NrbDQ3Ym0yNmtoMnludThhNnNsbjkyIn0.qTuERVz1eynXCnT-yA-GAA'  
  }

  async buscarCiudad(ciudad) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${ciudad}.json?access_token=${this.API_KEY}`
    let datos = []
    try {
      const { data } = await axios.get(url)
      datos = data.features
    } catch (error) {
      console.log(error.response);
      datos = []
    }
    return datos
  }
}

module.exports = Busquedas;