import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule, PageEvent, MatPaginatorIntl } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { PessoasSearchComponent } from '../../components/pessoas-search/pessoas-search.component';
import { PessoasFacade } from '../../state/pessoas.facade';
import { IPessoa, IPessoaFiltro } from '../../models/pessoa.model';
import { getPortuguesePaginatorIntl } from '../../components/paginator/custom-paginator-intl';

@Component({
  selector: 'app-pessoas-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    PessoasSearchComponent
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getPortuguesePaginatorIntl() }
  ],
  templateUrl: './pessoas-list.component.html',
  styleUrls: ['./pessoas-list.component.scss']
})
export class PessoasListComponent implements OnInit {
  estatistica$ = this.facade.estatistica$;
  page$ = this.facade.pessoas$;

  private pageSizeValue = 12;

  constructor(private facade: PessoasFacade) {}

  ngOnInit() {
    this.facade.loadEstatistica();
    this.facade.setParams({ pagina: 0, porPagina: 12, status: 'DESAPARECIDO' });
  }

  onFiltro(f: Partial<IPessoaFiltro>) {
    this.facade.setParams({ ...f, porPagina: this.pageSizeValue });
  }

  onPage(e: PageEvent) {
    const mudouTamanho = e.pageSize !== this.pageSizeValue;
    this.facade.setParams({
      pagina: mudouTamanho ? 0 : e.pageIndex,
      porPagina: e.pageSize
    });
    this.pageSizeValue = e.pageSize;
  }

  trackById(_: number, p: IPessoa) {
    return p.id;
  }

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
}
