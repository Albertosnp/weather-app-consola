const inquirer = require("inquirer");
require("colors");

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "¿Qué desea hacer?",
    choices: [
      {
        value: 1,
        name: `${'1.'.green} Buscar ciudad`
      },
      {
        value: 2,
        name: `${'2.'.green} Historial`
      },
      {
        value: 0,
        name: `${'0.'.green} Salir`
      },

    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("==========================".green);
  console.log("|  Seleccione una opcion |".white);
  console.log("==========================\n".green);

  const { opcion } = await inquirer.prompt(preguntas);
  return opcion;
};

const pause = async () => {
  const preguntaPaused = [
    {
      type: "input",
      name: "enter",
      message: `Presione ${'ENTER'.green} para continuar`,
    }
  ]
  console.log('\n');
  await inquirer.prompt(preguntaPaused);
}

const confirmar = async () => {
  const preguntaConfirmar = [
    {
      type: "confirm",
      name: "confirmar",
      message: `¿Está seguro de borrar la tarea?`,
    }
  ];
  const { confirmar } = await inquirer.prompt(preguntaConfirmar);
  return confirmar;
}

const leerInput = async (message) => {

  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Por favor introduzca el lugar que quiere buscar';
        }
        return true;
      }
    }
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
}

const ciudadesAelegir = async (ciudades = []) => {
  ciudades = ciudades.map((ciudad, index) => {
    return {
      //TODO cambiar
      value: ciudad.id,
      name: `${++index}: `.green + `${ciudad.place_name}`,
    }
  })
  ciudades.unshift({
    value: '0',
    name: `${'0: '.green} Cancelar`
  });
  const ciudadesAelegir = [
      {
        type: "list",
        name: "opcion",
        message: "¿Qué ciudad quieres elegir?",
        choices: ciudades,
      }
  ];

  const { opcion } = await inquirer.prompt(ciudadesAelegir);
  return opcion;
}



module.exports = {
  inquirerMenu,
  pause,
  leerInput,
  ciudadesAelegir,
  confirmar,
};
