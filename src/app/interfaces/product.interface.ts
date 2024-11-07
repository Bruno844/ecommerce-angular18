
export interface ProductI {
    category: string;
    description: string;
    id:number;
    image: string;
    price:number;
    rating: {
        rate: number,
        count: number
    };
    title: string;
}


//*interface para el carrito de compras
export interface ProductItemCart {

    product: ProductI;
    quantity: number;

}