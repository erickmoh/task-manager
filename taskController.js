const fs = require('fs');

const getTasks = () => {
  const data = fs.readFileSync('data.json');
  return JSON.parse(data);
};

const saveTasks = (tasks) => {
  fs.writeFileSync('data.json', JSON.stringify(tasks, null, 2));
};

exports.getAllTasks = (req, res) => {
  res.json(getTasks());
};

exports.createTask = (req, res) => {
  const tasks = getTasks();

  const newTask = {
    id: Date.now(),
    text: req.body.text,
    completed: false
  };

  tasks.push(newTask);
  saveTasks(tasks);

  res.json(newTask);
};

exports.deleteTask = (req, res) => {
  let tasks = getTasks();
  tasks = tasks.filter(t => t.id != req.params.id);

  saveTasks(tasks);
  res.json({ message: 'Eliminada' });
};

exports.toggleTask = (req, res) => {
  let tasks = getTasks();

  tasks = tasks.map(t => {
    if (t.id == req.params.id) {
      t.completed = !t.completed;
    }
    return t;
  });

  saveTasks(tasks);
  res.json({ message: 'Actualizada' });
};