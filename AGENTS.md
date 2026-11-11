# Vision general

Aplicación web para carga archivos CSV, visualizar sus datos en una tabla y filtrarlos mediante una búsqueda de texto.

El objetivo es construir un MVP pequeño y funcional, priorizando la correción, la simplicidad y la compresión del código.

# Tecnologías

- React
- Typescript
- Vite
- HTML y CSS
- Papa Parse para procesar archivos CSV

# Comandos

- `pnpm install` - Instalar dependencias
- `pnpm run dev` - Iniciar servidor desarrollo
- `pnpm lint` - Ejecutar linter
- `pnpm build` - Comprueba que la aplicación compila correctamente
- `pnpm test` - Ejecuta tests
- `pnpm format` - Ejecuta formatter
- `pnpm format:check` - Ejecuta formatter en modo check sin aplicar

# Convenciones de desarrollo

- Estructura basada en funcionalidades, mantén simple, separa cuando sea necesario.
- Aprovecha las capacidades de Typescript y evita el uso de Any salvo justificación expresa.
- Mantén el código sencillo y evita abstacciones innecesarias o sobreingeniería.
- Separa el procesamiento de archivos CSV de los componentes de React cuando sea razonable.
- Nunca añadas dependencias sin preguntar.
- No implementes funcionalidades que no formen parte de la tarea actual.
- No modifiques archivos ajenos a la tarea sin razón justificada.

# Pruebas y validación

- Añade pruebas para la lógica que tenga casos límite relevantes.
- Comprueba la compilación con `pnpm run build` después de realizar cambios significativos.
- No afirmes que una prueba se ha ejecutado correctamente si no la has ejecutado.

# Forma de trabajar

- Aborda una tarea cada vez y limita los cambios a lo necesario.
- Antes de implementar, inspecciona el código existente y sigue sus convenciones.
- Explica brevemente las decisiones técnicas relevantes.
- Si faltan requisitos importantes o hay varias soluciones con diferencias significativas, pregunta antes de asumir.
- No añadas herramientas, configuraciones o patrones arquitectónicos por anticipado.
