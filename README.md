# La Granja Don Silvio — lista gastronómica

**Vista estática pública** para consultar la lista mayorista en escritorio y celular.

- **Sitio actualmente publicado:** https://condegraphics.github.io/granja-don-silvio-lista-precios/
- **Repositorio:** https://github.com/condegraphics/granja-don-silvio-lista-precios
- **Rama de esta mejora:** `feat/mobile-sticky-menu-search`
- **Fuente del snapshot:** Hoja maestra de Google Sheets, leída el 2 de octubre de 2026.
- **Lista fechada:** 24 de Septiembre 2026.
- **Contenido:** 134 productos en 12 categorías; se conservan las modalidades y precios cargados en el maestro.

## Estado de sincronización

Esta página es **estática**: los cambios posteriores en Drive **no se reflejan automáticamente**. Para actualizar el boceto hay que volver a generar y subir el HTML. No se publica ningún endpoint de Google ni se habilitan permisos públicos sobre la Hoja maestra.

El repositorio contiene sólo la vista pública, el snapshot de productos/precios y el logo autorizado; excluye columnas internas de revisión y celdas fuente. La página está marcada `noindex` y `robots.txt` bloquea el rastreo mientras sea una vista previa.

## Archivos principales

- `index.html`: contenido semántico y tablas por categoría.
- `styles.css`: diseño responsive mobile-first, menú sticky, estados de foco, vista de impresión y movimiento reducido.
- `script.js`: búsqueda local instantánea por producto o categoría, sin librerías externas.
- `img/logo-la-granja-don-silvio.png`: logo provisto por el cliente.
- `DESIGN.md` y `brand-spec.md`: especificación visual y activos.

## Navegación y búsqueda

El menú desplegable **Categorías** usa el elemento nativo `<details>` y CSS, queda visible durante el scroll y lleva directamente a cada categoría. La lupa abre un campo de búsqueda que filtra los productos al escribir, tolera mayúsculas y acentos y muestra la cantidad de resultados. Un JavaScript local mínimo filtra la lista, actualiza los conteos y cierra los paneles al elegir una categoría; no carga servicios ni librerías externas.

En escritorio las modalidades aparecen en columnas; en pantallas angostas cada producto se presenta como una ficha con el nombre de cada modalidad junto al importe. Las casillas sin importe se muestran como `—`.

## Publicación

La mejora está preparada en la rama `feat/mobile-sticky-menu-search` y **todavía no se publicó**. La URL de Pages indicada arriba continúa sirviendo la versión actual de `main`. Tras la aprobación del Pull Request, GitHub Actions publicará la actualización en esa misma URL. El dominio de producción `lagranjadonsilvio.com` no fue modificado.
