'use strict'

/*=====Imports=====*/
import {Cart} from './Cart.js';
import {
    generateProducts, 
    showPlaceholderTable,
    showPlaceholderTotal,
    showTable
} from './utils.js'

/*=====Objetos en DOM=====*/
/*Tabla productos*/
const tableProducts = document.getElementById("tableProducts");
/*Resumen del pedido*/
const summaryProducts = document.getElementById("summaryProducts");
const totalAmount = document.getElementById("totalAmount");

/*=====Traer datos de la API=====*/
const URL_API = 'https://api.npoint.io/f6515b2b8819ba33f405';

let products = [];
let cart;

fetch(URL_API)
.then(response => response.json())
.then(data => {
    products = generateProducts(data);

    cart = new Cart(products, data.currency);
    const cartInfo = cart.getCart();
    
    /*Simular tabla vacía*/
    /*products = []*/

    showPlaceholderTable(products);
    showTable(cart, products);
    showPlaceholderTotal(cart, summaryProducts);
    cartEvents(products);
    totalAmount.textContent = '0.00' + cartInfo.currency;
})
.catch(error => {
    console.error('Error al cargar la API', error);
}); 

/*Pintar datos en la tabla*/
/*function showTable(productList) {
    for(const productItem of productList) {
        const row = document.createElement('tr');
        
        const cellImg =  document.createElement('td');
        const img = document.createElement('img');
        img.classList.add(
            'product-media', 
            'mini');
        img.src = productItem.imageURL;
        cellImg.appendChild(img);

        const cellProduct = document.createElement('td');
        const product = document.createElement('div');
        product.classList.add(
            'flex-container',
            'flex-column', 
            'stacked');
        product.innerHTML = `
            <h3>${productItem.title}</h3>
            <span>Ref: </strong>${productItem.sku}</span>
            `;
        cellProduct.appendChild(product); 

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

        const cartInfo = cart.getCart();

        const cellPrice = document.createElement('td');
        cellPrice.classList.add('price')
        cellPrice.textContent = productItem.price + cartInfo.currency;
        
        const cellTotal = document.createElement('td');
        cellTotal.classList.add('total');
        
        cellPrice.textContent = productItem.price + cartInfo.currency;
        cellTotal.textContent = '0.00' + cartInfo.currency;

        row.appendChild(cellImg);
        row.appendChild(cellProduct);
        row.appendChild(cellQuantity);
        row.appendChild(cellPrice);
        row.appendChild(cellTotal);

        tableProducts.appendChild(row);
    }
}*/

/*Calcular sumario de la tabla y el carrito*/
function cartEvents(productList) {
    const btnRemove = document.querySelectorAll('.remove');
    const btnAdd = document.querySelectorAll('.add');

    for (let i = 0; i < productList.length; i++) {
        const product = productList[i];

        btnAdd[i].addEventListener('click', function () {
            updateProduct(product, i, product.quantity + 1);
        });

        btnRemove[i].addEventListener('click', function () {
            updateProduct(product, i, product.quantity - 1);
        });
    }
}

/*Actualizar cantidad de producto*/
function updateProduct(product, index, quantity) {
    cart.updateQuantity(product.sku, quantity);

    const productInfo = cart.getInfoProduct(product.sku);
    const cartInfo = cart.getCart();

    document.querySelectorAll('.quantity')[index].value = productInfo.quantity;
    document.querySelectorAll('.total')[index].textContent =
        (product.price * productInfo.quantity).toFixed(2) + cartInfo.currency;

    updateSummary();
}

/*Obtener nombre y total de un producto en el carrito*/
function summaryProduct(product) {
    const cartInfo = cart.getCart();
    const productTotal = (product.price*product.quantity).toFixed(2) + cartInfo.currency;

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

/*Actualizar total del producto y carrito*/
function updateSummary() {
    const cartInfo = cart.getCart();
    summaryProducts.innerHTML = '';

    if (cartInfo.total === 0) {
        showPlaceholderTotal();
    } else {
        for (const product of cartInfo.products) {
            if (product.quantity > 0) {
                summaryProducts.appendChild(summaryProduct(product));
            }
        }
    }

    totalAmount.textContent = cartInfo.total.toFixed(2) + cartInfo.currency;
}




