import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ProductItemCart } from "../../interfaces/product.interface";


@Injectable({
    providedIn: 'root'
})
//*cargar y guardar nuestros productos sirve este servicio
export class StorageService{

    loadProduct(): Observable<ProductItemCart[]>{

        const rawProducts = localStorage.getItem('products');

        //*si encuentra los prods en el local storage,que los parsee a json, delo contrario devuelve un array vacio
        return of(rawProducts ? JSON.parse(rawProducts): [])

    }


    //*para guardar los prods
    saveProducts(products: ProductItemCart[]):void{
        localStorage.setItem('products', JSON.stringify(products))
    }

}