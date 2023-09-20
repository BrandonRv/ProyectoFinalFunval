const tabs = document.querySelectorAll('.btn-all');
const line = document.querySelector('.line');
const allBtn = document.getElementById('all-btn');
const activeBtn = document.getElementById('active-btn');
const completedBtn = document.getElementById('completed-btn');
const formTask = document.getElementById('formTask');
document.getElementById('formTask').addEventListener('submit', addTask);
const tareasCheck = document.querySelectorAll('.contenido-check');
const listaTarea = document.getElementById('lista-tarea');


tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    tabs.forEach(tab => {
      tab.classList.remove('activo');
    });

    tab.classList.add('activo');

    let botonAncho = tab.offsetWidth + 45;
    let botonIzquierda = tab.offsetLeft - 25;

    line.style.width = botonAncho + "px";
    line.style.left = botonIzquierda + "px";

    if (index === 2) {
      document.getElementById('tareasADD').style.display = 'none';
      document.getElementById('borrarrALL').style.display = 'block';
    } else {
      document.getElementById('tareasADD').style.display = 'block';
      document.getElementById('borrarrALL').style.display = 'none';
    }

    switch (index) {
      case 0:
        showTasks('all');
        break;
      case 1:
        showTasks('activas');
        break;
      case 2:
        showTasks('completadas');
        break;
    }
  });
});

/* Los siguientes nombres de funciones son una sugerencia de funciones que necesitarás en tu programa,
sin embargo, no te limites solo a estas funciones. Crea tantas como consideres necesarias.

La estructura de cada objeto "tarea" es la siguiente:

{
  id: 1,
  title: "tarea",
  completed: false
}

*/


/////////////// FUNCION PARA ACTUALIZAR EL LOCALSTORAGE//////////////////

function updateLocalStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


///////////FUNCION OARA MOSTRAR TODAS LAS TAREAS///////////////////////////

function showTasks(filterType) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  listaTarea.innerHTML = '';

  if (tasks) {
    tasks.forEach(task => {
      if (filterType === 'activas' && task.completada) {
        return; 
      }
      if (filterType === 'completadas' && !task.completada) {
        return; 
      }

      const tarea = task.tarea;
      const completada = task.completada;

      const taskDiv = document.createElement('div');
      taskDiv.classList.add('tarjeta');

      const taskBodyDiv = document.createElement('div');
      taskBodyDiv.classList.add('card-body');

      const space = document.createElement('br');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.classList.add('checkboxTarea');
      checkbox.checked = completada;

      const taskText = document.createElement('span');
      taskText.textContent = " " + tarea;

      if (completada) {
        taskText.classList.add('completadas');
      }

      checkbox.addEventListener('change', () => {
        const isChecked = checkbox.checked;
        task.completada = isChecked;
        updateLocalStorage(tasks); 
        showTasks(filterType); 
      });

      taskBodyDiv.appendChild(space);
      taskBodyDiv.appendChild(checkbox);
      taskBodyDiv.appendChild(taskText);

      if (filterType === 'completadas') {
        const spann = document.createElement('a');
        spann.classList.add('fa-regular', 'fa-trash-can');
        spann.setAttribute('onclick', `deleteTask('${tarea}')`);
        taskBodyDiv.appendChild(spann);
      }

      taskDiv.appendChild(taskBodyDiv);
      listaTarea.appendChild(taskDiv);
    });
  }
}



// Función para añadir una nueva tarea
function addTask(e) {
  e.preventDefault();

  const tarea = document.getElementById('todo-input').value;

  if (!tarea) {
    alert("Por favor, ingrese una tarea válida ❗❗❗");
    return;
  }

  let lastId = localStorage.getItem('lastId') || 0;
  let task = {
    id: parseInt(lastId) + 1,
    tarea,
    completada: false
  };

  if (!localStorage.getItem('tasks')) {
    localStorage.setItem('tasks', JSON.stringify([]));
  }

  let tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  localStorage.setItem('lastId', task.id);

  document.getElementById('todo-input').value = '';
  showTasks('all');
}

// Función para marcar una tarea como completada o imcompleta (Puede ser la misma función)
function completeTask() {

}

// Función para borrar una tarea
function deleteTask(tarea) {
  let tasks = JSON.parse(localStorage.getItem('tasks'));

  tasks = tasks.filter(task => task.tarea !== tarea);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  showTasks('all');
}

if (allBtn.classList.contains('activo')) {
  showTasks('all');
} else if (activeBtn.classList.contains('activo')) {
  showTasks('activas');
} else if (completedBtn.classList.contains('activo')) {
  showTasks('completadas');
}

allBtn.classList.add('activo');

// Funcion para borrar todas las tareas
function deleteAll() {
  localStorage.removeItem('tasks');
  listaTarea.innerHTML = '';
}

// Función para filtrar tareas completadas
function filterCompleted() {
    
}

// Función para filtrar tareas incompletas
function filterUncompleted() {

}

