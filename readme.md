# Agoodshop - Ksenia Konnova

## Sobre el proyecto

En este proyecto se ha maquetado la página de detalle de un producto de una tienda ficticia llamada Agoodshop. Aunque la tienda no existe, la página está basada en el diseño y funcionalidad típica de cualquier tienda online real.

El objetivo principal de la maqueta es practicar la estructuración de contenido responsive y la correcta aplicación de HTML semántico y CSS.
________________________________________________________________________________________

## Pautas de elaboración

1️⃣ Delegación de responsabilidades:
El HTML de la página ha sido organizado de forma modular, utilizando las etiquetas semánticas correspondientes para cada elemento:
    ✅ header, main, section y footer para la estrucura general
    ✅ article y figure para la representación de productos
    ✅ form para el formulario

Las hojas de estilo han sido organizadas seguiendo la estructiura escalable:
    ✅ global.css para variables globales
    ✅ styles.css para estilos semánticos de estructuras y componentes (basados en global.css)
    ✅ Se ha creado una serie de utilidades en style.css para delegar responsabilidades de forma modular
    ✅ Las clases de componente están construidas para mantener el principio de responsabilidad única

2️⃣ Referencia visual
Se han tomado como referencia las imágenes proporcionadas para definir:
    ✅ Tipografía, tamaños de fuente y jerarquía visual de los elementos de texto. Se ha utilizado la tipografía Roboto.
    ✅ Paleta de colores basada en la estructura de Angular Material. Se ha elegido esta forma de nombrar las variables de color según criterio propio, ya que no se especifica explícitamente en la rúbrica.
    ✅ Espaciados y distribución del contenido.
________________________________________________________________________________________

## Puntos personalizados

Se añadieron funcionalidades, estilos y contenido personalizado para dar un toque propio a la maqueta:
    ✅ Navegación responsive en mobile implementada de forma nativa en HTML, sin usar JavaScript (aunque lo ideal sería un menú desplegable).
    ✅ Se añadieron videos y fotos de producto generados por IA para un toque estético.
    ✅ Simulador de valoraciones para el producto principal.
    ✅ Estilos adicionales como bordes redondeados en secciones, badges y cards.
________________________________________________________________________________________

## Maquetación responsive

    ✅ Se ha creado un único archivo HTML (index.html) con CSS adaptativo para que la página se vea correctamente en móvil y escritorio.
    ✅ Se utiliza flexbox y grid para organizar columnas y filas, asegurando que el contenido se adapte correctamente al tamaño de pantalla.
    ✅ Se han utilizado los breakpoints de Bootstrap para los media queries.
________________________________________________________________________________________

## Semántica y accesibilidad

    ✅ Uso de etiquetas semánticas para organizar el contenido de manera lógica y accesible.
    ✅ Se añadieron atributos alt y title para mejorar la accesibilidad del contenido visual y los botones de navegación.
    ✅ Controles en videos para que el usuario pueda gestionar la reproducción.
    ✅ Todos los componentes tienen estados interactivos definidos y cumplen con criterios de usabilidad.
________________________________________________________________________________________

## Formulario

El formulario de sorteo está estructurado según lo solicitado, con campos y botones preparados para funcionar, aunque no es funcional en esta maqueta.
________________________________________________________________________________________

## Formato y entrega

Todos los archivos están estructurados dentro de la carpeta raíz según su propósito:

agoodshop/
├─ css/
│  ├─ global.css
│  └─ styles.css
├─ media/
├─ index.html
└─ readme.md