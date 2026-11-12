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

# Convención de imports

- Usa el alias más cercano (`@components`, `@features`, `@`); la importación relativa (`./modulo`) solo para módulos del mismo directorio.
- Aplicado por oxlint; oxfmt agrupa los alias con los imports locales.

# Pruebas y validación

- Añade pruebas para la lógica que tenga casos límite relevantes.
- Tras aplicar cambios, se considera apta la validación si los siguientes comandos no lanzan errores: `pnpm lint`, `pnpm format:check`, `pnpm test`, `pnpm build`.
- No afirmes que una prueba se ha ejecutado correctamente si no la has ejecutado.

# Commits

- Por defecto, no hagas commits de los cambios; solo haz commit cuando el usuario lo pida de manera explícita.
- Cuando se pida hacer commits, crea una rama cuyo nombre esté relacionado con la feature que se esté implementando y haz los commits en fast forward.

# Forma de trabajar

- Aborda una tarea cada vez y limita los cambios a lo necesario.
- Antes de implementar, inspecciona el código existente y sigue sus convenciones.
- Explica brevemente las decisiones técnicas relevantes.
- Si faltan requisitos importantes o hay varias soluciones con diferencias significativas, pregunta antes de asumir.
- No añadas herramientas, configuraciones o patrones arquitectónicos por anticipado.
