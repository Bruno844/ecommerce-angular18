import { inject, Injectable, Signal } from "@angular/core";
import { ProductItemCart } from "../../interfaces/product.interface";
import { signalSlice } from "ngxtension/signal-slice";
import { StorageService } from "./storage.service";
import { map, Observable } from "rxjs";


interface State {
    products: ProductItemCart[];
    loaded: boolean
}

@Injectable({
    providedIn:'root'
})
export class CartStateService {

    private _storageService = inject(StorageService)

    //*estado inicial sin cargar nada
    private initialState: State = {
        products: [],
        loaded: false
    };

    //*nos devuelve los prods, con el loaded en true
    loadProducts$ = this._storageService.loadProduct().pipe(
        map((products) => ({products, loaded:true }))
    )

    state = signalSlice({
        initialState : this.initialState,
        sources: [this.loadProducts$],
        actionSources: {
            add: (state,action: Observable<ProductItemCart>) => 
                action.pipe(
                    map((product) => this.add(state,product))
                )
        },
        effects: (state) => ({
            load: () => {
                //*aca guardamos en el localStorage los productos
                if(state().loaded){
                    this._storageService.saveProducts(state().products);
                }
                console.log(state.products())
            }
        })
    });

    private add(state: Signal<State>, product: ProductItemCart){

        //*busca si el prod que agreguemos al carrito ya esta agregado por el id
        const isInCart = state().products.find((pInCart) => pInCart.product.id === product.product.id);


        //*si no viene el producto o no hay nada, retorna el estado junto con los productos distintos que se hayan agregado
        if(!isInCart){
            //primero los productos todos, y luego el producto individual
            return{
                products: [...state().products, {...product, quantity: 1}]
            } 
        }

        //*y si agrego le sumo 1
        isInCart.quantity += 1;
        return {
            //* retorno los prods que estamos utilizando en el carrito de compras
            products: [...state().products]
        }


    }


}