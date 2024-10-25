import { inject, Injectable } from "@angular/core";
import { ProductI } from "../../interfaces/product.interface";
import { signalSlice } from "ngxtension/signal-slice";
import { ProductService } from "./products.service";
import { catchError, map, Observable, of, startWith, Subject, switchMap } from "rxjs";

//*manejamos la interfaz de los prods
interface State {
    product: ProductI | null;
    status: 'loading' | 'success' |'error',

}

@Injectable()
export class ProductDetailStateService{

    private productService = inject(ProductService)

    //** es como redux,manejamos el estado de la aplicacion mediante una libreria llamada ngxtension, entonces usamos el state de los products aca, de manera global, y lo reutilizamos en donde queramos renderizarlo */
    private initialState: State = {
        product: null,
        status: 'loading' as const,
    
    }

   

   

    state = signalSlice({
        initialState: this.initialState,
        actionSources: {
            getById: (_state, s: Observable<string>) => s.pipe(
                switchMap((id) => this.productService.getProduct(id)),
                map(data => ({product: data,status: 'success' as const}))
            )
        }
    });

    
}