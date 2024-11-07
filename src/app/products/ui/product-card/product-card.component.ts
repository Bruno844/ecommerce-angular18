import { Component, input, output } from '@angular/core';
import { ProductI } from '../../../interfaces/product.interface';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../data-access/products.service';
import { ProductDetailStateService } from '../../data-access/product-detail-state.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styles: ``,
 
})
export  class ProductCardComponent {

  product = input.required<ProductI>();

  //*emite el producto que agreguemos al carrito
  addToCart = output<ProductI>();

  add(event:Event){
    event.stopPropagation();
    event.preventDefault();
    this.addToCart.emit(this.product())

  }

}
