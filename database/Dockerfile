FROM mysql:latest

ENV MYSQL_DATABASE sakiladb
ENV MYSQL_USER user
ENV MYSQL_PASSWORD 123456
ENV MYSQL_ROOT_PASSWORD 123456

COPY ./sakila-schema.sql /docker-entrypoint-initdb.d/
# COPY ./sakila-data.sql /docker-entrypoint-initdb.d/

EXPOSE 3306
