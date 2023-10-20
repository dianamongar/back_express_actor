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

### Tabla "Actor" de Sakila
Un actor tiene las siguientes propiedades:
- `actor_id` (entero): El ID único del actor.
- `first_name` (cadena): El nombre del actor.
- `last_name` (cadena): El apellido del actor.
- `last_update` (marca de tiempo): La fecha y hora de la última actualización.

## Obtener actores
- **Descripción:** Obtiene la lista de todos los actores en la base de datos.
- **Método y Url:** `GET http://localhost:8090/actors`
- **URL para paginación:** `/actors?page=N&pageSize=N`
- **Respuesta exitosa:** Código de estado 200 OK
- **Parámetros de la Solicitud con paginación**
  - `page` (Opcional): Número de página actual (por defecto: 1).
  - `pageSize` (Opcional): Tamaño de página (por defecto: 10).

Ejemplo de respuesta con parámetros para paginación:
```
GET http://localhost:8090/actors?page=6&pageSize=2
Accept: application/json
```
  ```json
  [
    {
      "actor_id": 11,
      "first_name": "Nombre1",
      "last_name": "Apellido1",
      "last_update": "2023-10-19 11:00:00"
    },
    {
      "actor_id": 12,
      "first_name": "Nombre2",
      "last_name": "Apellido2",
      "last_update": "2023-10-19 11:15:00"
    }
  ]
  ```

## Crear Actor

Este endpoint te permite crear un nuevo actor y almacenarlo en una base de datos MySQL.

- **Método y Url**
  - `POST http://localhost:8090/actors`

- **Parámetros de la Solicitud**
  - Tipo de Contenido: `application/json`
  - Cuerpo de la Solicitud (JSON):
    ```json
    {
      "first_name": "Nombre del Actor",
      "last_name": "Apellido del Actor"
    }
    ```

- **Respuesta Exitosa**
  - Tipo de Contenido: `application/json`

  ```json
  {
    "message": "Actor creado exitosamente",
  }
  ```

  ## Actualizar Actor

Este endpoint te permite actualizar la información de un actor existente en una base de datos MySQL.

- **Método y Url**
  - `PUT http://localhost:8090/actors/id`

- **Parámetros de la Solicitud**
  - Tipo de Contenido: `application/json`
  - Parámetro de Ruta:
    - `id` (Requerido): El ID del actor que deseas actualizar.

  - Cuerpo de la Solicitud (JSON):
    ```json
    {
      "first_name": "Nuevo Nombre",
      "last_name": "Nuevo Apellido"
    }
    ```

- **Ejemplo de Respuesta Exitosa**
  - Código de Estado: 200 (OK)
  - Tipo de Contenido: `application/json`

  ```json
  {
    "message": "Actor actualizado exitosamente",
    "actor": {
      "actor_id": "ID_del_Actor",
      "first_name": "Nuevo Nombre",
      "last_name": "Nuevo Apellido",
      "last_update": "Fecha de Actualización"
    }
  }
  ```

## Eliminar Actor

Este endpoint te permite eliminar un actor existente en una base de datos MySQL.

- **Método y Url**
  - `DELETE http://localhost:8090/actors/207`

- **Parámetros de la Solicitud**
  - Parámetro de Ruta:
    - `id` (Requerido): El ID del actor que deseas eliminar.

- **Respuesta Exitosa**
  - Código de Estado: 200
  ```json
  {
    "message": "Actor eliminado exitosamente"
  }
  ```

- **Respuesta de Error**
  - **Importante**: Cuando un actor esta relacionado con otros elementos de la base de datos no debería eliminarse.
  - Código de Estado: 404 (No Encontrado) o 500 (Error Interno del Servidor)
  - Tipo de Contenido: `application/json`

  ```json
  {
    "error": "Mensaje de Error"
  }
  ```

  ### Notas:
  - Para ver el código de los endpoints, diríjase al archivo `app.js`
  - Se utilizó un contenedor en Docker para la creación y uso de la base de datos, para más detalles diríjase a `database/docker.md`



