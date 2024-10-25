import { Routes } from "@angular/router";

export default [
    {
        path: 'products', loadComponent: () => import('../product-list/product-list.component')  
    },
    {
        //*detalles del prod por su id
        path: 'product/:id',
        loadComponent: () => import('../product-detail/product-detail.component')
    },
    {
        path: '**',
        redirectTo: ''
    }

] as Routes