import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-pessoas-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './pessoas-search.component.html',
  styleUrl: './pessoas-search.component.scss'
})
export class PessoasSearchComponent {
    form = this.fb.group({
    nome: [''],
    idadeMin: [''],
    idadeMax: [''],
    sexo: [''],
    status: ['Desaparecido']
  });

  constructor(private fb: FormBuilder) {}
}
