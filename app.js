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
    const [rows, fields] = await pool.execute('SELECT * FROM actor WHERE actor_id = ?', [actorId]);
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
  const { first_name, last_name } = req.body; // Obtén los datos del actor del cuerpo de la solicitud
  console.log(first_name + ' ' + last_name);
  try {
    const result = await pool.execute(
      'INSERT INTO actor (first_name, last_name) VALUES (?, ?)',
      [first_name, last_name]
    );
    
    res.json({ message: 'Actor creado exitosamente', actor_id: result[0].insertId });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el actor' });
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
