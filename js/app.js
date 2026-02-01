'use strict'

//Imports
import {Cart} from './Cart.js';
import {
    generateProducts, 
    showPlaceholderTable,
    showPlaceholderTotal,
    showTable
} from './modules.js'

//Objetos en DOM
//Tabla productos
const tableProducts = document.getElementById("tableProducts");

//Resumen del pedido
const summaryProducts = document.getElementById("summaryProducts");
const totalAmount = document.getElementById("totalAmount");

//Enlace a la API
const URL_API = 'https://api.npoint.io/f6515b2b8819ba33f405';

//Obtiene los datos de productos desde la API
async function getData() {
    const request = await fetch(URL_API);
    const data = await request.json();
    return data;
    
}

//Inicializa la aplicación: carga productos, genera la tabla y el resumen
async function init() {
    try {
        const data = await getData();
        let products = generateProducts(data); 
        const cart = new Cart(products, data.currency);
        const cartInfo = cart.getCart();

        // Limpiar tabla
        tableProducts.innerHTML = '';

        /*Simular tabla vacía*/
        /*products = []*/

        // Mostrar tabla o placeholder si está vacía
        if (products.length === 0) {
            showPlaceholderTable(products, tableProducts);
        } else {
            showTable(cart, products, tableProducts, summaryProducts, totalAmount);
        }

        // Mostrar placeholder del total si no hay productos añadidos
        showPlaceholderTotal(cart, summaryProducts);
        totalAmount.textContent = '0.00' + cartInfo.currency;

    } catch (error) {
        console.error('Error al cargar los datos de la API', error);
    }
}

init();


