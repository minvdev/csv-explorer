# CSV Explorer — MVP

## Objetivo

Aplicación web para cargar archivos CSV, visualizar sus datos
y filtrarlos mediante una búsqueda de texto.

## Funcionalidades

- [x] Seleccionar y cargar un archivo CSV local.
- [x] Mostrar las cabeceras y filas en una tabla.
- [ ] Buscar texto en las filas y filtrar los resultados.
- [ ] Mostrar el número de filas y columnas.
- [x] Gestionar errores: archivo vacío, CSV inválido y errores de lectura.
- [x] Paginación: Evitar que la ui se relentice en cada render por exceso de filas.
- [x] Worker para evitar bloqueo con el parser.

## Fuera de alcance

- Backend, autenticación y base de datos.
- Edición de celdas.
- Exportación a Excel.
- Gráficos y filtros avanzados.
- Persistencia de los datos entre sesiones.

## Criterios de aceptación

- La aplicación permite cargar un CSV válido y visualizar sus datos.
- La búsqueda filtra correctamente las filas.
- Los archivos inválidos producen mensajes comprensibles.
- La interfaz contempla los estados inicial, carga, resultado vacío y error.
- La aplicación compila correctamente para producción.
