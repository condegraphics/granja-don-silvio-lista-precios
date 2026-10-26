# Sistema visual — Lista de precios gastronómicos

## Design Read

- **Artefacto:** extensión responsive del catálogo/lista gastronómica pública, construida con HTML, CSS y un JavaScript local mínimo.
- **Audiencia:** compradores gastronómicos mayoristas y personal que consulta precios desde celular o escritorio.
- **Lenguaje visual:** catálogo operativo de frigorífico con navegación mobile editorial a pantalla completa: logotipo arriba, rótulo breve, enlaces verticales con filetes y flechas, y acción de búsqueda al pie.
- **Modo:** extensión del sitio existente; se conserva contenido, identidad, búsqueda, anclas y navegación sticky.
- **Variación visual:** 2/10 — jerarquía estable y previsible; el cambio se concentra en el menú mobile.
- **Movimiento:** 2/10 — feedback breve al convertir las tres líneas en cierre; sin animaciones de contenido.
- **Densidad:** 8/10 — 134 artículos y 12 categorías; el overlay mantiene el acceso a toda la navegación y puede desplazarse internamente.
- **Dependencia de activos:** 7/10 — el logo provisto es el identificador principal y se repite en el panel abierto.
- **Fidelidad de marca:** 10/10 — se conserva logo, Roboto, rojo/verde/negro y jerarquía de precios; la referencia externa aporta sólo el patrón de navegación.

## Decisiones

- **Color:** rojo marca `#B51B24` y `#8F1118`; verde `#24652F` y `#174823`; texto/overlay oscuro `#1D211D`; fondos blanco y `#F7F8F5`; amarillo `#F4C321` exclusivamente para ofertas. En el overlay, texto y divisores blancos con opacidad suficiente para mantener contraste.
- **Tipografía:** Roboto para títulos, navegación, texto, etiquetas e importes; Arial/sans-serif como fallback.
- **Escala tipográfica:** H1 fluido `clamp(38px, 6vw, 66px)`; títulos de categoría 20–27 px; texto base 16 px; enlaces mobile 14–18 px.
- **Espaciado:** escala base de 4 px, con pasos principales 8/12/16/24/32/48/64 px. El panel usa gutters fluidos y respeta las áreas seguras del dispositivo.
- **Radio:** 10 px en filas pequeñas; 18 px en superficies de categoría; 26 px para el hero. El overlay ocupa toda la pantalla y no usa tarjeta flotante.
- **Elevación:** una sombra muy leve en el hero/navegación/categorías; overlay oscuro de pantalla completa y sin sombras pesadas.
- **Composición:** escritorio = tablas comparables por categoría y desplegable compacto; celular = header sticky con hamburguesa y lupa, overlay a pantalla completa con una columna de categorías y CTA al buscador. Los productos continúan como fichas con la modalidad rotulada junto a cada precio.
- **Oferta:** filas cuyo nombre fuente contiene “OFERTA” reciben fondo amarillo claro y una etiqueta textual.
- **Accesibilidad:** tablas semánticas, navegación por anclas, foco visible, salto al contenido, targets táctiles de 44 px, `Escape`, cierre con el mismo control, control de foco, fondo inerte mientras el overlay está abierto, bloqueo de scroll, reflow móvil y respeto a `prefers-reduced-motion`.
- **SEO de preview:** `noindex,nofollow` y `robots.txt` con `Disallow: /`; no se fija canonical de producción.
- **Interacción:** `<details>` y CSS nativos abren el menú; el JavaScript local sincroniza foco/teclado, cierra al elegir una categoría, bloquea el fondo durante el overlay y conecta su CTA con el buscador existente. La búsqueda filtra en el cliente; no se agregan endpoints ni librerías.

## Do / Don't

- **Do:** conservar la estructura, los IDs de sección, los datos, las modalidades y la búsqueda existente.
- **Do:** replicar del referente el patrón de overlay mobile (marca/cierre arriba, rótulo, enlaces con filetes y flechas, acción al pie), no su identidad visual azul.
- **Do:** mantener etiquetas de modalidad explícitas y precios fáciles de comparar.
- **Do:** mostrar “—” donde la fuente no indica importe y conservar el aviso de cambios de precio.
- **Don't:** inferir unidades para celdas que sólo dicen “Precio”.
- **Don't:** incluir estados internos de verificación ni referencias de celdas.
- **Don't:** presentar este snapshot como sincronizado; las ediciones en Drive no actualizan esta página automáticamente.
