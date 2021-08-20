const { leerInput, inquirerMenu, pause, ciudadesAelegir } = require("./helpers/inquirer");
const Busquedas = require("./models/Busquedas");
require('colors')

const main = async () => {
  let option = 0
  do {
    option = await inquirerMenu()
    const busquedas = new Busquedas()
    switch (option) {
      case 1:
        const lugar = await leerInput('Introduce el nombre del lugar que quiere buscar:\n');
        //Buscar los lugares en API
        const ciudades = await busquedas.buscarCiudad(lugar)
        //Seleccionar un lugar
        const ciudad = await ciudadesAelegir(ciudades)
        await pause()
        //Mostrar los detalles del lugar clima
        console.log('\nInformación de la ciudad\n'.green);
        console.log(ciudad);
        console.log('Ciudad', );
        console.log('Latitud', );
        console.log('Longitud', );
        console.log('Temperatura', );
      // Lee el input -> termino-ciudad
        
        break;
    }
    if (option !== 0) await pause()
  } while (option !== 0);
};

main()
