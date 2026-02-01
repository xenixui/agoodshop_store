'use strict'
import {Product} from './Product.js';

/**
 * Genera instancias de la clase `Product` a partir de los datos proporcionados en un objeto JSON.
 * 
 * @param {Object} data -  Objeto que contiene la información de productos.
 * @param {Array<Object>} data.products - Array de objetos con los datos de cada producto.
 * @returns {Array<Product>} Array de instancias de Product generadas.
 */
export function generateProducts (data) {
    let products = [];

    for(let productItem of data.products) {
        const product = new Product (
            productItem.sku, 
            productItem.title, 
            productItem.price, 
            productItem.imageURL
        );
        products.push(product);
        }
    
    return products
}

/**
 * Muestra un placeholder en una tabla HTML cuando no hay productos para mostrar.
 * 
 * Revisa si el array `productList` está vacío. Si lo está, añade
 * una fila (`<tr>`) con un mensaje informativo y la agrega a `tableProducts`.
 * Esto permite indicar al usuario que no existen productos disponibles de manera visual.
 * 
 * @param {Array} productList - Array de productos a mostrar
 * @param {HTMLTableElement} tableProducts - Elemento de tabla donde se insertará el 
 * placeholder si el array viene vacío.
 */
export function showPlaceholderTable (productList, tableProducts) {
    if (!productList || productList.length === 0) {
        const nodeRow = document.createElement('tr');
        const nodeData = document.createElement('td');
        nodeData.colSpan = 5;

        const placeholder = document.createElement('div');
        placeholder.classList.add(
            'flex-container', 
            'flex-column',
            'align-center',
            'justify-center',
            'stacked',
            'placeholder')
    
        placeholder.innerHTML = `
            <span class="material-symbols-outlined">info</span>
            <h3>Sin productos</h3>
            <p>No existen productos a mostrar. Por favor, inténtelo de nuevo más tarde.</p>
        `;
    
        nodeData.appendChild(placeholder);
        nodeRow.appendChild(nodeData);
        tableProducts.appendChild(nodeRow);
    }
}

/**
 *Muestra un placeholder en el resumen del carrito si no hay productos añadidos.
 * 
 * Esta función se usa directamente al inicializar la aplicación para mostrar el 
 * placeholder inicial cuando el carrito está vacío.
 * 
 * @param {Cart} cart - Instancia del carrito que contiene los productos y el total.
 * @param {HTMLElement} summaryContent - Elemento HTML donde se mostrará el placeholder.
 */
export function showPlaceholderTotal(cart, summaryContent) {
    const cartInfo = cart.getCart();

    if (cartInfo.total === 0) {
        const placeholder = document.createElement('div');
        placeholder.classList.add(
            'flex-container',
            'flex-column',
            'align-center',
            'justify-center',
            'stacked',
            'placeholder'
        );

        placeholder.innerHTML = `
            <span class="material-symbols-outlined">info</span>
            <h3>Sin productos añadidos</h3>
            <p>Agregue los productos al carrito para poder procesar su pedido.</p>
        `;

        summaryContent.appendChild(placeholder);
    }
}

/**
 * Renderiza los productos en una tabla HTML mostrando imagen, información,
 * controles de cantidad, precio individual y total por producto.
 * 
 * Por cada producto en productList, la función crea una fila (<tr>) con:
 * - Imagen del producto
 * - Título y SKU
 * - Controles de cantidad (`+` y `-`) y un input de cantidad
 * - Precio unitario
 * - Total del producto (cantidad * precio)
 *
 * También asigna eventos a los botones de cantidad para actualizar el carrito
 * y el resumen.
 * 
 * Nota: Esta función no gestiona placeholders del carrito; eso se hace con 
 * showPlaceholderTotal() o updateSummary().
 * 
 * @param {Cart} cart - Instancia del carrito que contiene los productos y permite acceder a su información.
 * @param {Array<Product>} productList - Array de instancias de Product que se mostrarán en la tabla.
 * @param {HTMLTableElement} tableProducts - Elemento de tabla donde se insertarán las filas de productos.
 * @param {HTMLElement} summaryProducts - Contenedor donde se actualizará el resumen de productos.
 * @param {HTMLElement} totalAmount - Elemento donde se mostrará el total del carrito.
 */
export function showTable(cart, productList, tableProducts, summaryProducts, totalAmount) {

    //Renderizar tabla
    for(const productItem of productList) {
        const row = document.createElement('tr');
        
        //Imagen
        const cellImg =  document.createElement('td');
        const img = document.createElement('img');
        img.classList.add(
            'product-media', 
            'mini');
        img.src = productItem.imageURL;
        cellImg.appendChild(img);

        //Título y SKU
        const cellProduct = document.createElement('td');
        const product = document.createElement('div');
        product.classList.add(
            'flex-container',
            'flex-column', 
            'stacked');
        product.innerHTML = `
            <h3>${productItem.title}</h3>
            <span><strong>Ref: </strong>${productItem.sku}</span>
            `;
        cellProduct.appendChild(product); 

        //Cantidad
        const cellQuantity = document.createElement('td');
        const quantity = document.createElement ('div');
        quantity.classList.add(
            'flex-container', 
            'flex-row', 
            'left', 
            'stacked');
        quantity.innerHTML = `
            <button class="button button secondary material-symbols-outlined icon-only remove">remove</button>
            <input type="number" name="quantity" class="input quantity" value = "0" readonly>
            <button class="button button secondary material-symbols-outlined icon-only add">add</button>
            `;
        cellQuantity.appendChild(quantity);

        // Precio y total
        const cartInfo = cart.getCart();
        const cellPrice = document.createElement('td');
        cellPrice.classList.add('price')
        cellPrice.textContent = productItem.price + cartInfo.currency;
        
        const cellTotal = document.createElement('td');
        cellTotal.classList.add('total');
        cellTotal.textContent = '0.00' + cartInfo.currency;

        // Añadir celdas a la fila
        row.appendChild(cellImg);
        row.appendChild(cellProduct);
        row.appendChild(cellQuantity);
        row.appendChild(cellPrice);
        row.appendChild(cellTotal);

        // Añadir fila a la tabla
        tableProducts.appendChild(row);
        
    }
    
    //Asignar aeventos a los botones de cantidad
    const btnRemove = document.querySelectorAll('.remove');
    const btnAdd = document.querySelectorAll('.add');

    for(let i = 0; i < productList.length; i++) {
        const product = productList[i];

        btnAdd[i].addEventListener('click', function () {
            const productInfo = cart.getInfoProduct(product.sku);
            const quantity = productInfo.quantity;
            updateProduct(cart, product, i, quantity + 1, summaryProducts, totalAmount);
        });

        btnRemove[i].addEventListener('click', function () {
            const productInfo = cart.getInfoProduct(product.sku);
            const quantity = productInfo.quantity;
            updateProduct(cart, product, i, quantity - 1, summaryProducts, totalAmount);
        });
    }
}

/**
 * Actualiza la cantidad de un producto en el carrito y refleja los cambios en la tabla y el resumen.
 * 
 * Esta función realiza los siguientes pasos:
 * 1. Actualiza la cantidad del producto en la instancia del carrito mediante `cart.updateQuantity`.
 * 2. Obtiene la información actualizada del producto y del carrito (`getInfoProduct` y `getCart`).
 * 3. Actualiza el valor del input de cantidad correspondiente en la tabla HTML.
 * 4. Actualiza el total de la fila del producto en la tabla.
 * 5. Llama a `updateSummary()` para recalcular el total del carrito y mostrar los 
 * 
 * Nota: Esta función se utiliza en los botones de añadir (`+`) y quitar (`-`) cantidad
 * dentro de la tabla de productos.
 * 
 * @param {Cart} cart - Instancia del carrito que contiene los productos y el total.
 * @param {Product} product - Instancia del producto cuya cantidad se actualizará.
 * @param {number} index - Índice del producto en la tabla HTML para localizar los elementos
 *                        `.quantity` y `.total`.
 * @param {number} quantity - Nueva cantidad que se asignará al producto.
 * @param {HTMLElement} summaryProducts - Contenedor del resumen de productos que se actualizará.
 * @param {HTMLElement} totalAmount - Elemento donde se mostrará el total del carrito actualizado.
 */
export function updateProduct(cart, product, index, quantity, summaryProducts, totalAmount) {
    cart.updateQuantity(product.sku, quantity);

    const productInfo = cart.getInfoProduct(product.sku);
    const cartInfo = cart.getCart();

    document.querySelectorAll('.quantity')[index].value = productInfo.quantity;
    document.querySelectorAll('.total')[index].textContent =
        (product.price * productInfo.quantity).toFixed(2) + cartInfo.currency;

    updateSummary(cart, summaryProducts, totalAmount);
}

/**
 * Crea un elemento HTML `<div>` que representa un producto en el resumen del carrito.
 * 
 * Este div contiene:
 * - El título del producto.
 * - El total del producto (precio unitario * cantidad) con la moneda correspondiente.
 * 
 * La función obtiene la información actualizada del carrito y del producto usando:
 * - `cart.getCart()` para obtener el total y la moneda.
 * - `cart.getInfoProduct(product.sku)` para acceder a la cantidad del producto.
 * 
 * El elemento devuelto puede agregarse directamente al contenedor del resumen del carrito.
 * Nota: No gestiona placeholders; eso se hace en `updateSummary()` o `showPlaceholderTotal()`.
 * 
 * @param {Cart} cart - Instancia del carrito que contiene los productos y el total.
 * @param {Product} product - Instancia del producto que se desea mostrar en el resumen.
 * @returns {HTMLDivElement} Div que contiene el título y el total del producto listo para insertarse en el DOM.
 */
export function summaryProduct(cart, product) {
    const cartInfo = cart.getCart();
    const productInfo = cart.getInfoProduct(product.sku);
    const productTotal = (product.price*productInfo.quantity).toFixed(2) + cartInfo.currency;

    const div = document.createElement('div');

    div.classList.add(
        'flex-container',
        'flex-row',
        'auto',
        'align-center');
    div.innerHTML = `
        <div class="flex-container flex-row auto align-center">
            <span>${product.title}</span>
            <span>${productTotal}</span>
        </div>
    `
    return div;
}

/**
 * Actualiza el resumen del carrito y el total del pedido en el DOM.
* 
* Esta función realiza los siguientes pasos:
* 1. Limpia el contenido actual del contenedor `summaryProducts`.
* 2. Comprueba si el carrito está vacío (`cartInfo.total === 0`):
*    - Si está vacío, muestra un placeholder mediante `showPlaceholderTotal()`.
*    - Si hay productos, recorre `cartInfo.products` y agrega al resumen
*      cada producto con cantidad mayor a 0 usando `summaryProduct()`.
* 3. Actualiza el total del pedido en el elemento `totalAmount`.
* 
* Nota: No gestiona la tabla de productos; solo actualiza el resumen del carrito
* y el total del pedido.
* 
* @param {Cart} cart - Instancia del carrito que contiene los productos y el total.
* @param {HTMLElement} summaryProducts - Contenedor donde se mostrará el resumen de productos.
* @param {HTMLElement} totalAmount - Elemento donde se mostrará el total del carrito.
 */
export function updateSummary(cart, summaryProducts, totalAmount) {
    const cartInfo = cart.getCart();
    summaryProducts.innerHTML = '';

    if (cartInfo.total === 0) {
        showPlaceholderTotal(cart, summaryProducts);
    } else {
        for (const product of cartInfo.products) {
            if (product.quantity > 0) {
                summaryProducts.appendChild(summaryProduct(cart, product));
            }
        }
    }

    totalAmount.textContent = cartInfo.total.toFixed(2) + cartInfo.currency;
}
