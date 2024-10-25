import { HttpClient } from "@angular/common/http";
import { inject, Inject, Injectable } from "@angular/core";
import { BaseHttpService } from "../../shared/data-access/base-http.service";
import { Observable } from "rxjs";
import { ProductI } from "../../interfaces/product.interface";
import { environment } from "../../../environments/environment.development";

const LIMIT_PER_PAGE = 5

@Injectable({providedIn: 'root'})
export class ProductService extends BaseHttpService {

    // private readonly http = inject(HttpClient)

    // apiUrl = environment.API_URL

    getProducts(page:number):Observable<ProductI[]>{
        return this.http.get<any[]>(`${this.apiUrl}/products`,{
            params: {
                //*por cada pag mostramos 5 prods
                //*paginacion
                limit: page * LIMIT_PER_PAGE
            }
        });
    }


    getProduct(id: string):Observable<ProductI>{
        return this.http.get<ProductI>(`${this.apiUrl}/products/${id}`)
    }
}