import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IPessoaFiltro } from '../../models/pessoa.model';

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
    MatIconModule],
  templateUrl: './pessoas-search.component.html',
  styleUrls: ['./pessoas-search.component.scss']
})
export class PessoasSearchComponent {
  @Output() filtroChange = new EventEmitter<Partial<IPessoaFiltro>>();

  form = this.fb.group({
    nome: [''],
    idadeMin: [''],
    idadeMax: [''],
    sexo: [''],
    status: ['DESAPARECIDO']
  });

  constructor(private fb: FormBuilder) {}

  private montarFiltro(): Partial<IPessoaFiltro> {
    const v = this.form.value;

    const faixaIdadeInicial =
      v.idadeMin !== null && v.idadeMin !== undefined && String(v.idadeMin).trim() !== ''
        ? Number(v.idadeMin) : undefined;

    const faixaIdadeFinal =
      v.idadeMax !== null && v.idadeMax !== undefined && String(v.idadeMax).trim() !== ''
        ? Number(v.idadeMax) : undefined;

    return {
      nome: v.nome?.trim() || '',
      faixaIdadeInicial,
      faixaIdadeFinal,
      sexo: (v.sexo || '') as any,        
      status: (v.status || 'DESAPARECIDO') as any, 
      pagina: 0                                    
    };
  }

  buscar() {
    this.filtroChange.emit(this.montarFiltro());  
  }

  limpar() {
    this.form.reset({ nome: '', idadeMin: '', idadeMax: '', sexo: '', status: 'DESAPARECIDO' });
    this.filtroChange.emit({ nome: '', faixaIdadeInicial: undefined, faixaIdadeFinal: undefined, sexo: '', status: 'DESAPARECIDO', pagina: 0 });
  }
}
