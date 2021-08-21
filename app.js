const { leerInput, inquirerMenu, pause, ciudadesAelegir } = require("./helpers/inquirer");
require("dotenv").config()
require('colors')
const Busquedas = require("./models/Busquedas");

const main = async () => {
  let option = 0
  const busquedas = new Busquedas()
  do {
    option = await inquirerMenu()
    switch (option) {
      case 1:
        await buscarCiudad(busquedas)
        // Lee el input -> termino-ciudad
        
        break;
    }
    if (option !== 0) await pause()
  } while (option !== 0);
};

const buscarCiudad = async (busquedas) => {
  const lugar = await leerInput('Introduce el nombre del lugar que quiere buscar:\n');
  //Buscar los lugares en API
  const lugares = await busquedas.buscarCiudad(lugar)
  //Seleccionar un lugar
  const id_lugar = await ciudadesAelegir(lugares)
  const lugarSeleccionado = lugares.find(lugar => lugar.id === id_lugar)
  await pause()
  //Mostrar los detalles del lugar clima
  console.log('\nInformación de la ciudad\n'.green);
  console.log('Ciudad', lugarSeleccionado.nombre);
  console.log('Latitud', lugarSeleccionado.lat);
  console.log('Longitud', lugarSeleccionado.lng);
  console.log('Temperatura', );
};


main()
