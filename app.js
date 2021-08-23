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
        break;
      case 2:
        console.log('\nHistorial de búsquedas\n'.green);
        console.log(busquedas.historial.join('\n'));
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
  if (id_lugar == 0) return
  const lugarSelecc = lugares.find(lugar => lugar.id === id_lugar)
  //Llamada api de tiempo por coordenadas
  const clima = await busquedas.buscarClimaPorLugar(lugarSelecc.lat, lugarSelecc.lng)

  //Mostrar los detalles del lugar clima
  console.clear();
  console.log('\nInformación de la ciudad\n'.green);
  console.log('Ciudad', lugarSelecc.nombre.green);
  console.log('Latitud', lugarSelecc.lat);
  console.log('Longitud', lugarSelecc.lng);
  console.log('Temperatura', clima.main);
  console.log('Descripción', clima.weather[0].description.green);

  //Guardar en db
  busquedas.agregarHistorial(lugar.toUpperCase())
};


main()