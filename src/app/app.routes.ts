import { Routes } from '@angular/router';
import { PessoasListComponent } from './modules/pessoas/containers/pessoas-list/pessoas-list.component';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./modules/pessoas/containers/pessoas-list/pessoas-list.component').then(m => m.PessoasListComponent)
    }
];
