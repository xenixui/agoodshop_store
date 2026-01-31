'use strict'

export class Product {
    constructor(sku, title, price, imageURL){
        this.sku = sku;
        this.title = title;
        this.price = Number(price);
        this.imageURL = imageURL;
        this.quantity = 0;
    }
}