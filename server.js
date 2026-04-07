const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// IMPORTAR RUTAS
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');

// USAR RUTAS
app.use('/tasks', taskRoutes);
app.use('/auth', authRoutes);

// RUTA BASE
app.get('/', (req, res) => {
  res.send('API funcionando 🚀');
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});