const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = 8090;

// Configuración de la conexión a la base de datos
// const pool = new Pool({
//   user: 'user',
//   host: 'localhost',
//   database: 'sakiladb',
//   password: '123456',
//   port: 3306,
// });
const pool = mysql.createPool({
  host: 'localhost',
  user: 'user',
  database: 'sakiladb',
  password: '123456',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
// Middleware para permitir JSON en las solicitudes
app.use(express.json());

// Obtener todos los actores
app.get('/actors', async (req, res) => {
  try {
    const [rows, fields] = await pool.execute('SELECT * FROM actor');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener actores' });
  }
});

// Obtener actor por ID
app.get('/actors/:id', async (req, res) => {
  const actorId = req.params.id;
  try {
    const { rows } = await pool.query('SELECT * FROM actor WHERE id = $1', [actorId]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'Actor no encontrado' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener actor por ID' });
  }
});

// Crear un nuevo actor
app.post('/actors', async (req, res) => {
  const { name, age } = req.body;
  try {
    const { rows } = await pool.query('INSERT INTO actor (name, age) VALUES ($1, $2) RETURNING *', [name, age]);
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear un nuevo actor' });
  }
});

// Actualizar actor por ID
app.put('/actors/:id', async (req, res) => {
  const actorId = req.params.id;
  const { name, age } = req.body;
  try {
    const { rows } = await pool.query('UPDATE actor SET name = $1, age = $2 WHERE id = $3 RETURNING *', [name, age, actorId]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'Actor no encontrado' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar actor por ID' });
  }
});

// Eliminar actor por ID
app.delete('/actors/:id', async (req, res) => {
  const actorId = req.params.id;
  try {
    const { rows } = await pool.query('DELETE FROM actor WHERE id = $1 RETURNING *', [actorId]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'Actor no encontrado' });
    } else {
      res.json({ message: 'Actor eliminado con éxito' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar actor por ID' });
  }
});

app.listen(port, () => {
  console.log(`Servidor Express en ejecución en el puerto ${port}`);
});
