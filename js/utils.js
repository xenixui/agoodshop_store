'use strict'
import {Product} from './Product.js';

/*Generar productos a partir del JSON*/
export function generateProducts (data) {
    let products = [];

    for(let productItem of data.products) {
        const product = new Product (
            productItem.sku, 
            productItem.title, 
            productItem.price, 
            productItem.imageURL
        );
        products.push (product);
    }
    
    return products
}

/*Pintar placeholder en la tabla si los datos no vienen o nos son válidos*/
export function showPlaceholderTable (productList) {
    if (productList.length === 0) {
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
        tableProducts.appendChild(nodeRow)
    }
}

/*Pintar placeholder del resumen si no hay datos*/
export function showPlaceholderTotal(cart, summaryContent) {
    const cartInfo = cart.getCart();
    summaryContent.innerHTML = '';

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

/*Pintar datos en la tabla*/
export function showTable(cart, productList) {
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
}
