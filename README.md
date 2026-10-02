# La Granja Don Silvio — lista gastronómica

**Boceto público estático** para revisar la presentación de la lista mayorista en escritorio y celular.

- **Preview temporal:** https://8765-ix553rnnt9xcblzn6ckcd-d498c742.us1.manus.computer/ (disponible mientras siga activa esta sesión).
- **Repositorio:** https://github.com/condegraphics/granja-don-silvio-lista-precios
- **Rama de trabajo:** `feat/lista-precios-estatica`
- **Fuente del snapshot:** Hoja maestra de Google Sheets, leída el 2 de octubre de 2026.
- **Lista fechada:** 24 de Septiembre 2026.
- **Contenido:** 134 productos en 12 categorías; se conservan las modalidades y precios cargados en el maestro.

## Estado de sincronización

Esta versión es **estática** por pedido: los cambios realizados después en Drive **no se reflejan automáticamente**. Para actualizar el boceto hay que volver a generar y subir el HTML. No se publicó un endpoint de Google ni se habilitaron permisos de edición o lectura pública sobre la Hoja maestra.

El repositorio contiene sólo la vista pública, un snapshot de productos/precios y el logo autorizado; excluye columnas internas de revisión y celdas fuente. La página está marcada `noindex` y `robots.txt` bloquea el rastreo mientras sea una vista previa.

## Archivos principales

- `index.html`: contenido semántico y tablas por categoría.
- `styles.css`: diseño responsive mobile-first, estados de foco, vista de impresión y movimiento reducido.
- `img/logo-la-granja-don-silvio.png`: logo provisto por el cliente.
- `DESIGN.md` y `brand-spec.md`: especificación visual y activos.

## Revisión visual

El menú superior salta directamente a cada categoría. En escritorio las modalidades aparecen en columnas; en pantallas angostas cada producto se presenta como una ficha con el nombre de cada modalidad junto al importe. Las casillas sin importe se muestran como `—`.

## Publicación

GitHub Pages todavía no está habilitado en el repositorio. El dominio de producción `lagranjadonsilvio.com` no fue tocado.
