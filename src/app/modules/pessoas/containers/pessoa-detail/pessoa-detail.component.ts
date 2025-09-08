import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PessoasFacade } from '../../state/pessoas.facade';
import { IPessoa } from '../../models/pessoa.model';
import { map, switchMap, catchError, of, shareReplay } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { PessoaFormComponent } from '../../components/pessoa-form/pessoa-form.component';

@Component({
  selector: 'app-pessoa-detail',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatButtonModule, 
    MatIconModule, 
    MatDialogModule],
  templateUrl: './pessoa-detail.component.html',
  styleUrls: ['./pessoa-detail.component.scss']
})
export class PessoaDetailComponent {
  pessoa$ = this.route.paramMap.pipe(
    map(p => Number(p.get('id'))),
    switchMap(id => this.facade.getPessoaById(id)),
    catchError(() => of(null)),
    shareReplay(1)
  );

  constructor(
    private route: ActivatedRoute, 
    private facade: PessoasFacade,
    private dialog: MatDialog
  ) {}

  foto(p: IPessoa): string {
    const direta = (p.urlFoto || '').trim();
    if (direta) return direta;
    const cartaz = p.ultimaOcorrencia?.listaCartaz?.find(c =>
      !!c.urlCartaz && (c.tipoCartaz?.includes('JPG') || c.tipoCartaz?.includes('INSTA'))
    );
    return cartaz?.urlCartaz || 'assets/images/desconhecido.png';
  }

  onImgError(ev: Event) {
    const img = ev.target as HTMLImageElement;
    img.onerror = null;
    img.src = 'assets/images/desconhecido.png';
  }

  status(p: IPessoa): 'DESAPARECIDO' | 'LOCALIZADO' {
    return p.ultimaOcorrencia?.dataLocalizacao ? 'LOCALIZADO' : 'DESAPARECIDO';
  }

  statusLabel(p: IPessoa): string {
    const fem = p.sexo === 'FEMININO';
    const s = this.status(p);
    if (s === 'LOCALIZADO') return fem ? 'LOCALIZADA' : 'LOCALIZADO';
    return fem ? 'DESAPARECIDA' : 'DESAPARECIDO';
  }

  diasTexto(p: IPessoa): string {
    const ini = p.ultimaOcorrencia?.dtDesaparecimento ? new Date(p.ultimaOcorrencia.dtDesaparecimento) : null;
    if (!ini) return '';
    const fim = p.ultimaOcorrencia?.dataLocalizacao
      ? new Date(p.ultimaOcorrencia.dataLocalizacao)
      : new Date();
    const ms = Math.max(0, +fim - +ini);
    const dias = Math.floor(ms / 86400000);
    const s = this.status(p);
    if (s === 'DESAPARECIDO') return `DESAPARECIDA HÁ ${dias} DIAS!`;
    return `LOCALIZADA EM ${dias} DIAS`;
  }

  sexoLegivel(p: IPessoa): string | undefined {
    if (!p.sexo) return undefined;
    return p.sexo === 'MASCULINO' ? 'Masculino' : 'Feminino';
  }

  cartazInsta(p: IPessoa): string | undefined {
    return p.ultimaOcorrencia?.listaCartaz?.find(c => c.tipoCartaz?.includes('INSTA'))?.urlCartaz;
  }

  cartazJpgOuPdf(p: IPessoa): string | undefined {
    return p.ultimaOcorrencia?.listaCartaz?.find(c => c.tipoCartaz?.includes('JPG') || c.tipoCartaz?.includes('PDF'))?.urlCartaz;
  }

  whatsappShare(p: IPessoa): string {
    const link = this.cartazJpgOuPdf(p) || this.cartazInsta(p) || window.location.href;
    const msg = `${this.statusLabel(p)}: ${p.nome}. Veja o cartaz: ${link}`;
    return 'https://wa.me/?text=' + encodeURIComponent(msg);
  }

   abrirFormulario(p: IPessoa) {
    const ocoId = p.ultimaOcorrencia?.ocoId;
    if (!ocoId) return;

    this.dialog.open(PessoaFormComponent, {
      data: { ocoId, nome: p.nome },
      width: '560px'
    }).afterClosed().subscribe((ok) => {
      if (ok) {
      }
    });
  }
}
