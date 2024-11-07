import { Component, inject, OnInit } from '@angular/core';
import { ProductStateService } from '../../data-access/products-state.service';
import { ProductService } from '../../data-access/products.service';
import { ProductI } from '../../../interfaces/product.interface';
import { ProductCardComponent } from '../../ui/product-card/product-card.component';
import { CartStateService } from '../../../shared/data-access/cart-state.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styles: ``,
  providers: [ProductStateService,ProductService]
})
export default class ProductListComponent  {

  // products!: ProductI[]

  // private readonly productService = inject(ProductService)


  // ngOnInit(): void {
  //   this.getAllProducts()
  // }

  // getAllProducts(){
  //   this.productService.getProducts()
  //     .subscribe((data: any) => {
  //       console.log(data);
  //       this.products = data
  //     })
  // }

  productState = inject(ProductStateService);

  cartState = inject(CartStateService).state;

  changePage(){
    //*al ser un observable de multidifusion(subject), usamos el next para pasar a la siguiente escucha, en este caso cambiar de pagina
    const page = this.productState.state.page() + 1;
    this.productState.changePage.next(page)
  }


  addToCart(product: ProductI){
    this.cartState.add({
      product,
      quantity: 1
    })
  }

}
