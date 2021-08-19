const { leerInput, inquirerMenu, pause } = require("./helpers/inquirer");
require('colors')

const main = async () => {
  let option = 0
  do {
    option = await inquirerMenu()
    console.log("Ha elegido la opcion", option);

    if (option !== 0) await pause()
  } while (option !== 0);
};

main()
