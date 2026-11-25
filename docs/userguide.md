# Guía de uso

CSV Explorer permite abrir y consultar archivos CSV desde el navegador.

> **Para desarrolladores:** las instrucciones para instalar y ejecutar la aplicación están en el [README](../README.md#instalación-local).

## Archivo de ejemplo

Puedes seguir esta guía con tu propio archivo CSV. Si no tienes uno a mano, copia el siguiente contenido en un archivo de texto y guárdalo como `ventas.csv`:

```csv
fecha,ciudad,producto,unidades,precio,importe
2026-01-05,Madrid,Teclado,4,30,120
2026-01-08,Sevilla,Ratón,10,15,150
2026-01-12,Madrid,Pantalla,2,90,180
2026-02-03,Valencia,Teclado,6,30,180
2026-02-10,Madrid,Ratón,10,15,150
2026-02-15,Sevilla,Pantalla,3,90,270
```

La primera fila contiene los nombres de las columnas. Las siguientes representan ventas: cada una incluye una ciudad, un producto y varias cantidades numéricas.

## Abre el archivo

1. En la pantalla inicial, pulsa **Abrir archivo CSV** y selecciona el archivo que quieras consultar.
2. La tabla mostrará sus filas y columnas. La barra superior indica el nombre del archivo y el número de filas y columnas.
3. Para abrir otro archivo, utiliza **Abrir archivo** en la barra superior. La aplicación sustituirá los datos actuales y limpiará la búsqueda.

El contenido se procesa en el navegador y no se envía a un servidor. La aplicación no modifica el archivo original ni conserva los datos al recargar la página.

## Busca filas

Escribe el texto que quieras encontrar en **Buscar filas**. La búsqueda revisa todas las columnas y no distingue mayúsculas ni tildes.

Por ejemplo, en el archivo de muestra, `madrid` muestra las tres ventas de Madrid y `raton` encuentra `Ratón`. También puedes buscar una fecha o una cifra, como `2026-02` o `180`. La búsqueda encuentra coincidencias parciales en cualquier celda; no permite combinar condiciones por columna. Para volver a ver todas las filas, borra el texto de búsqueda.

Si no hay coincidencias, aparece el mensaje **Sin resultados**. La búsqueda abarca todo el archivo, no solo la página visible.

## Consulta una columna

Selecciona la cabecera de una columna para abrir su panel de detalles. Si la columna es numérica, verás su mínimo, máximo y media.

Por ejemplo, en el archivo de muestra:

1. Busca `madrid` y selecciona la cabecera **importe**.
2. El panel mostrará las tres filas coincidentes y estas cifras:
    - **Mínimo:** 120
    - **Máximo:** 180
    - **Media:** 150
3. Borra la búsqueda para calcular las cifras sobre las seis filas: el mínimo será 120, el máximo 270 y la media 175.

Los cálculos incluyen todas las filas que coinciden con la búsqueda, incluso si ocupan varias páginas. Las celdas vacías se ignoran. Para mostrar las estadísticas, la columna debe contener al menos un número y todos sus valores no vacíos deben ser numéricos; si contiene texto, el panel no mostrará cifras. La media se redondea a dos decimales.

Para consultar el valor completo de una celda cuyo texto aparece cortado, selecciónala en la tabla. Puedes cerrar el panel de detalles cuando termines.

## Recorre archivos más grandes

La tabla muestra hasta 100 filas por página. Cuando el resultado ocupa varias páginas, utiliza los controles de paginación para desplazarte entre ellas. Al cambiar la búsqueda, la tabla vuelve a la primera página.

La paginación reduce la cantidad de filas que se dibujan a la vez, pero el archivo completo se lee en memoria. Con archivos muy grandes, el rendimiento dependerá del dispositivo y del navegador.

## Si el archivo no se muestra como esperabas

- **Archivo vacío o sin filas de datos:** comprueba que hay una cabecera y al menos una fila con contenido.
- **Formato inválido:** revisa que las comillas estén correctamente cerradas y vuelve a guardar el archivo.
- **Aviso de formato irregular:** algunas filas pueden tener un número de campos distinto al de la cabecera. La aplicación completa los campos que faltan con celdas vacías y descarta los campos sobrantes; revisa el archivo original si necesitas conservar esos datos.
- **Error de lectura:** comprueba que puedes abrir el archivo en tu equipo y vuelve a seleccionarlo.

Se admiten campos entrecomillados y celdas vacías. El separador se detecta automáticamente; entre los formatos admitidos están los separados por comas, puntos y comas o tabulaciones.
