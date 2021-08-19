const { leerInput } = require("./helpers/inquirer");
require('colors')

const main = async () => {
  const texto = await leerInput()
  console.log(texto.yellow);
};

main()
