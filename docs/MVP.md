# CSV Explorer — MVP

## Objetivo

Aplicación web para cargar archivos CSV, visualizar sus datos
y filtrarlos mediante una búsqueda de texto.

## Funcionalidades

- [x] Seleccionar y cargar un archivo CSV local.
- [x] Mostrar las cabeceras y filas en una tabla.
- [x] Buscar texto en las filas y filtrar los resultados.
- [x] Mostrar el número de filas y columnas.
- [x] Gestionar errores: archivo vacío, CSV inválido y errores de lectura.
- [x] Paginación: Evitar que la ui se relentice en cada render por exceso de filas.
- [x] Worker para evitar bloqueo con el parser.
- [x] Selector de columnas numéricas con resumen de datos: mínimo, máximo y media.
- [ ] Parser robusto: soporte de comillas, separadores, celdas vacías y entradas inválidas.
- [ ] Diseño final pulido con estilos modernos.

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
- El selector de columnas numéricas muestra el mínimo, máximo y media de la columna.
- El parser maneja comillas, distintos separadores, celdas vacías y entradas inválidas.
- La interfaz presenta el diseño final pulido con estilos modernos.
- La interfaz contempla los estados inicial, carga, resultado vacío y error.
- La aplicación compila correctamente para producción.
