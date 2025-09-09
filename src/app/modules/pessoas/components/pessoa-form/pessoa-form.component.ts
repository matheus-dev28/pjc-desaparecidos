import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PessoasService } from '../../api/pessoas.service';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackDialogComponent } from '../../components/feedback-dialog/feedback-dialog.component';

export interface PessoaFormData {
  ocoId: number;
  nome?: string;
}

@Component({
  selector: 'app-pessoa-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './pessoa-form.component.html',
  styleUrls: ['./pessoa-form.component.scss']
})
export class PessoaFormComponent {
  erro?: string;
  carregando = false;

  arquivos: File[] = [];
  dragging = false;

  form = this.fb.group({
    descricao: ['', [Validators.required, Validators.maxLength(2000)]],
    data: [null as Date | null, Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private service: PessoasService,
    private ref: MatDialogRef<PessoaFormComponent>,
     private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: PessoaFormData
  ) {}

  onFiles(ev: Event) {
    const input = ev.target as HTMLInputElement;
    if (input.files?.length) {
      this.addFiles(input.files);
      input.value = '';
    }
  }

  // drag & drop
  onDragOver(ev: DragEvent) {
    ev.preventDefault();
    ev.stopPropagation();
    this.dragging = true;
  }
  onDragLeave(ev: DragEvent) {
    ev.preventDefault();
    ev.stopPropagation();
    this.dragging = false;
  }
  onDrop(ev: DragEvent) {
    ev.preventDefault();
    ev.stopPropagation();
    this.dragging = false;
    const list = ev.dataTransfer?.files;
    if (list?.length) this.addFiles(list);
  }

  // adiciona apenas imagens
  private addFiles(list: FileList) {
    const novos = Array.from(list)
      .filter(f => f.type.startsWith('image/'));
    const chave = (f: File) => `${f.name}-${f.size}`;

    const existentes = new Set(this.arquivos.map(chave));
    for (const f of novos) {
      if (!existentes.has(chave(f))) {
        this.arquivos.push(f);
        existentes.add(chave(f));
      }
    }
  }

  removerArquivo(i: number) {
    this.arquivos.splice(i, 1);
  }

    private toYMD(dt: Date | null): string {
    if (!dt) return '';
    const yyyy = dt.getFullYear();
    const mm = String(dt.getMonth() + 1).padStart(2,'0');
    const dd = String(dt.getDate()).padStart(2,'0');
    return `${yyyy}-${mm}-${dd}`;
  }

  salvar() {
    this.erro = undefined;
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.carregando = true;

    const v = this.form.value;
    const dataFmt = this.toYMD(v.data as Date);

    const formData = new FormData();
    formData.append('ocoId', String(this.data.ocoId));
    formData.append('descricao', v.descricao!.trim());
    formData.append('informacao', 'INFORMACAO');       
    formData.append('data', dataFmt);                  

    for (const f of this.arquivos) {
      formData.append('files', f); 
    }

    this.service.enviarInformacoes(formData).subscribe({
    next: () => {
      this.carregando = false;
      this.dialog.open(FeedbackDialogComponent, {
        data: { success: true, message: 'Informação enviada com sucesso!' }
      });
      this.ref.close(true);
    },
    error: () => {
      this.carregando = false;
      this.dialog.open(FeedbackDialogComponent, {
        data: { success: false, message: 'Erro ao enviar informações. Tente novamente.' }
      });
    }
  });
  }

  cancelar() {
    this.ref.close(false);
  }
}
