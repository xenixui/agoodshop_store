# Agoodshop Cart - Ksenia Konnova

## Sobre el proyecto

En este proyecto se ha maquetado la página de detalle de un producto y del carrito de compras de la tienda web ficticia Agoodshop. Además de la estructura visual, se ha desarrollado la lógica con JS para añadir y quitar productos, actualizar el subtotal de cada producto y recalcular el total del carrito en tiempo real.

El objetivo principal es practicar:

- La estructuración de contenido responsive y la correcta aplicación de HTML semántico y CSS.
- La creación de una interfaz de carrito funcional en JavaScript con clases y módulos.
- La correcta maquetación con HTML semántico y CSS modular.
- La gestión dinámica del contenido del carrito usando DOM y eventos.
________________________________________________________________________________________

## Pautas de elaboración

1. Organización y modularidad:
- El HTML de la página ha sido organizado de forma modular, utilizando las etiquetas semánticas correspondientes para cada elemento: 
    ✅ header, main, section y footer para la estrucura general 
    ✅ article y figure para la representación de productos 
    ✅ form para el formulario

- Productos representados con en una tabla. Integración de placeholder si no hay data.

- CSS modular:
    ✅ global.css → Variables globales y resets.
    ✅ styles.css → Estilos semánticos de estructuras y componentes.
    ✅ Código JS modular con funciones reutilizables para mostrar la tabla de productos y manejar la lógica del carrito.

2. Lógica del carrito
- Añadir productos al carrito y eliminar productos existentes.
- Actualización dinámica de subtotales y total del carrito.
- Placeholder visual cuando el carrito está vacío.
- Integración con datos de la API simulada (npoint.io).
________________________________________________________________________________________

## Maquetación responsive

1. Diseño adaptativo con Flexbox y Grid.

2. Breakpoints basados en la convención de Bootstrap para asegurar buena visualización en móviles y escritorio.

3. Tabla de productos y resumen del carrito se ajustan automáticamente al tamaño de pantalla.
________________________________________________________________________________________

## Formato y entrega

Todos los archivos están estructurados dentro de la carpeta raíz según su propósito:

tarea_4_carrito_ksenia_konnova/
├─ css/
│  ├─ global.css
│  └─ styles.css
├─ js
│  ├─ app.js
│  ├─ Cart.js
│  ├─ modules.js
│  └─ Product.js
├─ media/
├─ cart.html
├─ index.html
└─ readme.md