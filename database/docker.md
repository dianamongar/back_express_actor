# Base de datos

Para crear la imagen con mysql y la DB inicial: 
```
docker build -t sakila_img .
```
Luego, creamos el contenedor:
```
docker run -d --name sakila_ct -p 3306:3306 sakila_img
```
Hacemos correr el contenedor:
```
docker start sakila_ct
```
**Nota:** Para ingresar a la DB:
```
docker exec -it sakila_ct bash
```
entramos a la consola del contenedor, ahora nos conectamos a la base "condominiodb":
```
psql -U user --password --db sakiladb
```
(Pedira una contraseña: 123456 )
* Nota: se sale de esta consola con ctrl+D 2 veces
