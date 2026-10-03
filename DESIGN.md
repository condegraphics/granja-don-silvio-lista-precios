# Sistema visual — Lista de precios gastronómicos

## Design Read

- **Artefacto:** boceto estático de catálogo/lista gastronómica, HTML + CSS sin JavaScript.
- **Audiencia:** compradores gastronómicos mayoristas y personal que consulta precios.
- **Lenguaje visual:** catálogo operativo de frigorífico, directo y legible; tabla de compra con identidad institucional roja y verde.
- **Modo:** greenfield para la ruta de lista de precios; fuente y marca existentes.
- **Variación visual:** 3/10 — jerarquía estable y previsible para comparar importes.
- **Movimiento:** 1/10 — sin animaciones de contenido; navegación nativa y feedback de foco.
- **Densidad:** 8/10 — 134 artículos y 12 categorías, agrupados por modalidades.
- **Dependencia de activos:** 7/10 — el logo provisto es el identificador principal.
- **Fidelidad de marca:** 9/10 — logo original, Roboto, rojo/verde/negro y referencia de tabla del cliente.

## Decisiones

- **Color:** rojo marca `#B51B24` y `#8F1118`; verde `#24652F` y `#174823`; texto `#1D211D`; fondos blanco y `#F7F8F5`; amarillo `#F4C321` exclusivamente para ofertas.
- **Tipografía:** Roboto para títulos, texto, labels e importes; Arial/sans-serif como fallback.
- **Escala tipográfica:** H1 fluido `clamp(38px, 6vw, 66px)`; títulos de categoría 20–27px; texto base 16px; etiquetas 10–13px.
- **Espaciado:** escala base de 4px, con pasos principales 8/12/16/24/32/48/64px.
- **Radio:** 10px en filas pequeñas; 18px en superficies de categoría; 26px para el hero.
- **Elevación:** una sombra muy leve en el hero/navegación/categorías; tablas sin sombra pesada.
- **Composición:** escritorio = tablas comparables por categoría; celular = filas convertidas en fichas con la modalidad rotulada junto a cada precio.
- **Oferta:** filas cuyo nombre fuente contiene “OFERTA” reciben fondo amarillo claro y una etiqueta textual.
- **Accesibilidad:** encabezados de tabla y caption semánticos, navegación por anclas, foco visible, salto al contenido, reflow móvil, contraste y respeto a `prefers-reduced-motion`.
- **SEO de preview:** `noindex,nofollow` y `robots.txt` con `Disallow: /`; no se fija canonical de producción.
- **Interacción:** HTML/CSS nativo; sin buscador, filtros dinámicos, endpoints ni JavaScript porque el alcance acordado es un boceto estático.

## Do / Don't

- **Do:** mantener etiquetas de modalidad explícitas y precios fáciles de comparar.
- **Do:** mostrar “—” donde la fuente no indica importe para una modalidad.
- **Do:** conservar texto de aviso de cambios de precio del maestro.
- **Don't:** inferir unidades para celdas que sólo dicen “Precio”.
- **Don't:** incluir estados internos de verificación ni referencias de celdas.
- **Don't:** presentar este snapshot como sincronizado o listo para producción.
