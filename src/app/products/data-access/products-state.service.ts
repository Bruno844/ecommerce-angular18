import { inject, Injectable } from "@angular/core";
import { ProductI } from "../../interfaces/product.interface";
import { signalSlice } from "ngxtension/signal-slice";
import { ProductService } from "./products.service";
import { catchError, map, of, startWith, Subject, switchMap } from "rxjs";

//*manejamos la interfaz de los prods
interface State {
    products:ProductI[];
    status: 'loading' | 'success' |'error',
    page: number
}

@Injectable()
export class ProductStateService{

    private productService = inject(ProductService)

    //** es como redux,manejamos el estado de la aplicacion mediante una libreria llamada ngxtension, entonces usamos el state de los products aca, de manera global, y lo reutilizamos en donde queramos renderizarlo */
    private initialState: State = {
        products: [],
        status: 'loading' as const,
        //*paginacion
        page: 1,
    }

    /**Un Subject RxJS es un tipo especial de Observable que permite la multidifusión de valores a muchos Observadores. Mientras los Observables simples son de monodifusión (cada Observador suscrito es propietario de una ejecución independiente del Observable), los Sujetos son de multidifusión.
    Un Subject es como un Observable, pero permite la multidifusión a muchos Observadores. Los Subject son como EventEmitters: mantienen un registro de múltiples listeners. 
    */
    changePage = new Subject<number>();

    //*El operador switchMap de RxJS permite cambiar a un nuevo observable cada vez que se emite un valor de un observable. Esto es útil para cancelar operaciones en curso y comenzar una nueva basada en el valor emitido más recientemente.
    loadProducts = this.changePage
        .pipe(
            startWith(1),
            switchMap((page) => this.productService.getProducts(page)),
            map((products) => ({products, status: 'success' as const})),
            //* capturamos un error que surga en el stream de datos del observable, y devolvemos este estado de abajo
            catchError(() => {
                return of({
                    //* array de prod vacio
                    products: [],
                    //*status en error
                    status: 'error' as const
                });

            }),
        )

    state = signalSlice({
        initialState: this.initialState,
        sources: [
            //*cuando le demos al boton de cambiar pagina, el status cambia a loading, y la page se actualiza mostrando los nuevos prods
            this.changePage.pipe(map((page) => ({page,status: 'loading' as const}))),

            this.loadProducts
        ],
    });

    // constructor(){
    //     this.state.products(),
        
    // }

}