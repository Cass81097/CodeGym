export class Jewelry {

    constructor(id, name, price, image) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._image = image;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }

    get image() {
        return this._image;
    }

    set image(value) {
        this._image = value;
    }
}