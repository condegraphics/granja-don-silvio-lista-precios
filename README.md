# La Granja Don Silvio — lista gastronómica

**Vista pública estática** para consultar la lista mayorista desde escritorio y celular.

- **Sitio:** https://condegraphics.github.io/granja-don-silvio-lista-precios/
- **Repositorio:** https://github.com/condegraphics/granja-don-silvio-lista-precios
- **Fuente del snapshot:** Hoja maestra de Google Sheets, leída el 2 de octubre de 2026.
- **Fecha indicada en la lista:** 24 de septiembre de 2026.
- **Contenido del snapshot:** 134 productos en 12 categorías, con las modalidades y precios cargados en el maestro.

## Estado de sincronización

Esta página es **estática**: los cambios posteriores en Drive **no se reflejan automáticamente**. Para actualizar el boceto hay que volver a generar y subir el HTML. No se publica un endpoint de Google ni se habilitan permisos públicos sobre la Hoja maestra.

El repositorio contiene sólo la vista pública, el snapshot de productos/precios y el logo autorizado; excluye columnas internas de revisión y referencias de celdas. La página está marcada `noindex` y `robots.txt` bloquea el rastreo mientras sea una vista previa.

## Navegación y búsqueda

En escritorio, **Categorías** abre un desplegable compacto. En pantallas de hasta 760 px, el mismo control presenta un menú de navegación a pantalla completa: conserva el header sticky, repite el logo arriba, muestra categorías en una columna con divisores y flechas, y ofrece un acceso directo a la búsqueda al pie. El panel usa `<details>` nativo y CSS; el JavaScript local se limita al cierre de los paneles, el foco/teclado y la apertura del buscador. No carga librerías externas.

La lupa abre una búsqueda instantánea por producto o categoría. Tolera mayúsculas y acentos, actualiza el conteo de resultados y permite saltar al primer producto coincidente. En escritorio las modalidades aparecen en columnas; en pantallas angostas cada producto se presenta como ficha con el nombre de la modalidad junto al importe. Las casillas sin precio indicado se muestran como `—`.

## Archivos principales

- `index.html`: contenido semántico y tablas por categoría.
- `styles.css`: diseño responsive, menú sticky/fullscreen, estados de foco, impresión y movimiento reducido.
- `script.js`: búsqueda y soporte accesible de navegación, sin dependencias externas.
- `img/logo-la-granja-don-silvio.png`: logo provisto por el cliente.
- `DESIGN.md` y `brand-spec.md`: especificación visual y activos.

## Publicación

GitHub Pages sirve el contenido de `main` en la URL indicada, mediante GitHub Actions. Los cambios se preparan en ramas de revisión antes de incorporarse. El dominio de producción `lagranjadonsilvio.com` no está conectado ni fue modificado.
