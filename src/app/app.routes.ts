import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => 
            import('./modules/pessoas/containers/pessoas-list/pessoas-list.component')
                .then(m => m.PessoasListComponent)
    },
    {
        path: 'pessoa/:id',
        loadComponent: () => 
            import('./modules/pessoas/containers/pessoa-detail/pessoa-detail.component')
                .then(m => m.PessoaDetailComponent)
    },
    { 
        path: '**', 
        component: PageNotFoundComponent 
    }
];
