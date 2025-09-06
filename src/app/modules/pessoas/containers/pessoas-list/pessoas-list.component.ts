import { Component } from '@angular/core';
import { PessoasSearchComponent } from '../../components/pessoas-search/pessoas-search.component';

@Component({
  selector: 'app-pessoas-list',
  standalone: true,
  imports: [
    PessoasSearchComponent
  ],
  templateUrl: './pessoas-list.component.html',
  styleUrl: './pessoas-list.component.scss'
})
export class PessoasListComponent {

}
