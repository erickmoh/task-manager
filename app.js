const API = 'http://localhost:3000/tasks';
let currentFilter = 'all';

async function getTasks() {
  const res = await fetch(API);
  let tasks = await res.json();

  const list = document.getElementById('taskList');
  list.innerHTML = '';

  // aplicar filtro
  if (currentFilter === 'active') {
    tasks = tasks.filter(t => !t.completed);
  } else if (currentFilter === 'completed') {
    tasks = tasks.filter(t => t.completed);
  }

  // contador
  document.getElementById('counter').textContent =
    `Total: ${tasks.length} tareas`;

  tasks.forEach(task => {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = task.text;

    if (task.completed) {
      li.classList.add('completed');
    }

    span.onclick = () => toggleTask(task.id);

    const btn = document.createElement('button');
    btn.textContent = '✖';
    btn.onclick = (e) => {
      e.stopPropagation();
      deleteTask(task.id);
    };

    li.appendChild(span);
    li.appendChild(btn);
    list.appendChild(li);
  });
}

function filterTasks(filter) {
  currentFilter = filter;
  getTasks();
}

async function addTask() {
  const input = document.getElementById('taskInput');

  if (input.value.trim() === '') {
    return;
  }

  await fetch(API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text: input.value })
  });

  input.value = '';
  getTasks();
}

async function deleteTask(id) {
  await fetch(`${API}/${id}`, { method: 'DELETE' });
  getTasks();
}

async function toggleTask(id) {
  await fetch(`${API}/${id}`, { method: 'PUT' });
  getTasks();
}

getTasks();