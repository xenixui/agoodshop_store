'use strict'

export class Cart {
    constructor(products, currency) {
        this.products = products;
        this.currency = currency;
    }

    /*Actualizar unidades del artículo en el carrito*/
    updateQuantity(sku, quantity) {
        if (quantity < 0) {
            throw new Error('La cantidad no puede ser negativa');
        }

        for (let product of this.products) {
            if (sku === product.sku) {
                product.quantity = quantity;
                return product.quantity
            }
        }
        throw new Error("SKU no encontrado");
    }

    /*Obtener info de un artículo en el carrito*/
    getInfoProduct(sku) {
        for (const product of this.products) {

            if (sku === product.sku) {
                return {
                    "sku": product.sku,
                    "title": product.title,
                    "quantity": product.quantity
                }
            }
        }
        throw new Error("SKU no encontrado");
    }

    /*Calcular total del carrito*/
    getTotalCart() {
        let total = 0;

        for(const product of this.products) {
            total += product.quantity * product.price;
        }
        
        return total
    }

    /*Obtener información del carrito*/
    getCart() {
        return {
            "total": this.getTotalCart(),
            "currency": this.currency,
            "products": this.products,
        }
    }
}
