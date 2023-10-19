# Documentación de la API

## Descripción
Esta API proporciona acceso a una lista de actores en la base de datos. Puedes realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en la lista de actores.

## Rutas
- `GET /actors`: Obtiene la lista de todos los actores.
- `GET /actors/:id`: Obtiene un actor específico por su ID.
- `POST /actors`: Crea un nuevo actor.
- `PUT /actors/:id`: Actualiza un actor existente por su ID.
- `DELETE /actors/:id`: Elimina un actor por su ID.

## Recursos

### Actor
Un actor tiene las siguientes propiedades:
- `actor_id` (entero): El ID único del actor.
- `first_name` (cadena): El nombre del actor.
- `last_name` (cadena): El apellido del actor.
- `last_update` (marca de tiempo): La fecha y hora de la última actualización.

## Ejemplos

### Obtener todos los actores
- **Descripción:** Obtiene la lista de todos los actores en la base de datos.
- **Método:** GET
- **URL:** `/actors`
- **Respuesta exitosa:** Código de estado 200 OK
- **Respuesta exitosa (ejemplo):**
  ```json
  [
    {
      "actor_id": 1,
      "first_name": "Nombre1",
      "last_name": "Apellido1",
      "last_update": "2023-10-19 11:00:00"
    },
    {
      "actor_id": 2,
      "first_name": "Nombre2",
      "last_name": "Apellido2",
      "last_update": "2023-10-19 11:15:00"
    }
  ]
