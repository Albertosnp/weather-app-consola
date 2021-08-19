const inquirer = require("inquirer");
require("colors");

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "¿Qué desea hacer?",
    choices: [
      {
        value: '1',
        name: `${'1.'.green} Crear tarea`
      },
      {
        value: '2',
        name: `${'2.'.green} Listar tareas`
      },
      {
        value: '3',
        name: `${'3.'.green} Listar tareas completadas`
      },
      {
        value: '4',
        name: `${'4.'.green} Listar tareas pendientes`
      },
      {
        value: '5',
        name: `${'5.'.green} Completar tarea(s)`
      },
      {
        value: '6',
        name: `${'6.'.green} Borrar tarea`
      },
      {
        value: '0',
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
          return 'Por favor ingrese un valor';
        }
        return true;
      }
    }
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
}

const borrarTarea = async (tareas = []) => {
  tareas = tareas.map((tarea, index) => {
    return {
      value: tarea.id,
      name: `${++index}: `.green + `${tarea.desc}`,
    }
  })
  tareas.unshift({
    value: '0',
    name: `${'0: '.green} Cancelar`
  });
  const preguntaBorrar = [
      {
        type: "list",
        name: "opcion",
        message: "¿Qué tarea desea borrar?",
        choices: tareas,
      }
  ];
  preguntaBorrar
  const { opcion } = await inquirer.prompt(preguntaBorrar);
  return opcion;
}

const completaTareas = async (tareas = []) => {
  const tareasAcompletar = [
    {
      type: "checkbox",
      name: "opcion",
      message: "¿Qué tarea deseas completar?",
      choices: tareas.map((tarea, index) => {
        return {
          value: tarea.id,
          name: `${++index}: `.green + `${tarea.desc}`,
          checked: (tarea.completadoEn)? true : false
        }
      }),
    }
  ];
  const { opcion } = await inquirer.prompt(tareasAcompletar);
  return opcion;
}

module.exports = {
  inquirerMenu,
  pause,
  leerInput,
  borrarTarea,
  confirmar,
  completaTareas,
};
