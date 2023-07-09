import { Jewelry } from "../model/jewelry.js"

export class JewelryServices {

    constructor() {
        this.listJewelry = [];
        this.listJewelry.push(new Jewelry(1, 'Diamond Ring', '15.000$', 'https://morina.vn/wp-content/uploads/2022/03/Ring-0243-Y-1.jpg'),
                              new Jewelry(2, 'Gold Ring', '500$', 'https://qph.cf2.quoracdn.net/main-qimg-cbe3c409e13d1ed5c7cbfd908e783599-lq'),
                              new Jewelry(3, 'Silver Ring', '50$', 'https://www.jcojewellery.com/cdn/shop/products/R034_1500x.jpg?v=1669943775'))
    }

    findAll() {
        return this.listJewelry;
    }

    addJewelry(jewelry) {
        this.listJewelry.push(jewelry);
    }

    findJewelryByName(search) {
        let jewelrySearched = this.listJewelry.filter(item => item.name.toLowerCase().includes(search.toLowerCase())|| item.name.includes(search));
        return jewelrySearched;
    }

    deleteJewelry(id) {
        this.listJewelry = this.listJewelry.filter(jewelry => jewelry.id != id);
        return this.listJewelry;
    }

    findJewelryById(id) {
        for (const jewelry of this.listJewelry) {
            if (jewelry.id == id) {
                return jewelry;
            }
        }
    } 

    save(jewelry) {
        let checkExist = false; 
        for (let i = 0; i < this.listJewelry.length; i++) {
            if (this.listJewelry[i].id == jewelry.id) {
                this.listJewelry[i] = jewelry;
                checkExist = true;
            }
        }
        if (!checkExist) {
            this.listJewelry.push(jewelry);
        }
    }
    
    sortByID() {
        let sortedID = this.listJewelry.sort((a, b) => b.id - a.id);
        return sortedID; 
    }

    reSortByID() {
        let sortedID = this.listJewelry.sort((a, b) => a.id - b.id);
        return sortedID; 
    }
}

